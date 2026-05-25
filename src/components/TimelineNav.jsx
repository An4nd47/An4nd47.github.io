import React from 'react';

export default function TimelineNav({ activeTimeline, onSelectTimeline, navigationMode }) {
  // Hide in Time Warp mode to ensure a clean immersive year-specific dashboard experience
  if (navigationMode === 'warp') return null;

  const sections = [
    { id: 'hero', label: 'INIT' },
    { id: 'y2023', label: '2023' },
    { id: 'y2024', label: '2024' },
    { id: 'y2025', label: '2025' },
    { id: 'y2026', label: '2026' },
    { id: 'future', label: '∞' },
  ];

  return (
    <div className="timeline-nav">
      {sections.map((sec) => (
        <button
          key={sec.id}
          className={`tl-dot ${activeTimeline === sec.id ? 'active' : ''}`}
          onClick={() => onSelectTimeline(sec.id)}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <span className="tl-label">{sec.label}</span>
          <div className="tl-pip" />
        </button>
      ))}
    </div>
  );
}
