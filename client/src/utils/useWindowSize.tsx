import { useState, useEffect } from "react";

export default function useWindowSize() {
  interface WindowProps {
    width: number | undefined;
    height: number | undefined;
  }
  const [windowSize, setWindowSize] = useState<WindowProps>({
    width: undefined,
    height: undefined,
  });
  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
