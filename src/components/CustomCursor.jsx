import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef([]);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const trail = [];
    const MAX_TRAIL = 12;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      trail.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.length > MAX_TRAIL) trail.shift();
      trailRef.current = trail;
    };

    const onMouseOver = (e) => {
      const el = e.target;
      const isInteractive = el.matches('button, a, [data-magnetic], input, select, textarea') ||
        el.closest('button, a, [data-magnetic]');
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      // Smooth ring follow
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

      // Update dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      // Update ring position
      if (ringRef.current) {
        const scale = isHovering ? 2.5 : isClicking ? 0.7 : 1;
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px) scale(${scale})`;
      }

      // Draw trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailRef.current.forEach((p, i) => {
        const alpha = (i / trailRef.current.length) * 0.4;
        const size = (i / trailRef.current.length) * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 200, 255, 0.5)';
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#00C8FF',
          boxShadow: '0 0 12px rgba(0, 200, 255, 0.9)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(0, 200, 255, 0.7)',
          boxShadow: '0 0 10px rgba(0, 200, 255, 0.4)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'transform 0.1s ease, border-color 0.2s, box-shadow 0.2s',
        }}
      />
    </>
  );
}
