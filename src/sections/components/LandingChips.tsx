import { Link } from 'react-router';
import type { LandingChipItem, LandingChipsProps } from '../types/section';

function isLinked(item: string | LandingChipItem): item is LandingChipItem {
  return typeof item !== 'string';
}

export function LandingChips({ items, label }: LandingChipsProps) {
  return (
    <section className="ul-land-strip" aria-label={label}>
      {items.map((item) =>
        isLinked(item) ? (
          <Link key={item.to} to={item.to} className="ul-land-chip ul-land-chip--link">
            {item.icon}
            {item.label}
          </Link>
        ) : (
          <span key={item} className="ul-land-chip">
            {item}
          </span>
        ),
      )}
    </section>
  );
}
