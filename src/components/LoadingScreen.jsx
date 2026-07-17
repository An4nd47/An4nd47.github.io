import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const LOADING_STEPS = [
  'Scanning Timeline...',
  'Loading Memory Archives...',
  'Synchronizing Future Data...',
  'Calibrating Temporal Engine...',
  'System Ready.',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const duration = 3200;
    const interval = 30;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      current += increment + Math.random() * 0.5;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 400);
      }
      setProgress(Math.min(current, 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const idx = Math.floor((progress / 100) * LOADING_STEPS.length);
    setStepIndex(Math.min(idx, LOADING_STEPS.length - 1));
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-dark)' }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 animated-grid opacity-30" />
          
          {/* Scan line */}
          <div className="scan-line" />

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-8 max-w-lg w-full">
            {/* Logo / Title */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-orbitron text-electric-blue tracking-[0.4em] mb-4 text-glow-blue"
                style={{ color: 'var(--electric-blue)' }}
              >
                TEMPORAL NAVIGATION SYSTEM v2.026
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-orbitron font-black text-3xl md:text-5xl text-white text-glow-blue"
                style={{ letterSpacing: '0.15em' }}
              >
                INITIALIZING
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-orbitron font-black text-3xl md:text-5xl"
                style={{
                  color: 'var(--electric-blue)',
                  letterSpacing: '0.15em',
                  textShadow: '0 0 30px rgba(0,200,255,0.8)',
                }}
              >
                TEMPORAL SYSTEM
              </motion.h1>
            </div>

            {/* Rotating rings */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-electric-blue/20 ring-rotate" />
              <div className="absolute inset-2 rounded-full border border-neon-purple/30 ring-rotate-reverse" />
              <div className="absolute inset-4 rounded-full border border-electric-blue/40 ring-rotate-slow" />
              <div
                className="w-8 h-8 rounded-full animate-energy-pulse"
                style={{ background: 'radial-gradient(circle, var(--electric-blue), transparent)' }}
              />
            </div>

            {/* Steps */}
            <div className="w-full space-y-2 h-32">
              {LOADING_STEPS.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: i <= stepIndex ? 1 : 0.2,
                    x: 0,
                  }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 font-inter text-sm"
                >
                  <span
                    style={{
                      color: i <= stepIndex ? 'var(--electric-blue)' : 'rgba(0,200,255,0.2)',
                    }}
                    className="font-orbitron"
                  >
                    {i < stepIndex ? '✓' : i === stepIndex ? '▶' : '○'}
                  </span>
                  <span style={{ color: i <= stepIndex ? 'var(--text-primary)' : 'var(--text-dim)' }}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs font-orbitron mb-2" style={{ color: 'var(--text-dim)' }}>
                <span>LOADING</span>
                <span style={{ color: 'var(--electric-blue)' }}>{Math.round(progress)}%</span>
              </div>
              <div
                className="w-full h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(0, 200, 255, 0.1)', border: '1px solid rgba(0,200,255,0.2)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--electric-blue), var(--neon-purple))',
                    boxShadow: '0 0 10px rgba(0, 200, 255, 0.8)',
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.05 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
