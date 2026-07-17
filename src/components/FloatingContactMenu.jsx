import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlaying } from '../contexts/VideoPlayingContext';
import { useSystemInit } from '../contexts/SystemInitContext';

// ─── Configuration ─────────────────────────────────────────────────────────────
const CONTACTS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/An4nd47',
    color: 'rgba(200,200,200,0.9)',
    glow: '0 0 18px rgba(200,200,200,0.5)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    href: 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new',
    color: 'rgba(255,120,120,0.9)',
    glow: '0 0 18px rgba(255,120,120,0.4)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anand-m-s-986b69281/',
    color: 'rgba(10,102,194,0.95)',
    glow: '0 0 18px rgba(10,102,194,0.6)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/an._4nd_/?hl=en',
    color: 'rgba(225,48,108,0.95)',
    glow: '0 0 18px rgba(225,48,108,0.5)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

// ─── Sub-button variants ────────────────────────────────────────────────────────
// i=0 is the icon nearest the main button (Instagram), i=3 is the furthest (GitHub)
// Opening: i=0 first → i=3 last  (bottom to top)
// Closing:  i=3 first → i=0 last  (top to bottom, reverse)
const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.4 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 18,
      delay: i * 0.18,   // 0ms, 180ms, 360ms, 540ms — bottom→top
    },
  }),
  exit: (i) => ({
    opacity: 0,
    y: 24,
    scale: 0.4,
    transition: {
      duration: 0.22,
      ease: 'easeIn',
      delay: (CONTACTS.length - 1 - i) * 0.14,  // top closes first
    },
  }),
};

// ─── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div
        className="font-orbitron text-[10px] tracking-widest text-[var(--electric-blue)] px-3 py-1.5 rounded whitespace-nowrap"
        style={{
          background: 'rgba(0,10,20,0.85)',
          border: '1px solid rgba(0,200,255,0.25)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 0 10px rgba(0,200,255,0.15)',
        }}
      >
        {label.toUpperCase()}
        {/* Arrow */}
        <span
          className="absolute top-1/2 -translate-y-1/2 -right-[6px] border-t-[5px] border-b-[5px] border-l-[6px] border-t-transparent border-b-transparent"
          style={{ borderLeftColor: 'rgba(0,200,255,0.25)' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Individual contact button ──────────────────────────────────────────────────
function ContactButton({ contact, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      custom={index}  // i=0 nearest (Instagram) opens first, closes last
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <AnimatePresence>{hovered && <Tooltip label={contact.label} />}</AnimatePresence>

      <motion.a
        href={contact.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={contact.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="flex items-center justify-center rounded-full focus:outline-none"
        style={{
          width: 46,
          height: 46,
          background: 'rgba(0,8,20,0.75)',
          border: '1px solid rgba(0,200,255,0.2)',
          backdropFilter: 'blur(12px)',
          color: contact.color,
          boxShadow: '0 0 0px transparent',
        }}
        whileHover={{
          scale: 1.15,
          y: -3,
          boxShadow: contact.glow,
          borderColor: 'rgba(0,200,255,0.6)',
          transition: { type: 'spring', stiffness: 400, damping: 15 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        {contact.icon}
      </motion.a>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function FloatingContactMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { playing: videoPlaying } = useVideoPlaying();
  const { initialized } = useSystemInit();

  // Collapse on outside click
  const handleOutsideClick = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  // Collapse on ESC
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOutsideClick, handleKeyDown]);

  // Auto-close when a video starts playing
  useEffect(() => {
    if (videoPlaying) setOpen(false);
  }, [videoPlaying]);

  return (
    <AnimatePresence>
      {!videoPlaying && initialized && (
        <motion.div
          key="contact-widget"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35 }}
        >
          <div
            ref={ref}
            className="fixed bottom-7 right-7 z-[9990] flex flex-col-reverse items-center gap-3"
            style={{ userSelect: 'none' }}
          >
      {/* ── Main trigger button ── */}
      <motion.button
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric-blue)]"
        style={{
          width: 62,
          height: 62,
          background: 'rgba(0,10,25,0.8)',
          border: '1.5px solid rgba(0,200,255,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: 'var(--electric-blue)',
        }}
        animate={{
          boxShadow: open
            ? [
                '0 0 20px rgba(0,200,255,0.5)',
                '0 0 35px rgba(0,200,255,0.7)',
                '0 0 20px rgba(0,200,255,0.5)',
              ]
            : [
                '0 0 8px rgba(0,200,255,0.2)',
                '0 0 20px rgba(0,200,255,0.45)',
                '0 0 8px rgba(0,200,255,0.2)',
              ],
          borderColor: open
            ? 'rgba(0,200,255,0.9)'
            : 'rgba(0,200,255,0.45)',
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 0 30px rgba(0,200,255,0.7)',
          borderColor: 'rgba(0,200,255,0.9)',
        }}
        whileTap={{ scale: 0.93 }}
      >
        {/* Spinning ring decoration */}
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '1px dashed rgba(0,200,255,0.25)',
          }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Icon morphs between person and X */}
        <motion.div
          animate={{ rotate: open ? 135 : 0, scale: open ? 0.85 : 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        >
          {open ? (
            /* X icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Person / contact icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* ── Expanded contact buttons (bottom-to-top: instagram → linkedin → email → github) ── */}
      <AnimatePresence>
        {open &&
          [...CONTACTS].reverse().map((contact, i) => (
            <ContactButton key={contact.id} contact={contact} index={i} />
          ))}
      </AnimatePresence>
    </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
