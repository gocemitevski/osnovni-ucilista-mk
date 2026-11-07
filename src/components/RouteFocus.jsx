import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * After a client-side navigation, move focus to the page's <main> so keyboard
 * and screen-reader users start at the new content instead of the clicked link.
 * Skipped on the initial render so the page does not steal focus on load.
 */
const RouteFocus = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const main = document.getElementById('main-content');
    if (main) {
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
};

export default RouteFocus;
