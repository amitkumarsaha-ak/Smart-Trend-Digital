import React from 'react';

export default function KineticHeadline({
  startText = '',
  highlightText = '',
  endText = '',
  as: Component = 'h1',
  className = '',
  ...props
}) {
  return (
    <Component className={`kinetic-headline ${className}`} {...props}>
      {startText && <span className="kinetic-text-start">{startText} </span>}
      {highlightText && (
        <span className="kinetic-highlight-flow hero-title-gradient">
          {highlightText}
        </span>
      )}
      {endText && <span className="kinetic-text-end"> {endText}</span>}
    </Component>
  );
}
