import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const FUTURE_SKILLS = [
  { name: 'Artificial Intelligence', icon: '⬡', group: 'AI' },
  { name: 'Machine Learning', icon: '◈', group: 'AI' },
  { name: 'Deep Learning', icon: '◉', group: 'AI' },
  { name: 'NLP', icon: '{ }', group: 'AI' },
  { name: 'Computer Vision', icon: '◑', group: 'AI' },
  { name: 'Generative AI', icon: '★', group: 'AI' },
  { name: 'AI Agents', icon: '⊕', group: 'AI' },
  { name: 'LangChain', icon: '⛓', group: 'AI' },
  { name: 'RAG Systems', icon: '◧', group: 'Cloud' },
  { name: 'Vector DBs', icon: '▣', group: 'Cloud' },
  { name: 'Cloud Computing', icon: '☁', group: 'Cloud' },
  { name: 'Docker', icon: '⬢', group: 'Cloud' },
  { name: 'Kubernetes', icon: '✦', group: 'Cloud' },
  { name: 'AWS', icon: '△', group: 'Cloud' },
  { name: 'DevOps', icon: '⟳', group: 'Cloud' },
  { name: 'Three.js', icon: '◆', group: 'Creative' },
  { name: 'WebGL', icon: '◈', group: 'Creative' },
  { name: 'Blender', icon: '⬡', group: 'Creative' },
  { name: 'Motion Design', icon: '▶', group: 'Creative' },
  { name: 'Advanced DaVinci', icon: '◑', group: 'Creative' },
  { name: 'UI/UX Animation', icon: '✦', group: 'Creative' },
  { name: 'Mobile Dev', icon: '◻', group: 'Mobile' },
  { name: 'Cybersecurity', icon: '⚡', group: 'Mobile' },
];

const GROUP_COLORS = {
  AI: '#00C8FF',
  Cloud: '#8A5CFF',
  Creative: '#FF6B9D',
  Mobile: '#4DFFB4',
};

