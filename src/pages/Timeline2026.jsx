import React, { useState, useMemo } from 'react';

export default function Timeline2026() {
  // Scenario Decision Tree State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenarios = useMemo(
    () => [
      {
        q: 'User input detected: "Analyze my data"',
        steps: [
          '→ Parse intent',
          '→ Identify data type',
          '→ Select ML model',
          '→ Execute analysis',
          '✓ Return insights',
        ],
      },
      {
        q: 'System event: "Anomaly detected in stream"',
        steps: [
          '→ Isolate anomaly',
          '→ Cross-check baseline',
          '→ Calculate deviation',
          '→ Alert threshold?',
          '✓ Trigger response',
        ],
      },
      {
        q: 'Query: "Predict next user action"',
        steps: [
          '→ Load user model',
          '→ Analyze behavior pattern',
          '→ Run prediction engine',
          '→ Score confidence',
          '✓ Output recommendation',
        ],
      },
    ],
    []
  );

  const activeScenario = scenarios[scenarioIndex % scenarios.length];

  // AI Core Orb State
  const [orbResponse, setOrbResponse] = useState('');
  const [orbIndex, setOrbIndex] = useState(0);
  const [orbScale, setOrbScale] = useState(1);
  const [orbOpacity, setOrbOpacity] = useState(1);

  const orbResponses = useMemo(
    () => [
      'Processing neural pathways...',
      'Analyzing intent vectors...',
      'Generating intelligent response...',
      'Cross-referencing knowledge base...',
      'Synthesizing optimal output...',
      'Engaging adaptive learning mode...',
      'Calibrating decision matrices...',
      'Interfacing with intelligence core...',
    ],
    []
  );

  const handleOrbClick = () => {
    // Interactive orb pulse scale animation
    setOrbScale(1.2);
    setOrbOpacity(0);
    
    setTimeout(() => {
      setOrbScale(1);
    }, 300);

    setTimeout(() => {
      setOrbResponse(orbResponses[orbIndex % orbResponses.length]);
      setOrbOpacity(1);
      setOrbIndex((idx) => idx + 1);
    }, 300);
  };

  // System Metrics
  const metrics = [
    { label: 'Intelligence Score', val: 94, color: '#ff6b00' },
    { label: 'Automation Level', val: 87, color: '#ff8c40' },
    { label: 'Learning Rate', val: 78, color: '#ffaa70' },
  ];

  return (
    <section
      id="y2026"
      className="year-section fade-in-section visible"
      style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 60, 0, 0.1), transparent 50%)' }}
    >
      <div className="section-inner">
        <div className="section-line">
          <div className="year-badge y2026">▸ 2026 — TIMELINE DELTA</div>
        </div>

        <div className="two-col">
          <div>
            <h2 className="section-title" style={{ color: 'var(--neon-orange)' }}>
              AI Systems
            </h2>
            <p className="section-desc">
              Intelligence became the medium. Designed systems that think, adapt, and respond. The shift from developer
              to AI architect.
            </p>

            <div className="skills-grid" style={{ marginBottom: '1.5rem' }}>
              <span className="skill-chip" style={{ '--chip-color': '#ff6b00' }}>AI System Design</span>
              <span className="skill-chip" style={{ '--chip-color': '#ff6b00' }}>Automation</span>
              <span className="skill-chip" style={{ '--chip-color': '#ff6b00' }}>ML Concepts</span>
              <span className="skill-chip" style={{ '--chip-color': '#ff6b00' }}>Intelligent UX</span>
              <span className="skill-chip" style={{ '--chip-color': '#ff6b00' }}>AI Workflows</span>
              <span className="skill-chip" style={{ '--chip-color': '#ff6b00' }}>Neural Pathways</span>
            </div>

            {/* DECISION TREE */}
            <div className="glass-card" style={{ borderColor: 'rgba(255, 107, 0, 0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 107, 0, 0.6)', letterSpacing: '2px', marginBottom: '1rem' }}>
                // AI DECISION ENGINE
              </div>
              
              <div id="aiDecisionTree" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.9 }}>
                <div style={{ color: 'rgba(255, 107, 0, 0.8)', marginBottom: '0.75rem' }}>{activeScenario.q}</div>
                {activeScenario.steps.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      color: `rgba(255, 255, 255, ${0.4 + i * 0.12})`,
                      paddingLeft: `${i * 8}px`,
                      transition: 'all 0.3s',
                    }}
                  >
                    {step}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setScenarioIndex((prev) => prev + 1)}
                style={{
                  marginTop: '1rem',
                  padding: '0.4rem 1rem',
                  border: '1px solid rgba(255, 107, 0, 0.4)',
                  background: 'rgba(255, 107, 0, 0.1)',
                  color: 'var(--neon-orange)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                className="ai-scenario-btn"
              >
                NEXT SCENARIO →
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 107, 0, 0.6)', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                // AI CORE — CLICK TO INTERACT
              </div>
              <div
                className="ai-orb"
                id="aiOrb"
                onClick={handleOrbClick}
                style={{ transform: `scale(${orbScale})` }}
              />
              <div
                id="orbResponse"
                style={{
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textAlign: 'center',
                  minHeight: '2rem',
                  transition: 'all 0.5s',
                  maxWidth: '250px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  lineHeight: 1.7,
                  opacity: orbOpacity,
                }}
              >
                {orbResponse}
              </div>
            </div>

            {/* METRICS */}
            <div className="glass-card" style={{ width: '100%', borderColor: 'rgba(255, 107, 0, 0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255, 107, 0, 0.6)', letterSpacing: '2px', marginBottom: '1rem' }}>
                // SYSTEM METRICS
              </div>
              <div id="aiMetrics">
                {metrics.map((m, i) => (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <span>{m.label}</span>
                      <span style={{ color: m.color }}>{m.val}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${m.val}%`,
                          background: m.color,
                          borderRadius: '2px',
                          boxShadow: `0 0 8px ${m.color}`,
                          transition: 'width 1s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
