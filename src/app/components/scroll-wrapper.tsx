import ReactLenis from 'lenis/react';
import { ReactNode } from 'react';

const ScrollWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      {children}
    </ReactLenis>
  );
};

export default ScrollWrapper;
