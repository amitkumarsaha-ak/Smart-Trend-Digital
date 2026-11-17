import React from 'react';

export default function AgencyMarquee({
  children,
  speed = 35,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}) {
  return (
    <div
      className={`agency-marquee-wrapper ${pauseOnHover ? 'pause-hover' : ''} ${className}`}
      style={{
        '--marquee-duration': `${speed}s`,
        '--marquee-direction': direction === 'left' ? 'normal' : 'reverse'
      }}
    >
      <div className="agency-marquee-track">
        <div className="agency-marquee-content">{children}</div>
        <div className="agency-marquee-content" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
