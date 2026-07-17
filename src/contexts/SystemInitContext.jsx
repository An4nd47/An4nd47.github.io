import { createContext, useContext, useState } from 'react';

const SystemInitContext = createContext({ initialized: false, setInitialized: () => {} });

export function SystemInitProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  return (
    <SystemInitContext.Provider value={{ initialized, setInitialized }}>
      {children}
    </SystemInitContext.Provider>
  );
}

export function useSystemInit() {
  return useContext(SystemInitContext);
}
