import React from 'react';

// Renders the policy content model shared with scripts/prerender.js
// (src/data/privacyPolicy.js, src/data/dataDeletion.js) in the legal pages'
// existing styling. Text is plain; [label](href) becomes a link, and the
// literal {CONTACT} becomes the market's contact email.

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function inline(text, contact) {
  const s = contact ? text.split('{CONTACT}').join(contact) : text;
  const out = [];
  let last = 0;
  let m;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(s)) !== null) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const external = /^https?:/.test(m[2]);
    out.push(
      <a key={m.index} href={m[2]} style={{ color: '#4f46e5' }} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

export function PolicyText({ text, contact }) {
  return <>{inline(text, contact)}</>;
}

function Block({ block, contact }) {
  if (block.ul) {
    return (
      <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
        {block.ul.map((item, i) => (
          <li key={i} style={{ marginBottom: '8px' }}>
            {Array.isArray(item)
              ? <><strong>{item[0]}</strong> {inline(item[1], contact)}</>
              : inline(item, contact)}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p style={{ marginBottom: '15px' }}>
      {block.lead ? <><strong>{block.lead}</strong> </> : null}
      {inline(block.p, contact)}
    </p>
  );
}

export function PolicySections({ sections, contact }) {
  return sections.map((sec) => (
    <section key={sec.title} style={{ marginBottom: '30px' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>{sec.title}</h2>
      {sec.blocks.map((b, i) => <Block key={i} block={b} contact={contact} />)}
    </section>
  ));
}
