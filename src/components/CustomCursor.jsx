import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mx = 0;
    let my = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;

      // Trail lag transition
      setTimeout(() => {
        if (trail) {
          trail.style.left = `${mx}px`;
          trail.style.top = `${my}px`;
        }
      }, 80);

      // Check if hovering over interactive elements for scaling effect
      const target = e.target;
      if (target) {
        const isInteractive = target.closest(
          'a, button, input, textarea, select, [role="button"], .proj-card, .mem-card, .tl-dot, .skill-chip, .ai-orb, [onclick]'
        );
        if (isInteractive) {
          cursor.classList.add('hover');
        } else {
          cursor.classList.remove('hover');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      <div className="cursor-trail" ref={trailRef} />
    </>
  );
}
