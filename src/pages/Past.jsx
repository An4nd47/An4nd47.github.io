import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import PageTransition from '../components/PageTransition';
import { useVideoPlaying } from '../contexts/VideoPlayingContext';

const SKILL_SECTIONS = [
  {
    title: 'Languages',
    icon: '{ }',
    items: ['JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    icon: '◧',
    items: ['React.js'],
  },
  {
    title: 'Backend',
    icon: '⚙',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Database',
    icon: '◈',
    items: ['MySQL'],
  },
  {
    title: 'AI & Machine Learning',
    icon: '⬡',
    items: ['Fundamentals of AI & Machine Learning'],
  },
  {
    title: 'Tools',
    icon: '◉',
    items: ['Git', 'GitHub', 'VS Code', 'npm'],
  },
  {
    title: 'UI/UX',
    icon: '◑',
    items: ['Figma'],
  },
  {
    title: 'Editing',
    icon: '▶',
    items: ['DaVinci Resolve'],
  },
];

const MILESTONES = [
  { year: '2023', label: 'Started Coding', desc: 'First lines of code. Discovered the power of programming.' },
  { year: '2024', label: 'Built Web Applications', desc: 'Created full web apps, mastering HTML, CSS, and JavaScript.' },
  { year: '2025', label: 'Learned Full Stack Development', desc: 'Expanded to React, Node.js, Express, and databases.' },
  { year: '2026', label: 'Exploring AI & Creative Technologies', desc: 'Diving into AI fundamentals and creative tools like DaVinci Resolve.' },
];

function SkillSection({ section, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="hologram-card rounded-xl p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-lg font-orbitron" style={{ color: 'var(--electric-blue)' }}>{section.icon}</span>
        <h3 className="font-orbitron text-sm font-bold tracking-widest" style={{ color: 'var(--electric-blue)' }}>
          {section.title.toUpperCase()}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {section.items.map((item) => (
          <span
            key={item}
            className="font-inter text-sm px-3 py-1.5 rounded-lg"
            style={{
              background: 'rgba(0,200,255,0.08)',
              border: '1px solid rgba(0,200,255,0.15)',
              color: 'var(--text-secondary)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Milestone({ milestone, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <div ref={ref} className="flex gap-6 items-start">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className="w-12 h-12 rounded-full flex items-center justify-center font-orbitron font-bold text-xs"
          style={{
            background: 'rgba(0,200,255,0.1)',
            border: '2px solid rgba(0,200,255,0.6)',
            boxShadow: inView ? '0 0 20px rgba(0,200,255,0.4)' : 'none',
            color: 'var(--electric-blue)',
          }}
        >
          {milestone.year.slice(2)}
        </motion.div>
        {index < total - 1 && (
          <motion.div
            className="w-[2px] flex-1 min-h-[60px]"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            style={{
              background: 'linear-gradient(180deg, rgba(0,200,255,0.6), rgba(0,200,255,0.1))',
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
        className="hologram-card rounded-xl p-5 flex-1 mb-6"
      >
        <div className="font-orbitron font-bold text-lg mb-1" style={{ color: 'var(--electric-blue)' }}>
          {milestone.year}
        </div>
        <div className="font-orbitron text-sm font-semibold text-white mb-2">{milestone.label}</div>
        <p className="font-inter text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {milestone.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function Past() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(null); // 'future' | null
  const videoRef = useRef(null);
  const { setPlaying: setVideoCtx } = useVideoPlaying();

  const handleFuture = () => {
    setPlaying('future');
    setVideoCtx(true);
  };

  const handleVideoEnd = () => {
    setPlaying(null);
    setVideoCtx(false);
    navigate('/future');
  };

  const handleVideoClick = () => {
    handleVideoEnd();
  };

  return (
    <>
      <PageTransition>
        <div
          className="relative min-h-screen"
        style={{ background: 'linear-gradient(180deg, #020408 0%, #000d1a 50%, #020408 100%)' }}
      >
        {/* Background */}
        <div className="absolute inset-0 animated-grid opacity-25" />
        <div className="absolute inset-0 pointer-events-none">
          <ParticleField color="blue" count={50} />
        </div>

        {/* Blue ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,200,255,0.08) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="font-orbitron text-xs tracking-[0.4em] mb-4" style={{ color: 'var(--electric-blue)' }}>
              ◀ PAST TIMELINE
            </p>
            <h1 className="font-orbitron font-black text-4xl md:text-6xl text-white mb-4" style={{ letterSpacing: '0.1em' }}>
              MEMORY ARCHIVES
            </h1>
            <div
              className="h-[2px] mx-auto mb-6"
              style={{
                width: '180px',
                background: 'linear-gradient(90deg, transparent, var(--electric-blue), transparent)',
              }}
            />
            <p className="font-inter text-base" style={{ color: 'var(--text-secondary)' }}>
              A digital archive of technical skills and career milestones.
            </p>
          </motion.div>

          {/* Technical Skills */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-orbitron text-xl font-bold mb-8 flex items-center gap-4"
            style={{ color: 'var(--electric-blue)' }}
          >
            <span>⬡</span>
            TECHNICAL SKILLS
            <span className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(0,200,255,0.4), transparent)' }} />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            {SKILL_SECTIONS.map((section, i) => (
              <SkillSection key={section.title} section={section} index={i} />
            ))}
          </div>

          {/* Career Timeline */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-orbitron text-xl font-bold mb-10 flex items-center gap-4"
            style={{ color: 'var(--electric-blue)' }}
          >
            <span>◉</span>
            CAREER TIMELINE
            <span className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(0,200,255,0.4), transparent)' }} />
          </motion.h2>

          <div className="max-w-2xl mx-auto">
            {MILESTONES.map((m, i) => (
              <Milestone key={m.year} milestone={m} index={i} total={MILESTONES.length} />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-16">
            <motion.button
              onClick={() => navigate('/time-machine')}
              className="font-orbitron text-sm px-8 py-3 rounded-xl"
              style={{
                background: 'rgba(0,200,255,0.08)',
                border: '1px solid rgba(0,200,255,0.3)',
                color: 'var(--electric-blue)',
                letterSpacing: '0.15em',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,200,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              ← TIME MACHINE
            </motion.button>
            <motion.button
              onClick={handleFuture}
              className="font-orbitron text-sm px-8 py-3 rounded-xl"
              style={{
                background: 'rgba(138,92,255,0.08)',
                border: '1px solid rgba(138,92,255,0.3)',
                color: 'var(--neon-purple)',
                letterSpacing: '0.15em',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(138,92,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              FUTURE →
            </motion.button>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="fixed top-4 left-4 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid rgba(0,200,255,0.3)', borderLeft: '2px solid rgba(0,200,255,0.3)' }} />
        <div className="fixed top-4 right-4 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid rgba(0,200,255,0.3)', borderRight: '2px solid rgba(0,200,255,0.3)' }} />
      </div>

      </PageTransition>

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
              src="/delorianVideo.webm"
              autoPlay
              playsInline
              onEnded={handleVideoEnd}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-orbitron text-xs tracking-widest opacity-50"
              style={{ color: 'var(--neon-purple)' }}
            >
              CLICK TO SKIP
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
