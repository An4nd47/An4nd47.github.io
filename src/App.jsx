import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import FloatingContactMenu from './components/FloatingContactMenu';
import { VideoPlayingProvider } from './contexts/VideoPlayingContext';
import Hero from './pages/Hero';
import TimeMachine from './pages/TimeMachine';
import Past from './pages/Past';
import Future from './pages/Future';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/time-machine" element={<TimeMachine />} />
        <Route path="/past" element={<Past />} />
        <Route path="/future" element={<Future />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(!sessionStorage.getItem('loaded'));

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('loaded', 'true');
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <VideoPlayingProvider>
        <CustomCursor />
        <FloatingContactMenu />
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <AnimatedRoutes />
      </VideoPlayingProvider>
    </BrowserRouter>
  );
}
