import React from 'react';

export default function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* HUD Corners */}
        <div className="hud-corner tl" style={{ borderColor: 'var(--neon-blue)' }} />
        <div className="hud-corner tr" style={{ borderColor: 'var(--neon-blue)' }} />
        <div className="hud-corner bl" style={{ borderColor: 'var(--neon-blue)' }} />
        <div className="hud-corner br" style={{ borderColor: 'var(--neon-blue)' }} />
        
        <h3 className="modal-title">{title}</h3>
        <div className="modal-content">{content}</div>
        <button className="modal-close" onClick={onClose}>
          ◀ CLOSE LOG
        </button>
      </div>
    </div>
  );
}
