/**
 * The screen height scroll effects measure against. On phones the browser's address bar slides away as you scroll,
 * which changes window.innerHeight mid-scroll and makes scroll-linked animation jump. This height ignores the bar
 * (it matches CSS `svh`), so the effects stay steady.
 */
export const viewportHeight = () => document.documentElement.clientHeight;
