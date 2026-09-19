import { useState, useEffect } from 'react';

function getTier() {
  if (typeof window === 'undefined') return 'high';
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8;
  const isMobile = window.innerWidth < 768;
  const isLowEnd = cores <= 2 || memory <= 4;

  if (isMobile || isLowEnd) return 'low';
  if (cores <= 4 || memory <= 8) return 'medium';
  return 'high';
}

export function usePerformanceDetect() {
  const [tier, setTier] = useState(getTier);

  useEffect(() => {
    const handleResize = () => setTier(getTier());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isLowPower = tier === 'low' || prefersReducedMotion;

  return { tier, isLowPower, prefersReducedMotion };
}

export function detectWebGL() {
  if (typeof document === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default usePerformanceDetect;
