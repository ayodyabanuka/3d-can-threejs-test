'use client';

import { useState, useEffect } from 'react';
import BeerCanScene from './components/soda_can';
import ScrollWrapper from './components/scroll-wrapper';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // ✅ Correct way to track scroll position
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollWrapper>
      <main className='h-[200vh] bg-gray-900'>
        {/* Fixed 3D Scene */}
        <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center'>
          <BeerCanScene scrollY={scrollY} />
        </div>

        {/* Scrollable Content */}
        <div className='h-[100vh] flex justify-center items-center text-white text-4xl'>
          Scroll Down to Rotate 🍺
        </div>
      </main>
    </ScrollWrapper>
  );
}
