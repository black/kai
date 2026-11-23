/** Mark: three outlined shapes and one filled blue square. */
const Logo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
    <rect x="2.5" y="2.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="17.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="6.5" cy="17.5" r="4" stroke="currentColor" strokeWidth="1.4" />
    <rect x="13" y="13" width="9" height="9" rx="1" className="fill-blue" />
  </svg>
);

export default Logo;
