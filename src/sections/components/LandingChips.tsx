import type { LandingChipsProps } from '../types/section';

export function LandingChips({ items, label }: LandingChipsProps) {
  return (
    <section className="ul-land-strip" aria-label={label}>
      {items.map((item) => (
        <span key={item} className="ul-land-chip">
          {item}
        </span>
      ))}
    </section>
  );
}
