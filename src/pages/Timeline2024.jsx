import React from 'react';

export default function Timeline2024({ onOpenModal }) {
  const projects = [
    {
      id: 'proj1',
      num: 'PROJECT_01',
      name: 'Auth System',
      desc: 'Full-stack login/signup with JWT tokens, hashed passwords, and session management.',
      tags: ['Node.js', 'MySQL'],
    },
    {
      id: 'proj2',
      num: 'PROJECT_02',
      name: 'Portfolio v1',
      desc: 'First personal portfolio with React, animated components, and mobile-first design principles.',
      tags: ['React', 'CSS3'],
    },
    {
      id: 'proj3',
      num: 'PROJECT_03',
      name: 'API Integrations',
      desc: 'Connected third-party services, built data pipelines, and created dynamic user experiences.',
      tags: ['REST', 'Express'],
    },
  ];

  return (
    <section
      id="y2024"
      className="year-section fade-in-section visible"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0, 40, 100, 0.2), transparent 60%)' }}
    >
      <div className="section-inner">
        <div className="section-line">
          <div className="year-badge y2024">▸ 2024 — TIMELINE BETA</div>
        </div>
        
        <h2 className="section-title" style={{ color: '#00aaff' }}>
          Built Web Apps
        </h2>
        <p className="section-desc">
          The codebase grew. UIs breathed life. Databases stored stories. Full-stack thinking emerged — where logic
          meets design, where data meets people.
        </p>

        <div className="skills-grid" style={{ marginBottom: '2rem' }}>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>React.js</span>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>Node.js</span>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>MySQL</span>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>REST APIs</span>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>Authentication</span>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>Responsive Design</span>
          <span className="skill-chip" style={{ '--chip-color': '#00aaff' }}>Express.js</span>
        </div>

        <div className="proj-grid">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="proj-card"
              onDoubleClick={() => onOpenModal(proj.id)}
            >
              <div className="proj-number">{proj.num}</div>
              <div className="proj-name">{proj.name}</div>
              <div className="proj-desc">{proj.desc}</div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                {proj.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(0, 170, 255, 0.1)',
                      border: '1px solid rgba(0, 170, 255, 0.2)',
                      color: '#00aaff',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
