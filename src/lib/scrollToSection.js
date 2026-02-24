/**
 * Scroll to a section by id.
 *
 * Behavior:
 * - If not on the Home route ("/"), navigate to Home and pass the target id via
 *   location state as { scrollTo: id }.
 * - If already on Home, scroll using scrollIntoView(). The app CSS sets
 *   scroll-margin-top via --header-h to compensate for the fixed header.
 */

export function scrollToSection(id, opts = {}) {
  const { navigate, location, onBeforeScroll } = opts;

  if (typeof onBeforeScroll === 'function') onBeforeScroll();

  if (location?.pathname && location.pathname !== '/' && typeof navigate === 'function') {
    navigate('/', { state: { scrollTo: id } });
    return;
  }

  const tryScroll = (attempt = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (attempt < 4) window.setTimeout(() => tryScroll(attempt + 1), 80);
  };

  tryScroll();
}
