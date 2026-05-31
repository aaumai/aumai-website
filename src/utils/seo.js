// Lightweight per-page SEO for this CRA SPA (no react-helmet dependency).
// Sets title + description + canonical + Open Graph / Twitter so each route has
// its own metadata when rendered (Google executes JS) and when navigated to in
// the SPA (so the title doesn't "stick" from the previous page).

export function setPageSeo({ title, description, canonical, image }) {
  if (title) document.title = title;

  const upsertMeta = (key, attr, value) => {
    if (!value) return;
    let el = document.head.querySelector(`meta[${key}="${attr}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(key, attr);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  if (image) {
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:image', image);
  }

  if (canonical) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }
}
