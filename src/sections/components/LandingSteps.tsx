import type { LandingStepsProps } from '../types/section';

export function LandingSteps({ title, intro, steps }: LandingStepsProps) {
  return (
    <section className="ul-land-section">
      <div className="ul-land-section-inner">
        <h2 className="ul-land-section-title">{title}</h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}
        <ol className="ul-land-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="ul-land-step">
                <span className="ul-land-step-num">{index + 1}</span>
                <h3 className="ul-land-step-title">
                  {Icon && <Icon size={15} aria-hidden="true" />}
                  {step.title}
                </h3>
                <p className="ul-land-step-body">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
