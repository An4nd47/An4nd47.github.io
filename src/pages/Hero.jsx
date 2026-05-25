import React from 'react';
import ParticlesBg from '../components/ParticlesBg';

export default function Hero({ onInitiate }) {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <ParticlesBg />
      <div className="scanline-effect" />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '900px' }}>
        <div className="hero-eyebrow">⬡ TEMPORAL JOURNEY INITIALIZED ⬡</div>
        <h1 className="hero-title">
          Travelling Through the<br />
          <span>Evolution of an AI Developer</span>
        </h1>
        <p className="hero-sub">
          From writing the first line of code to building intelligent systems. Each year, a new timeline unlocked.
        </p>

        <div className="delorean-container">
          <div className="speed-lines" style={{ top: '60%' }}>
            <div
              className="speed-line"
              style={{
                animationDuration: '1.2s',
                animationDelay: '0s',
                top: 0,
                background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), transparent)',
              }}
            />
            <div
              className="speed-line"
              style={{
                animationDuration: '1.8s',
                animationDelay: '0.4s',
                top: '8px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 107, 0, 0.4), transparent)',
              }}
            />
            <div
              className="speed-line"
              style={{
                animationDuration: '1.4s',
                animationDelay: '0.8s',
                top: '-5px',
              }}
            />
          </div>
          <img
            src="/mnt/user-data/uploads/1779543407813_image.png"
            alt="DeLorean Time Machine"
            className="delorean-img"
            style={{ width: '100%', position: 'relative', zIndex: 1 }}
          />
          <div className="delorean-glow" />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <button className="cta-btn" onClick={() => onInitiate('y2023')}>
            INITIATE JOURNEY <span className="arrow">→</span>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '2px',
          }}
        >
          <span>DEPARTURE: 2023</span>
          <span>DESTINATION: ∞</span>
          <span>POWER: 1.21 GW</span>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
