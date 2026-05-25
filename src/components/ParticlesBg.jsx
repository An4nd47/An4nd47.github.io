import React, { useMemo } from 'react';

export default function ParticlesBg() {
  const particles = useMemo(() => {
    const colors = ['var(--neon-blue)', 'var(--neon-green)', 'var(--neon-orange)', '#fff'];
    const list = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 3 + 1;
      list.push({
        id: i,
        left: `${Math.random() * 100}%`,
        drift: `${(Math.random() - 0.5) * 200}px`,
        background: colors[Math.floor(Math.random() * colors.length)],
        duration: `${Math.random() * 10 + 8}s`,
        delay: `${Math.random() * 10}s`,
        width: `${size}px`,
        height: `${size}px`,
      });
    }
    return list;
  }, []);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            background: p.background,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.width,
            height: p.height,
            '--drift': p.drift,
          }}
        />
      ))}
    </div>
  );
}