function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Nebula blobs
    const nebulas = [
      { x: 0.2, y: 0.2, r: 250, color: '138,92,255' },
      { x: 0.8, y: 0.7, r: 200, color: '0,200,255' },
      { x: 0.5, y: 0.5, r: 300, color: '80,0,150' },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulas
      nebulas.forEach(n => {
        const grd = ctx.createRadialGradient(
          n.x * canvas.width, n.y * canvas.height, 0,
          n.x * canvas.width, n.y * canvas.height, n.r
        );
        grd.addColorStop(0, `rgba(${n.color}, 0.12)`);
        grd.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw stars
      stars.forEach(s => {
        s.pulse += s.speed;
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(200, 220, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" style={{ width: '100%', height: '100%' }} />;
}

function OrbitingCards() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '700px' }}>
      {/* Central core */}
      <div className="absolute z-10 flex items-center justify-center">
        {/* Outer rings */}
        <div className="absolute w-[500px] h-[500px] rounded-full border ring-rotate pointer-events-none"
          style={{ borderColor: 'rgba(138,92,255,0.15)', borderStyle: 'dashed' }}
        />
        <div className="absolute w-[340px] h-[340px] rounded-full border ring-rotate-reverse pointer-events-none"
          style={{ borderColor: 'rgba(138,92,255,0.2)' }}
        />
        <div className="absolute w-[200px] h-[200px] rounded-full border ring-rotate-slow pointer-events-none"
          style={{ borderColor: 'rgba(0,200,255,0.25)' }}
        />

        {/* Core sphere */}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 0 40px rgba(138,92,255,0.6), 0 0 80px rgba(138,92,255,0.3)',
              '0 0 60px rgba(138,92,255,0.9), 0 0 120px rgba(138,92,255,0.5), 0 0 180px rgba(138,92,255,0.2)',
              '0 0 40px rgba(138,92,255,0.6), 0 0 80px rgba(138,92,255,0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(200,150,255,0.9), rgba(138,92,255,0.6), rgba(80,20,180,0.8))',
          }}
        >
          <span className="font-orbitron font-black text-white text-xs text-center leading-tight">
            FUTURE
          </span>
        </motion.div>
      </div>

      {/* Orbiting skill cards */}
      {FUTURE_SKILLS.map((skill, i) => {
        const total = FUTURE_SKILLS.length;
        const angle = (i / total) * 360;
        // Alternate between two orbit radii for depth
        const radius = i % 3 === 0 ? 230 : i % 3 === 1 ? 170 : 250;
        const duration = 18 + (i % 5) * 3;
        const color = GROUP_COLORS[skill.group];
        const delay = -(i / total) * duration;

        return (
          <motion.div
            key={skill.name}
            className="absolute"
            style={{
              width: '1px',
              height: '1px',
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{ rotate: [0 + angle, 360 + angle] }}
            transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
          >
            <motion.div
              style={{
                position: 'absolute',
                left: `${radius}px`,
                top: '-22px',
                transformOrigin: 'center',
              }}
              animate={{ rotate: [0 - angle, -(360 + angle)] }}
              transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
            >
              <motion.div
                className="hologram-card-purple rounded-xl px-3 py-2 flex items-center gap-2 whitespace-nowrap"
                style={{
                  borderColor: `${color}30`,
                  background: `rgba(20, 5, 40, 0.8)`,
                  backdropFilter: 'blur(12px)',
                  minWidth: '100px',
                  fontSize: '0.65rem',
                }}
                whileHover={{
                  scale: 1.3,
                  zIndex: 100,
                  boxShadow: `0 0 30px ${color}60`,
                  borderColor: `${color}80`,
                }}
              >
                <span style={{ color, fontSize: '0.8rem' }}>{skill.icon}</span>
                <span className="font-orbitron font-semibold text-white">{skill.name}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

const QUOTE_WORDS = ['The', 'future', 'isn\'t', 'predicted.', 'It', 'is', 'engineered.'];

export default function Future() {
  const navigate = useNavigate();
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: '-100px' });
  const [playing, setPlaying] = useState(null); // 'past' | null
  const videoRef = useRef(null);

  const handlePast = () => {
    setPlaying('past');
  };

  const handleVideoEnd = () => {
    setPlaying(null);
    navigate('/past');
  };

  const handleVideoClick = () => {
    handleVideoEnd();
  };

  return (
    <>
      <PageTransition>
        <div
          className="relative min-h-screen overflow-hidden"
        style={{ background: '#030010' }}
      >
        {/* Star field background */}
        <div className="absolute inset-0">
          <StarField />
        </div>

        {/* Purple grid overlay */}
        <div className="absolute inset-0 animated-grid-purple opacity-20" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <p className="font-orbitron text-xs tracking-[0.4em] mb-4" style={{ color: 'var(--neon-purple)' }}>
              ▶ FUTURE TIMELINE — INFINITE POSSIBILITIES
            </p>
            <h1 className="font-orbitron font-black text-4xl md:text-6xl text-white mb-4" style={{ letterSpacing: '0.1em' }}>
              FUTURE MISSION LOG
            </h1>
            <div
              className="h-[2px] mx-auto"
              style={{
                width: '180px',
                background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)',
              }}
            />
          </motion.div>

          {/* Mission Log subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center font-inter text-base mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Skills I want to master. Technologies I will conquer.
          </motion.p>

          {/* Orbiting cards */}
          <OrbitingCards />

          {/* Cinematic quote */}
          <div ref={quoteRef} className="text-center py-20 px-4">
            <div
              className="inline-block glass-purple p-10 rounded-2xl max-w-3xl"
              style={{
                border: '1px solid rgba(138,92,255,0.3)',
                boxShadow: '0 0 60px rgba(138,92,255,0.15)',
              }}
            >
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
                {QUOTE_WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={quoteInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="font-orbitron font-black text-3xl md:text-5xl"
                    style={{
                      color: i >= 5 ? 'var(--neon-purple)' : 'white',
                      textShadow: i >= 5 ? '0 0 30px rgba(138,92,255,0.8)' : 'none',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={quoteInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="h-[1px] mb-4"
                style={{ background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)' }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={quoteInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
                className="font-inter text-sm tracking-widest"
                style={{ color: 'var(--neon-purple)' }}
              >
                — ANAND, 2026
              </motion.p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 pb-16">
            <motion.button
              onClick={() => navigate('/time-machine')}
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
              ← TIME MACHINE
            </motion.button>
            <motion.button
              onClick={handlePast}
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
              ← PAST
            </motion.button>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="fixed top-4 left-4 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid rgba(138,92,255,0.4)', borderLeft: '2px solid rgba(138,92,255,0.4)' }} />
        <div className="fixed top-4 right-4 w-10 h-10 pointer-events-none" style={{ borderTop: '2px solid rgba(138,92,255,0.4)', borderRight: '2px solid rgba(138,92,255,0.4)' }} />
        <div className="fixed bottom-4 left-4 w-10 h-10 pointer-events-none" style={{ borderBottom: '2px solid rgba(138,92,255,0.4)', borderLeft: '2px solid rgba(138,92,255,0.4)' }} />
        <div className="fixed bottom-4 right-4 w-10 h-10 pointer-events-none" style={{ borderBottom: '2px solid rgba(138,92,255,0.4)', borderRight: '2px solid rgba(138,92,255,0.4)' }} />
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
              src="/backwardLoading.webm"
              autoPlay
              playsInline
              onEnded={handleVideoEnd}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-orbitron text-xs tracking-widest opacity-50"
              style={{ color: 'var(--electric-blue)' }}
            >
              CLICK TO SKIP
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
