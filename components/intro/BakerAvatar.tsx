/**
 * A friendly drawn baker (chef's hat, smile, apron) shown until the owner's
 * own photo is set. Flat shapes in the page's ink and accent colours.
 */
export default function BakerAvatar({ ink, accent, className }: { ink: string; accent: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden>
      <g stroke={ink} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        {/* apron / shoulders */}
        <path d="M20 220 C22 172 58 150 100 150 C142 150 178 172 180 220Z" fill="#ffffff" />
        <path d="M70 156 L100 190 L130 156" fill="none" />
        <path d="M62 220 L62 196 Q100 206 138 196 L138 220" fill={accent} />
        {/* neck + face */}
        <rect x="88" y="132" width="24" height="26" rx="8" fill="#f2c4a0" />
        <ellipse cx="100" cy="102" rx="44" ry="48" fill="#f7d3b4" />
        {/* hat */}
        <path d="M58 70 C34 66 34 30 62 30 C66 8 104 4 112 24 C134 12 160 32 146 52 C160 60 152 74 142 70 L142 82 L58 82Z" fill="#ffffff" />
        <path d="M60 82 L140 82" fill="none" />
        {/* face details */}
        <circle cx="84" cy="104" r="3.6" fill={ink} stroke="none" />
        <circle cx="116" cy="104" r="3.6" fill={ink} stroke="none" />
        <path d="M84 124 Q100 140 116 124" fill="none" />
        <circle cx="72" cy="118" r="7" fill="#f2998e" stroke="none" opacity="0.55" />
        <circle cx="128" cy="118" r="7" fill="#f2998e" stroke="none" opacity="0.55" />
      </g>
    </svg>
  );
}
