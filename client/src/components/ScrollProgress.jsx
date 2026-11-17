import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      <div
        className="scroll-progress-glow"
        style={{ left: `${scrollProgress}%` }}
      />
    </div>
  );
}
