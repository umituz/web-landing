import { useState, type FormEvent } from 'react';
import { Button, Input, Textarea } from '@umituz/web-design-system/atoms';
import { Field } from '@umituz/web-design-system/molecules';
import { Send, CheckCircle2 } from 'lucide-react';
import type { LandingContactProps } from '../types/section';

export function LandingContact({
  id,
  kicker,
  title,
  titleEm,
  intro,
  channels = [],
  onSubmit,
  submitLabel = 'Send message',
  successMessage = 'Thank you! Your message has been sent successfully.',
  alt = false,
  className = '',
}: LandingContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit({ name, email, subject, message });
      }
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className={`ul-land-section ul-land-contact-wrap ${alt ? 'ul-land-section--alt' : ''} ${className}`.trim()}>
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        <h2 className="ul-land-section-title">
          {title}
          {titleEm && <em>{titleEm}</em>}
        </h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}

        <div className={`ul-land-contact-layout ${channels.length > 0 ? 'has-channels' : ''}`}>
          {channels.length > 0 && (
            <div className="ul-land-contact-channels">
              {channels.map((c) => (
                <div key={c.title} className="ul-land-card ul-land-contact-card">
                  {c.icon && (
                    <span className="ul-land-card-icon">
                      <c.icon size={18} aria-hidden="true" />
                    </span>
                  )}
                  <h3 className="ul-land-contact-card-title">{c.title}</h3>
                  {c.href ? (
                    <a href={c.href} className="ul-land-contact-card-link">
                      {c.detail}
                    </a>
                  ) : (
                    <span className="ul-land-contact-card-detail">{c.detail}</span>
                  )}
                  {c.note && <p className="ul-land-contact-card-note">{c.note}</p>}
                </div>
              ))}
            </div>
          )}

          <div className="ul-land-contact-form-card">
            {sent ? (
              <div className="ul-land-contact-success">
                <CheckCircle2 size={36} className="ul-land-contact-success-icon" />
                <p className="ul-land-contact-success-text">{successMessage}</p>
                <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ul-land-contact-form">
                <div className="ul-land-contact-row">
                  <Field label="Your Name" required>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                      disabled={loading}
                    />
                  </Field>
                  <Field label="Work Email" required>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      required
                      disabled={loading}
                    />
                  </Field>
                </div>
                <Field label="Subject">
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    disabled={loading}
                  />
                </Field>
                <Field label="Message" required>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project or inquiry..."
                    rows={4}
                    required
                    disabled={loading}
                  />
                </Field>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={<Send size={15} />}
                  className="ul-land-contact-submit"
                >
                  {submitLabel}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
