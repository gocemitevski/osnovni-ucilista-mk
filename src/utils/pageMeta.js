import { pageTitle } from './pageTitle';

function upsertMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * The canonical URL for the current route. The site root keeps its trailing
 * slash; other routes drop it so the canonical matches the sitemap (internal
 * municipality links are generated with a trailing slash).
 */
function canonicalUrl() {
  const { origin, pathname } = window.location;
  const basePath = new URL(process.env.PUBLIC_URL || '/', origin).pathname.replace(/\/+$/, '') + '/';
  const stripped = pathname.replace(/\/+$/, '') || '/';
  const normalized = pathname === basePath ? basePath : stripped;
  return origin + normalized;
}

/**
 * Update the per-page document title, description, canonical URL and the
 * matching Open Graph / Twitter tags. Called from page effects after navigation.
 */
export function setPageMeta(title, description) {
  if (!title) return;

  document.title = pageTitle(title);

  if (description) {
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:description', description);
  }

  upsertMeta('property', 'og:title', document.title);
  upsertMeta('name', 'twitter:title', document.title);

  if (typeof window !== 'undefined' && window.location) {
    const url = canonicalUrl();
    upsertMeta('property', 'og:url', url);
    upsertCanonical(url);
  }
}
