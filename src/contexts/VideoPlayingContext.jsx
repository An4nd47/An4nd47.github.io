import { createContext, useContext, useState } from 'react';

const VideoPlayingContext = createContext({ playing: false, setPlaying: () => {} });

export function VideoPlayingProvider({ children }) {
  const [playing, setPlaying] = useState(false);
  return (
    <VideoPlayingContext.Provider value={{ playing, setPlaying }}>
      {children}
    </VideoPlayingContext.Provider>
  );
}

export function useVideoPlaying() {
  return useContext(VideoPlayingContext);
}
