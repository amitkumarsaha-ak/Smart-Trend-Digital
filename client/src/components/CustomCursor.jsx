import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Smooth lerp coordinates for trailing ring
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Detect touch / coarse pointer devices (phones, tablets)
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Fast update for inner pinpoint dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check what element is currently under mouse
      const target = e.target;
      if (!target) return;

      // Update card spotlight coordinates on hovered cards
      const card = target.closest(
        '.pillar-main-card, .case-study-card, .case-study-deep-card, .service-premium-card, .service-catalog-card, .value-card, .cred-item-card, .calc-step-card, .office-card-preview, .spotlight-card-wrapper'
      );
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, .btn, .client-badge, .pillar-main-card, .case-study-card, .metric-cell, .cat-card-btn, .scope-option, .deadline-btn, .clickable, .std-modal-close, .whatsapp-trigger-btn'
      );

      const textTarget = target.closest('input[type="text"], input[type="email"], input[type="tel"], textarea');

      setIsHovered(!!interactive);
      setIsTextInput(!!textTarget);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Lerp loop for trailing outer ring
    const render = () => {
      // Lerp factor (smooth spring interpolation)
      const factor = 0.18;
      ring.current.x += (mouse.current.x - ring.current.x) * factor;
      ring.current.y += (mouse.current.y - ring.current.y) * factor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner pinpoint dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''} ${isTextInput ? 'text-mode' : ''}`}
        aria-hidden="true"
      />
      {/* Outer trailing magnetic ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''} ${isTextInput ? 'text-mode' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
