import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import PageTransition from '../components/PageTransition';
import { useSystemInit } from '../contexts/SystemInitContext';

// Audio Context for the typing sound
let audioCtx = null;
let hasSeenAnimation = false;

const initAudio = () => {
  if (typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx && AudioContext) {
      audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }
};

const playTypingSound = () => {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(600 + Math.random() * 400, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // Professional, subtle volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Fail silently if audio isn't supported or fails
  }
};

const SKILL_CATEGORIES = [
  { name: 'FRONTEND', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js'] },
  { name: 'BACKEND', items: ['Node.js', 'Express.js', 'Python', 'REST APIs'] },
  { name: 'UI', items: ['Figma', 'DaVinci Resolve'] },
  { name: 'OTHER', items: ['MySQL', 'SQL'] }
];

// Helper component for typewriter effect
function TypewriterLine({ text, onComplete, speed = 30, instant = false }) {
  const [displayedText, setDisplayedText] = useState(instant ? text : '');
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    if (instant) {
      setDisplayedText(text);
      return;
    }

    let timeoutId;
    let i = 0;
    
    const typeNextChar = () => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        if (text[i] !== ' ') {
          playTypingSound();
        }
        i++;
        // Add random variation to typing speed for realism
        const variance = Math.random() * 20 - 10;
        timeoutId = setTimeout(typeNextChar, Math.max(10, speed + variance));
      } else {
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };
    
    timeoutId = setTimeout(typeNextChar, speed);
    
    return () => clearTimeout(timeoutId);
  }, [text, speed, instant]);
  
  return <span>{displayedText}</span>;
}

