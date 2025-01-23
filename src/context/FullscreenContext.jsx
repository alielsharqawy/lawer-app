import React, { createContext, useState, useContext, useEffect } from "react";

// Create Fullscreen Context
const FullscreenContext = createContext();

// Fullscreen Provider
export const FullscreenProvider = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enableFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const disableFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      disableFullscreen();
    } else {
      enableFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        enableFullscreen,
        disableFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};

// Hook for consuming Fullscreen Context
export const useFullscreen = () => useContext(FullscreenContext);
