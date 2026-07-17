import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import PageTransition from '../components/PageTransition';
import { useVideoPlaying } from '../contexts/VideoPlayingContext';

export default function TimeMachine() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null); // 'past' | 'future' | null
  const [playing, setPlaying] = useState(null); // 'past' | 'future' | null
  const videoRef = useRef(null);
  const { setPlaying: setVideoCtx } = useVideoPlaying();

  const handlePast = () => {
    setPlaying('past');
    setVideoCtx(true);
  };

  const handleFuture = () => {
    setPlaying('future');
    setVideoCtx(true);
  };

  const handleVideoEnd = () => {
    const dest = playing;
    setPlaying(null);
    setVideoCtx(false);
    navigate(dest === 'past' ? '/past' : '/future');
  };

  // Allow skip by clicking video
  const handleVideoClick = () => {
    handleVideoEnd();
  };

  return (
    <PageTransition>
      <div
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ background: 'var(--bg-dark)' }}
      >
        {/* Background */}
        <div className="absolute inset-0 animated-grid opacity-30" />
        <ParticleField
          color={hover === 'future' ? 'purple' : 'blue'}
          count={60}
        />

        {/* Ambient glow based on hover */}
        <AnimatePresence>
          {hover === 'past' && (
            <motion.div
              key="past-glow"
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,200,255,0.12) 0%, transparent 70%)',
              }}
            />
          )}
          {hover === 'future' && (
            <motion.div
              key="future-glow"
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(138,92,255,0.12) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-4xl">

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-orbitron text-xs tracking-[0.4em] mb-2" style={{ color: 'var(--electric-blue)' }}>
              TEMPORAL NAVIGATION HUB
            </p>
            <h1 className="font-orbitron font-black text-3xl md:text-5xl text-white" style={{ letterSpacing: '0.1em' }}>
              TIME MACHINE
            </h1>
          </motion.div>

          {/* DeLorean */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative"
          >
            {/* Glow rings behind car */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: hover === 'past'
                  ? ['0 0 60px rgba(0,200,255,0.3)', '0 0 120px rgba(0,200,255,0.6)', '0 0 60px rgba(0,200,255,0.3)']
                  : hover === 'future'
                    ? ['0 0 60px rgba(138,92,255,0.3)', '0 0 120px rgba(138,92,255,0.6)', '0 0 60px rgba(138,92,255,0.3)']
                    : ['0 0 30px rgba(0,200,255,0.2)', '0 0 60px rgba(138,92,255,0.2)', '0 0 30px rgba(0,200,255,0.2)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: 'blur(20px)', borderRadius: '50%', width: '100%', height: '100%' }}
            />

            {/* Rotating ring */}
            <div className="absolute -inset-8 rounded-full border ring-rotate pointer-events-none"
              style={{ borderColor: hover === 'future' ? 'rgba(138,92,255,0.3)' : 'rgba(0,200,255,0.3)' }}
            />
            <div className="absolute -inset-16 rounded-full border ring-rotate-reverse pointer-events-none"
              style={{ borderColor: hover === 'future' ? 'rgba(138,92,255,0.15)' : 'rgba(0,200,255,0.15)', borderStyle: 'dashed' }}
            />

            {/* DeLorean image */}
            <motion.img
              src="/delorian.webp"
              alt="DeLorean Time Machine"
              className="relative z-10 w-64 md:w-80 lg:w-96 object-contain"
              animate={{
                y: [0, -16, 0],
                filter: hover === 'past'
                  ? 'drop-shadow(0 0 30px rgba(0,200,255,0.8))'
                  : hover === 'future'
                    ? 'drop-shadow(0 0 30px rgba(138,92,255,0.8))'
                    : 'drop-shadow(0 0 15px rgba(0,200,255,0.4))',
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                filter: { duration: 0.4 },
              }}
              style={{ maxHeight: '300px' }}
            />
          </motion.div>

          {/* Navigation buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            {/* PAST button */}
            <motion.button
              id="btn-past"
              onClick={handlePast}
              onHoverStart={() => setHover('past')}
              onHoverEnd={() => setHover(null)}
              className="relative font-orbitron font-bold text-base md:text-xl px-10 py-4 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(0, 200, 255, 0.08)',
                border: '1px solid rgba(0, 200, 255, 0.4)',
                color: 'var(--electric-blue)',
                letterSpacing: '0.25em',
                minWidth: '180px',
              }}
              whileHover={{
                scale: 1.06,
                background: 'rgba(0,200,255,0.15)',
                borderColor: 'rgba(0,200,255,0.8)',
                boxShadow: '0 0 40px rgba(0,200,255,0.5), 0 0 80px rgba(0,200,255,0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3 justify-center">
                <motion.span
                  animate={{ x: hover === 'past' ? [-4, 0, -4] : 0 }}
                  transition={{ duration: 0.6, repeat: hover === 'past' ? Infinity : 0 }}
                >
                  ◀
                </motion.span>
                PAST
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-px w-8 sm:h-12 sm:w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
              <motion.div
                className="w-3 h-3 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ background: 'var(--electric-blue)', boxShadow: '0 0 10px var(--electric-blue)' }}
              />
              <div className="h-px w-8 sm:h-12 sm:w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            </div>

            {/* FUTURE button */}
            <motion.button
              id="btn-future"
              onClick={handleFuture}
              onHoverStart={() => setHover('future')}
              onHoverEnd={() => setHover(null)}
              className="relative font-orbitron font-bold text-base md:text-xl px-10 py-4 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(138, 92, 255, 0.08)',
                border: '1px solid rgba(138,92,255,0.4)',
                color: 'var(--neon-purple)',
                letterSpacing: '0.25em',
                minWidth: '180px',
              }}
              whileHover={{
                scale: 1.06,
                background: 'rgba(138,92,255,0.15)',
                borderColor: 'rgba(138,92,255,0.8)',
                boxShadow: '0 0 40px rgba(138,92,255,0.5), 0 0 80px rgba(138,92,255,0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3 justify-center">
                FUTURE
                <motion.span
                  animate={{ x: hover === 'future' ? [4, 0, 4] : 0 }}
                  transition={{ duration: 0.6, repeat: hover === 'future' ? Infinity : 0 }}
                >
                  ▶
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Back to present */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => navigate('/')}
            className="font-inter text-xs tracking-widest hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-dim)' }}
          >
            ← RETURN TO PRESENT
          </motion.button>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 pointer-events-none" style={{ borderTop: '2px solid rgba(0,200,255,0.3)', borderLeft: '2px solid rgba(0,200,255,0.3)' }} />
        <div className="absolute top-4 right-4 w-12 h-12 pointer-events-none" style={{ borderTop: '2px solid rgba(138,92,255,0.3)', borderRight: '2px solid rgba(138,92,255,0.3)' }} />
        <div className="absolute bottom-4 left-4 w-12 h-12 pointer-events-none" style={{ borderBottom: '2px solid rgba(0,200,255,0.3)', borderLeft: '2px solid rgba(0,200,255,0.3)' }} />
        <div className="absolute bottom-4 right-4 w-12 h-12 pointer-events-none" style={{ borderBottom: '2px solid rgba(138,92,255,0.3)', borderRight: '2px solid rgba(138,92,255,0.3)' }} />
      </div>

      {/* Video overlay */}
      <AnimatePresence>
        {playing && (
          <motion.div
            className="video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              src={playing === 'past' ? '/backwardLoading.webm' : '/delorianVideo.webm'}
              autoPlay
              playsInline
              onEnded={handleVideoEnd}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-orbitron text-xs tracking-widest opacity-50"
              style={{ color: playing === 'past' ? 'var(--electric-blue)' : 'var(--neon-purple)' }}
            >
              CLICK TO SKIP
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
