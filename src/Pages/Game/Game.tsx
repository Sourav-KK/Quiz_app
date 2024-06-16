import { useEffect, useState } from "react";

const Game = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement != null
  );
  
  useEffect(() => {
    const checkFullScreen = () => {
      if (!document.fullscreenElement) {
        alert(
          "You are not in full screen mode. Press OK to enter full screen."
        );
        handleFullScreen();
      }
    };

    const handleFullScreen = () => {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(e);
      });
    };

    checkFullScreen();
  }, []);

  if (!isFullScreen) {
    alert("Please enable fullscreen mode");
  }

  return <div>Welcom to game</div>;
};

export default Game;
