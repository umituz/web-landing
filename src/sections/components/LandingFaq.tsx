import { ChevronDown } from 'lucide-react';
import type { LandingFaqProps } from '../types/section';

export function LandingFaq({ id, kicker, title, intro, items }: LandingFaqProps) {
  return (
    <section id={id} className="ul-land-section ul-land-faq">
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        <h2 className="ul-land-section-title">{title}</h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}

        <div className="ul-land-faq-list">
          {items.map((item) => (
            <details key={item.question} className="ul-land-faq-item">
              <summary className="ul-land-faq-summary">
                <span className="ul-land-faq-question">{item.question}</span>
                <ChevronDown size={18} className="ul-land-faq-chevron" aria-hidden="true" />
              </summary>
              <div className="ul-land-faq-answer">
                {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
