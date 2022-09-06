/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

function useWindowSize() {
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024 && windowWidth !== -13) {
        setWindowWidth(-13);
      } else if (window.innerWidth < 1024 && windowWidth !== -23) {
        setWindowWidth(-23);
      }
    }

    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowWidth;
}

export default useWindowSize;
