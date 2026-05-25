import React, { useState, useMemo } from 'react';

export default function TimelineFuture() {
  const [ideaIndex, setIdeaIndex] = useState(0);
  const [ideaText, setIdeaText] = useState('Press the button to generate the next timeline...');
  const [opacity, setOpacity] = useState(1);

  const ideas = useMemo(
    () => [
      'An AI that writes code by understanding human emotion, not just syntax.',
      'A platform where machine learning models evolve through community feedback in real-time.',
      'Intelligent search that understands what you meant, not what you typed.',
      'An AI co-founder that helps validate startup ideas before writing a single line of code.',
      'A neural interface that translates developer intent directly into deployable infrastructure.',
      'Self-healing codebases that detect and patch vulnerabilities autonomously.',
      'AI-powered design systems that learn your brand and generate UI components on demand.',
      'Distributed intelligence networks where every device contributes to a shared AI brain.',
    ],
    []
  );

  const handleGenerateIdea = () => {
    setOpacity(0);
    setTimeout(() => {
      setIdeaText(ideas[ideaIndex % ideas.length]);
      setOpacity(1);
      setIdeaIndex((prev) => prev + 1);
    }, 400);
  };

  return (
    <section id="future" className="year-section fade-in-section future-bg visible">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <div className="section-line" style={{ justifyContent: 'center' }}>
          <div className="year-badge yfuture">▸ ∞ — TIMELINE OMEGA</div>
        </div>
        
        <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
          Intelligent Platforms
        </h2>
        <p style={{ fontFamily: 'var(--font-hud)', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '3px', marginBottom: '3rem' }}>
          THE JOURNEY IS STILL LOADING...
        </p>

        {/* IDEA GENERATOR */}
        <div className="idea-gen">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
            // FUTURE IDEAS GENERATOR
          </div>
          <div
            className="idea-text"
            id="ideaText"
            style={{ opacity: opacity, transition: 'opacity 0.4s' }}
          >
            {ideaText}
          </div>
          <button className="gen-btn" onClick={handleGenerateIdea}>
            ⚡ GENERATE NEXT TIMELINE
          </button>
        </div>

        {/* STRATEGY COLUMNS */}
        <div className="three-col" style={{ marginTop: '3rem' }}>
          <div className="glass-card">
            <div style={{ fontFamily: 'var(--font-hud)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>
              STARTUP VISION
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.7 }}>
              AI-powered platforms that adapt to human behavior in real-time. Systems that learn, grow, and evolve
              alongside users.
            </div>
          </div>

          <div className="glass-card">
            <div style={{ fontFamily: 'var(--font-hud)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>
              AI PRODUCTS
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.7 }}>
              Intelligent assistants embedded in daily workflows. Context-aware tools that amplify human creativity
              and productivity.
            </div>
          </div>

          <div className="glass-card">
            <div style={{ fontFamily: 'var(--font-hud)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>
              ECOSYSTEM
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.7 }}>
              Building the infrastructure where intelligence is a utility — accessible, scalable, and transformative
              across industries.
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.2)', letterSpacing: '3px' }}>
          &lt;/JOURNEY&gt; — TO BE CONTINUED...
        </div>
      </div>
    </section>
  );
}
