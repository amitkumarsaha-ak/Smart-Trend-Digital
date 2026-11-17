import React, { useRef, useState } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.14)',
  tilt = false,
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
        transition: 'transform 0.1s ease-out'
      });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt) {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card-wrapper ${className} ${isHovered ? 'spotlight-active' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
        '--spotlight-color': spotlightColor,
        ...tiltStyle
      }}
      {...props}
    >
      <div className="spotlight-overlay" aria-hidden="true" />
      {children}
    </div>
  );
}
