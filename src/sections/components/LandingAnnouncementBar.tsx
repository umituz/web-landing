import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@umituz/web-design-system/atoms';
import type { LandingAnnouncementBarProps } from '../types/section';

export function LandingAnnouncementBar({
  id,
  badge,
  text,
  action,
  dismissible = true,
  onDismiss,
  regionLabel = 'Announcement',
  dismissLabel = 'Dismiss announcement',
  className,
}: LandingAnnouncementBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const rootClasses = ['ul-land-announcement', className ?? ''].filter(Boolean).join(' ');

  return (
    <aside id={id} className={rootClasses} role="status" aria-label={regionLabel}>
      <div className="ul-land-announcement-inner">
        <div className="ul-land-announcement-content">
          {badge ? (
            <Badge variant="primary" size="sm" className="ul-land-announcement-badge">
              {badge}
            </Badge>
          ) : null}
          <span className="ul-land-announcement-text">{text}</span>
          {action ? (
            <Link to={action.to} className="ul-land-announcement-action">
              <span>{action.label}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        {dismissible ? (
          <button
            type="button"
            className="ul-land-announcement-close"
            onClick={handleDismiss}
            aria-label={dismissLabel}
          >
            <X size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </aside>
  );
}