// Renders a list of items sequentially
function TypewriterBlock({ items, onComplete, speed = 30, instant = false }) {
  const [currentIndex, setCurrentIndex] = useState(instant ? items.length : 0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleLineComplete = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (onCompleteRef.current) onCompleteRef.current();
    }
  }, [currentIndex, items.length]);

  return (
    <ul className="space-y-1 mt-2">
      {items.map((item, idx) => (
        <li key={item} className="text-[var(--electric-blue)] text-xs md:text-sm flex items-start min-h-[20px]">
          {(instant || idx <= currentIndex) && (
            <>
              <span className="mr-2 text-[var(--neon-purple)] opacity-70">&gt;</span>
              <TypewriterLine 
                text={item} 
                onComplete={(!instant && idx === currentIndex) ? handleLineComplete : undefined} 
                speed={speed} 
                instant={instant}
              />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const isInstant = useRef(hasSeenAnimation).current;
  const [portalActive, setPortalActive] = useState(false);
  const [localInitialized, setLocalInitialized] = useState(isInstant);
  const [stage, setStage] = useState(isInstant ? 6 : 0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(isInstant ? SKILL_CATEGORIES.length : 0);
  const { setInitialized: setGlobalInit } = useSystemInit();

  // On mount, if it's instant, set global initialized immediately
  useEffect(() => {
    if (isInstant) {
      setGlobalInit(true);
    }
  }, [isInstant, setGlobalInit]);
  
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
  }, [mouseX, mouseY]);

  const lightX = useTransform(mouseX, [-0.5, 0.5], ['-30%', '130%']);
  const lightY = useTransform(mouseY, [-0.5, 0.5], ['-30%', '130%']);

  const handleInitialize = () => {
    initAudio();
    setLocalInitialized(true);
    setGlobalInit(true);
    setStage(1);
    hasSeenAnimation = true;
  };

  const handleEnterTimeMachine = () => {
    setPortalActive(true);
    setTimeout(() => navigate('/time-machine'), 700);
  };

  // Prevent scroll jumping
  const onLineComplete = useCallback((nextStage) => {
    // Add small delay before starting next line
    setTimeout(() => {
      setStage(nextStage);
    }, 200);
  }, []);

  const handleCategoryComplete = useCallback(() => {
    setActiveCategoryIndex(prev => {
      const next = prev + 1;
      if (next === SKILL_CATEGORIES.length) {
        setTimeout(() => setStage(6), 200);
      }
      return next;
    });
  }, []);

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: localInitialized ? 'var(--bg-dark)' : '#000000', transition: 'background-color 0.5s ease-in-out' }}
      >
        {/* Animated background layers */}
        {localInitialized && (
          <>
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
          </>
        )}

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
        <div className="relative z-10 flex flex-col items-center justify-center h-screen w-full px-4 overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!localInitialized ? (
              <motion.div
                key="init-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 mb-8 rounded-full border border-[rgba(0,200,255,0.5)] flex items-center justify-center animate-pulse" style={{ boxShadow: '0 0 20px rgba(0,200,255,0.3)' }}>
                  <div className="w-3 h-3 bg-[var(--electric-blue)] rounded-full" />
                </div>
                <button
                  onClick={handleInitialize}
                  className="font-orbitron text-lg md:text-xl tracking-[0.3em] text-[var(--electric-blue)] hover:text-white hover:shadow-[0_0_30px_rgba(0,200,255,0.6)] transition-all duration-300 px-10 py-5 border border-[rgba(0,200,255,0.5)] rounded-xl glass"
                  style={{ background: 'rgba(0,200,255,0.05)' }}
                >
                  INITIALIZE SYSTEM
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-4xl mx-auto flex flex-col items-center"
              >
                {/* Terminal Window */}
                <div 
                  className="w-full glass p-6 md:p-8 mb-8 relative overflow-hidden text-left"
                  style={{
                    boxShadow: '0 0 40px rgba(0,200,255,0.1), inset 0 0 20px rgba(0,200,255,0.05)',
                    border: '1px solid rgba(0,200,255,0.3)',
                    height: '520px'
                  }}
                >
                  {/* Scan line effect inside terminal */}
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }} />
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-[rgba(0,200,255,0.2)] pb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="font-orbitron text-xs tracking-widest text-[var(--text-dim)] uppercase ml-2 hidden sm:block">
                        System Boot Sequence - Terminal v1.0
                      </span>
                    </div>

                    <AnimatePresence>
                      {stage >= 6 && (
                        <motion.a 
                          href="/Anand_MS_Resume_ATS (2).pdf" 
                          download="Anand_M_S_Resume.pdf"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: [0.3, 0.7, 0.3], 
                            borderColor: ['rgba(0,200,255,0.1)', 'rgba(0,200,255,0.4)', 'rgba(0,200,255,0.1)'],
                            boxShadow: ['0 0 0px rgba(0,200,255,0)', '0 0 10px rgba(0,200,255,0.2)', '0 0 0px rgba(0,200,255,0)']
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          whileHover={{ 
                            opacity: 1,
                            borderColor: 'rgba(0,200,255,0.8)',
                            boxShadow: '0 0 15px rgba(0,200,255,0.4)',
                            transition: { duration: 0.2 }
                          }}
                          className="font-orbitron text-[10px] tracking-widest text-[var(--electric-blue)] cursor-pointer px-3 py-1.5 rounded border flex items-center gap-2 bg-[rgba(0,200,255,0.05)]"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          [ RESUME ]
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Terminal Body (Typing Animation) */}
                  <div className="font-orbitron text-sm md:text-base leading-loose text-[var(--text-primary)] space-y-4 relative z-10 w-full text-left">
                    
                    {stage >= 1 && (
                      <div className="flex items-start">
                        <span className="text-[var(--neon-purple)] mr-3 flex-shrink-0 mt-1">&gt;</span>
                        <div className="break-words">
                          <span className="text-[var(--text-dim)] mr-2">NAME:</span>
                          <span className="text-white font-bold tracking-wider">
                            <TypewriterLine 
                              text="ANAND M S" 
                              onComplete={() => onLineComplete(2)} 
                              speed={50}
                              instant={isInstant}
                            />
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {stage >= 2 && (
                      <div className="flex items-start">
                        <span className="text-[var(--neon-purple)] mr-3 flex-shrink-0 mt-1">&gt;</span>
                        <div className="break-words">
                          <span className="text-[var(--text-dim)] mr-2">QUALIFICATION:</span>
                          <span className="text-white tracking-wider">
                            <TypewriterLine 
                              text="BTECH in CSE AI & ML" 
                              onComplete={() => onLineComplete(3)} 
                              speed={40}
                              instant={isInstant}
                            />
                          </span>
                        </div>
                      </div>
                    )}

                    {stage >= 3 && (
                      <div className="flex items-start mt-6">
                        <span className="text-[var(--neon-purple)] mr-3 flex-shrink-0 mt-1">&gt;</span>
                        <div className="break-words">
                          <span className="text-[var(--text-dim)] mr-2 block mb-1">BIO:</span>
                          <span className="font-inter text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                            <TypewriterLine 
                              text="Passionate software engineer exploring the intersection of modern web development and artificial intelligence. Driven by a desire to build intelligent, scalable, and immersive digital experiences." 
                              onComplete={() => onLineComplete(4)} 
                              speed={15}
                              instant={isInstant}
                            />
                          </span>
                        </div>
                      </div>
                    )}

                    {stage >= 4 && (
                      <div className="flex flex-col items-start mt-8 w-full">
                        <div className="flex items-center mb-4">
                          <span className="text-[var(--neon-purple)] mr-3">&gt;</span>
                          <span className="text-[var(--text-dim)] mr-2">TECH_STACKS:</span>
                          {stage === 4 && !isInstant && (
                            <TypewriterLine 
                              text="Loading modules..." 
                              onComplete={() => onLineComplete(5)} 
                              speed={30}
                            />
                          )}
                        </div>
                        
                        {stage >= 5 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pl-6">
                            {SKILL_CATEGORIES.map((category, index) => (
                              (isInstant || index <= activeCategoryIndex) && (
                                <div key={category.name} className="border border-[rgba(0,200,255,0.15)] bg-[rgba(0,200,255,0.02)] rounded p-4">
                                  <div className="text-[var(--electric-blue)] text-xs tracking-widest mb-3 border-b border-[rgba(0,200,255,0.1)] pb-2 opacity-70">
                                    {(isInstant || index < activeCategoryIndex) ? (
                                      `[${category.name}]`
                                    ) : (
                                      <TypewriterLine
                                        text={`[${category.name}]`}
                                        speed={15}
                                        onComplete={() => {
                                          // Note: The heading typing completes, but we start the items
                                          // It's handled by TypewriterBlock starting automatically.
                                        }}
                                      />
                                    )}
                                  </div>
                                  {(isInstant || index < activeCategoryIndex || (index === activeCategoryIndex /* wait for heading to somewhat type before starting items - could add a small delay but TypewriterBlock handles its own items */)) && (
                                    <TypewriterBlock 
                                      items={category.items} 
                                      onComplete={index === activeCategoryIndex ? handleCategoryComplete : undefined} 
                                      speed={20}
                                      instant={isInstant || index < activeCategoryIndex}
                                    />
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {stage >= 6 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: [0, 1, 0] }} 
                        transition={{ duration: 1, repeat: Infinity }}
                        className="mt-6 text-[var(--electric-blue)] font-black text-xl ml-6"
                      >
                        _
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Enter Time Machine Button - Appears after typing completes */}
                <div className="h-[100px] flex items-center justify-center w-full">
                  <AnimatePresence>
                    {stage >= 6 && (
                      <motion.div
                        initial={isInstant ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
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
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
