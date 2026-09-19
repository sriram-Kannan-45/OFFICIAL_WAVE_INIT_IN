import { Suspense, lazy } from 'react';

const ScrollScene = lazy(() => import('./ScrollScene'));
export { default as ScrollScene } from './ScrollScene';
const FallbackScene = lazy(() => import('./FallbackScene'));
export { default as FallbackScene } from './FallbackScene';
const SceneCamera = lazy(() => import('./SceneCamera'));
export { default as SceneCamera } from './SceneCamera';
const WaveCore = lazy(() => import('./WaveCore'));
export { default as WaveCore } from './WaveCore';
const ParticleField = lazy(() => import('./ParticleField'));
export { default as ParticleField } from './ParticleField';
const WaveCurves = lazy(() => import('./WaveCurves'));
export { default as WaveCurves } from './WaveCurves';
const NetworkNodes = lazy(() => import('./NetworkNodes'));
export { default as NetworkNodes } from './NetworkNodes';
const PerformanceDetect = lazy(() => import('./PerformanceDetect'));
export { default as PerformanceDetect, usePerformanceDetect, detectWebGL } from './PerformanceDetect';
