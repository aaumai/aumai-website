import React, { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://dabbewaala.aumai.co.in/api/aumai/comments';

const BlogComments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifyMe, setNotifyMe] = useState(false);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribeMsg, setSubscribeMsg] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);

  const adminKey = typeof window !== 'undefined'
    ? localStorage.getItem('aumai_admin_key')
    : null;

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/${slug}`);
      const json = await res.json();
      setComments(json.comments || []);
    } catch {
      // silent
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setSubscribeMsg('');
    try {
      const res = await fetch(`${API_BASE}/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: name.trim() || null,
          comment_text: text.trim(),
        }),
      });
      const newComment = await res.json();
      if (newComment.id) {
        setComments((prev) => [...prev, { ...newComment, replies: [] }]);
        setText('');

        // Subscribe if checkbox is checked and email is provided
        if (notifyMe && email.trim()) {
          try {
            await fetch(`${API_BASE}/subscribe`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email.trim(),
                author_name: name.trim() || null,
              }),
            });
            setSubscribeMsg('Subscribed! We will notify you when new posts are published.');
            setEmail('');
            setNotifyMe(false);
          } catch {
            // silent
          }
        }

        setName('');
      }
    } catch {
      // silent
    }
    setSubmitting(false);
  };

  const handleReply = async (commentId) => {
    if (!replyText.trim() || !adminKey) return;
    setReplySubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/${slug}/reply/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Aumai-Admin': adminKey,
        },
        body: JSON.stringify({ comment_text: replyText.trim() }),
      });
      const reply = await res.json();
      if (reply.id) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? { ...c, replies: [...(c.replies || []), reply] }
              : c
          )
        );
        setReplyText('');
        setReplyingTo(null);
      }
    } catch {
      // silent
    }
    setReplySubmitting(false);
  };

  const handleDelete = async (commentId) => {
    if (!adminKey) return;
    try {
      await fetch(`${API_BASE}/${commentId}`, {
        method: 'DELETE',
        headers: { 'X-Aumai-Admin': adminKey },
      });
      setComments((prev) =>
        prev
          .filter((c) => c.id !== commentId)
          .map((c) => ({
            ...c,
            replies: (c.replies || []).filter((r) => r.id !== commentId),
          }))
      );
    } catch {
      // silent
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="blog-comments">
      <h3 className="blog-comments-title">
        Comments {comments.length > 0 && <span>({comments.length})</span>}
      </h3>

      {/* Comment Form */}
      <form className="blog-comment-form" onSubmit={handleSubmit}>
        <div className="blog-comment-form-row">
          <input
            type="text"
            className="blog-comment-name"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
          />
          <input
            type="email"
            className="blog-comment-email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.trim()) setNotifyMe(true);
            }}
            maxLength={255}
          />
        </div>
        {email.trim() && (
          <label className="blog-comment-notify">
            <input
              type="checkbox"
              checked={notifyMe}
              onChange={(e) => setNotifyMe(e.target.checked)}
            />
            <span>Notify me when new blog posts are published</span>
          </label>
        )}
        <textarea
          className="blog-comment-textarea"
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          rows={3}
          required
        />
        <div className="blog-comment-form-footer">
          <span className="blog-comment-char-count">
            {text.length}/2000
          </span>
          <button
            type="submit"
            className="blog-comment-submit"
            disabled={submitting || !text.trim()}
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
        {subscribeMsg && (
          <p className="blog-comment-subscribe-msg">{subscribeMsg}</p>
        )}
      </form>

      {/* Comments List */}
      {loading ? (
        <p className="blog-comments-loading">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="blog-comments-empty">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="blog-comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="blog-comment">
              <div className="blog-comment-header">
                <span className="blog-comment-author">
                  {comment.author_name || 'Anonymous'}
                </span>
                <span className="blog-comment-date">
                  {formatDate(comment.created_at)}
                </span>
                {adminKey && (
                  <button
                    className="blog-comment-delete"
                    onClick={() => handleDelete(comment.id)}
                    title="Hide comment"
                  >
                    &times;
                  </button>
                )}
              </div>
              <p className="blog-comment-text">{comment.comment_text}</p>

              {/* Admin Reply Button */}
              {adminKey && !replyingTo && (
                <button
                  className="blog-comment-reply-btn"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </button>
              )}

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="blog-comment-reply-form">
                  <textarea
                    className="blog-comment-textarea blog-comment-textarea--small"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={2}
                  />
                  <div className="blog-comment-reply-actions">
                    <button
                      className="blog-comment-submit blog-comment-submit--small"
                      onClick={() => handleReply(comment.id)}
                      disabled={replySubmitting || !replyText.trim()}
                    >
                      {replySubmitting ? 'Sending...' : 'Send Reply'}
                    </button>
                    <button
                      className="blog-comment-cancel"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies?.map((reply) => (
                <div key={reply.id} className="blog-comment blog-comment--reply">
                  <div className="blog-comment-header">
                    <span className="blog-comment-author">
                      {reply.author_name || 'Anonymous'}
                      {reply.is_admin_reply === 1 && (
                        <span className="blog-comment-admin-badge">AUM AI</span>
                      )}
                    </span>
                    <span className="blog-comment-date">
                      {formatDate(reply.created_at)}
                    </span>
                    {adminKey && (
                      <button
                        className="blog-comment-delete"
                        onClick={() => handleDelete(reply.id)}
                        title="Hide reply"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                  <p className="blog-comment-text">{reply.comment_text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComments;
