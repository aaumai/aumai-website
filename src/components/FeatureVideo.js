import React, { useEffect } from 'react';
import './FeatureVideo.css';

export const WatchButton = ({ onClick }) => (
  <button type="button" className="fv-watch" onClick={onClick}>
    <span className="fv-play" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
    </span>
    See it in action · 60 sec
  </button>
);

export const VideoLightbox = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  if (!video) return null;
  return (
    <div className="fv-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={video.title}>
      <div className="fv-frame" onClick={(e) => e.stopPropagation()}>
        <div className="fv-bar">
          <span className="fv-title">{video.title}</span>
          <button type="button" className="fv-close" onClick={onClose} aria-label="Close video">✕</button>
        </div>
        <video
          className="fv-player"
          src={`/videos/features/${video.file}.mp4`}
          poster={`/videos/features/${video.file}-poster.jpg`}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
};
