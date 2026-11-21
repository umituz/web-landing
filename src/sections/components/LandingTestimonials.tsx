import { Star } from 'lucide-react';
import type { LandingTestimonialsProps } from '../types/section';

export function LandingTestimonials({
  id,
  kicker,
  title,
  intro,
  testimonials,
  columns = 3,
}: LandingTestimonialsProps) {
  return (
    <section id={id} className="ul-land-section ul-land-testimonials">
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        <h2 className="ul-land-section-title">{title}</h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}

        <div className={`ul-land-grid ul-land-grid--${columns}`}>
          {testimonials.map((item) => (
            <div key={`${item.name}-${item.quote.slice(0, 20)}`} className="ul-land-testimonial-card">
              {item.rating && item.rating > 0 && (
                <div
                  className="ul-land-testimonial-rating"
                  role="img"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={index < item.rating! ? 'is-filled' : 'is-empty'}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}

              <blockquote className="ul-land-testimonial-quote">
                "{item.quote}"
              </blockquote>

              <div className="ul-land-testimonial-author">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="ul-land-testimonial-avatar"
                    loading="lazy"
                  />
                ) : (
                  <div className="ul-land-testimonial-avatar-fallback" aria-hidden="true">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ul-land-testimonial-info">
                  <div className="ul-land-testimonial-name">{item.name}</div>
                  {(item.role || item.company) && (
                    <div className="ul-land-testimonial-meta">
                      {[item.role, item.company].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
