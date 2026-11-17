import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedCounter({
  value,
  duration = 1800,
  className = ''
}) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const rawStr = String(value || '');

    // Extract prefix, number, decimals, and suffix
    // Matches e.g. "<3s", "99.98%", "12,000+", "450+", "40+", "100%"
    const match = rawStr.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);

    if (!match) {
      setDisplayValue(rawStr);
      return;
    }

    const prefix = match[1] || '';
    const numPart = match[2].replace(/,/g, '');
    const suffix = match[3] || '';

    const targetNum = parseFloat(numPart);
    if (isNaN(targetNum)) {
      setDisplayValue(rawStr);
      return;
    }

    const hasComma = match[2].includes(',');
    const decimals = numPart.includes('.') ? numPart.split('.')[1].length : 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic curve: 1 - (1 - t)^3
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentNum = targetNum * easeOutProgress;

            let formatted = decimals > 0 ? currentNum.toFixed(decimals) : Math.round(currentNum).toString();

            if (hasComma) {
              const parts = formatted.split('.');
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              formatted = parts.join('.');
            }

            setDisplayValue(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              // Final exact match to prevent precision drift
              setDisplayValue(rawStr);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`animated-counter ${className}`}>
      {displayValue}
    </span>
  );
}
