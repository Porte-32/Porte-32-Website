/**
 * When the logo opening plays: the first page of a visit, any reload, and after pressing a link marked `data-intro`
 * (the nav logo, About and Events, both "Upcoming events" links on the home page) that opens another page. A marked
 * link that only jumps within the page you're on (About while on the home page) just scrolls. Other links open their
 * page straight away.
 *
 * The decision is made once, by `introScript` in the page head before the first paint: if the opening won't play it
 * marks <html data-intro-seen>, so CSS hides the intro screen at once (no flash of linen) and Intro steps aside.
 */
const SEEN = 'p32-intro-seen'; // set once a page of this visit has loaded
const PLAY = 'p32-intro-play'; // set by pressing a data-intro link; read and cleared by the next page

export const introScript = `(function(){try{
var s=sessionStorage,n=performance.getEntriesByType('navigation')[0];
var play=!s.getItem('${SEEN}')||(n&&n.type==='reload')||s.getItem('${PLAY}')!==null;
s.setItem('${SEEN}','1');s.removeItem('${PLAY}');
if(!play)document.documentElement.setAttribute('data-intro-seen','');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-intro]');
if(a&&!(a.pathname===location.pathname&&a.search===location.search&&a.hash))s.setItem('${PLAY}','1');},true);
}catch(e){}})();`;

/** Whether this page load plays the opening, as decided by introScript. */
export const introPlays = () => !document.documentElement.hasAttribute('data-intro-seen');
