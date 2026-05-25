import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId = null;

    const resizeStars = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random(),
          twinkleFactor: Math.random() * 0.01 + 0.002,
        });
      }
    };

    const animStars = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      stars.forEach((s) => {
        // Smooth twinkling transition
        s.opacity += Math.sin(now * 0.001 + s.x) * s.twinkleFactor;
        s.opacity = Math.max(0.1, Math.min(1, s.opacity));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        
        // Randomly color some stars blue
        const isBlue = Math.sin(s.x + s.y) > 0.8;
        ctx.fillStyle = `rgba(${isBlue ? '100,200,255' : '255,255,255'}, ${s.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animStars);
    };

    resizeStars();
    animStars();

    window.addEventListener('resize', resizeStars);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeStars);
    };
  }, []);

  return <canvas id="stars-canvas" ref={canvasRef} />;
}
