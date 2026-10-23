// Vackert mark: a gold "V" rising out of a forest-green tile
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <rect width="40" height="40" rx="10" className="fill-forest" />
      <path d="M10 12 L20 30 L30 12" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="stroke-gold" />
      <circle cx="30" cy="12" r="2.5" className="fill-gold" />
    </svg>
  );
}
