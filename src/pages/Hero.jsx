import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import PageTransition from '../components/PageTransition';

const STATUS_LINES = [
  { icon: '◈', text: 'Full Stack Web Developer (Learning)' },
  { icon: '◈', text: 'React.js & Node.js Enthusiast' },
  { icon: '◈', text: 'Building Modern Web Applications' },
  { icon: '◈', text: 'Exploring AI & Machine Learning Fundamentals' },
  { icon: '◈', text: 'Currently Learning DaVinci Resolve Video Editing' },
];

const SKILLS = [
  'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3',
  'React.js', 'Node.js', 'Express.js', 'REST APIs', 'MySQL',
  'Git', 'GitHub', 'VS Code', 'npm', 'Figma', 'DaVinci Resolve',
];

const SKILL_COLORS = [
  '#00C8FF', '#8A5CFF', '#00C8FF', '#4DFFB4', '#FF6B9D',
  '#00C8FF', '#8A5CFF', '#00C8FF', '#FFD700', '#4DFFB4',
  '#FF6B9D', '#00C8FF', '#8A5CFF', '#4DFFB4', '#FF6B9D', '#FFD700',
];

function SkillChip({ skill, color, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.06, ease: 'easeOut' }}
      whileHover={{ scale: 1.15, y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: `rgba(${color === '#00C8FF' ? '0,200,255' : color === '#8A5CFF' ? '138,92,255' : '77,255,180'}, 0.08)`,
        border: `1px solid ${color}40`,
        boxShadow: hovered ? `0 0 20px ${color}60, 0 0 40px ${color}30` : `0 0 8px ${color}20`,
        color: color,
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '0.75rem',
        fontFamily: 'Orbitron, monospace',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        backdropFilter: 'blur(10px)',
        userSelect: 'none',
      }}
    >
      {skill}
    </motion.div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [portalActive, setPortalActive] = useState(false);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mouse parallax
  useEffect(() => {
    const handle = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const lightX = useTransform(mouseX, [-0.5, 0.5], ['-30%', '130%']);
  const lightY = useTransform(mouseY, [-0.5, 0.5], ['-30%', '130%']);

  const handleEnterTimeMachine = () => {
    setPortalActive(true);
    setTimeout(() => navigate('/time-machine'), 700);
  };

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: 'var(--bg-dark)' }}
      >
        {/* Animated background layers */}
        <div className="absolute inset-0 animated-grid opacity-40" />
        <ParticleField color="blue" count={80} />

        {/* Mouse-reactive light */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%)',
            left: lightX,
            top: lightY,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Light beams */}
        <div className="light-beam" style={{ left: '20%', animationDelay: '0s' }} />
        <div className="light-beam" style={{ left: '60%', animationDelay: '4s' }} />
        <div className="light-beam" style={{ left: '80%', animationDelay: '2s' }} />

        {/* Portal activation overlay */}
        {portalActive && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: 'radial-gradient(circle at center, rgba(0,200,255,0.3) 0%, rgba(0,0,0,0.95) 70%)' }}
          >
            <motion.div
              className="w-4 h-4 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 80] }}
              transition={{ duration: 0.7, ease: 'easeIn' }}
              style={{ background: 'var(--electric-blue)', boxShadow: '0 0 60px var(--electric-blue)' }}
            />
          </motion.div>
        )}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen pt-16 pb-20 px-4">

          {/* Timeline badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-orbitron text-xs tracking-[0.4em] mb-6 px-6 py-2 rounded-full"
            style={{
              color: 'var(--electric-blue)',
              border: '1px solid rgba(0,200,255,0.3)',
              background: 'rgba(0,200,255,0.05)',
              letterSpacing: '0.35em',
            }}
          >
            ◉ CURRENT TIMELINE — 2026
          </motion.div>

          {/* Hero heading */}
          <div className="text-center mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl text-white mb-2 glitch"
              data-text="ANAND"
              style={{ letterSpacing: '0.15em' }}
            >
              ANAND
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-[2px] mx-auto mb-4"
              style={{
                width: '200px',
                background: 'linear-gradient(90deg, transparent, var(--electric-blue), var(--neon-purple), transparent)',
                boxShadow: '0 0 20px rgba(0,200,255,0.6)',
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="font-inter text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Building intelligent web experiences while exploring the future of AI.
            </motion.p>
          </div>

          {/* Status panel + Skill hologram side by side on desktop */}
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 px-4">

            {/* Current Status Glass Panel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="glass flex-1 p-6"
              style={{ minWidth: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--electric-blue)', boxShadow: '0 0 8px var(--electric-blue)' }} />
                <span className="font-orbitron text-xs tracking-widest" style={{ color: 'var(--electric-blue)' }}>
                  CURRENT STATUS
                </span>
              </div>
              <div className="space-y-3">
                {STATUS_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
                    className="flex items-start gap-3 group"
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--electric-blue)', fontSize: '0.8rem' }}
                    >
                      {line.icon}
                    </motion.span>
                    <span
                      className="font-inter text-sm leading-relaxed group-hover:text-white transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill Hologram Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="glass flex-1 p-6"
              style={{ minWidth: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon-purple)', boxShadow: '0 0 8px var(--neon-purple)' }} />
                <span className="font-orbitron text-xs tracking-widest" style={{ color: 'var(--neon-purple)' }}>
                  SKILL HOLOGRAM
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, i) => (
                  <SkillChip key={skill} skill={skill} color={SKILL_COLORS[i]} index={i} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enter Time Machine Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-12"
          >
            <motion.button
              id="enter-time-machine"
              data-magnetic
              onClick={handleEnterTimeMachine}
              className="relative font-orbitron font-bold text-base md:text-lg px-12 py-5 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,200,255,0.1), rgba(138,92,255,0.1))',
                border: '1px solid rgba(0,200,255,0.5)',
                color: 'var(--electric-blue)',
                letterSpacing: '0.2em',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(0,200,255,0.5), 0 0 80px rgba(0,200,255,0.25)',
                borderColor: 'rgba(0,200,255,0.9)',
              }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0,200,255,0.3)',
                  '0 0 40px rgba(0,200,255,0.6)',
                  '0 0 20px rgba(0,200,255,0.3)',
                ],
              }}
              transition={{
                boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 holographic opacity-60"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  ⊕
                </motion.span>
                ENTER TIME MACHINE
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  ⊕
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <span className="font-inter text-xs tracking-widest" style={{ color: 'var(--text-dim)' }}>
              SCROLL TO EXPLORE
            </span>
            <motion.div
              className="w-[1px] h-8"
              style={{ background: 'linear-gradient(180deg, var(--electric-blue), transparent)' }}
              animate={{ opacity: [1, 0, 1], scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-12 h-12 pointer-events-none" style={{ borderTop: '2px solid rgba(0,200,255,0.4)', borderLeft: '2px solid rgba(0,200,255,0.4)' }} />
        <div className="absolute top-4 right-4 w-12 h-12 pointer-events-none" style={{ borderTop: '2px solid rgba(0,200,255,0.4)', borderRight: '2px solid rgba(0,200,255,0.4)' }} />
        <div className="absolute bottom-4 left-4 w-12 h-12 pointer-events-none" style={{ borderBottom: '2px solid rgba(0,200,255,0.4)', borderLeft: '2px solid rgba(0,200,255,0.4)' }} />
        <div className="absolute bottom-4 right-4 w-12 h-12 pointer-events-none" style={{ borderBottom: '2px solid rgba(0,200,255,0.4)', borderRight: '2px solid rgba(0,200,255,0.4)' }} />
      </div>
    </PageTransition>
  );
}
