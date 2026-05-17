'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const FRAME_COUNT = 94;

// Even frames → 0.063s, odd frames → 0.062s (matches actual filenames)
function getFramePath(i: number): string {
  const padded = String(i).padStart(2, '0');
  const delay = i % 2 === 0 ? '0.063s' : '0.062s';
  return `/images/sequence/frame_${padded}_delay-${delay}.png`;
}

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollYProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: FRAME_COUNT }, () => null)
  );
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const loadedCountRef = useRef(0);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Core draw — pure ref reads, zero React state writes
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[frameIndexRef.current];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for memory
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pw = Math.round(vw * dpr);
    const ph = Math.round(vh * dpr);

    // Only resize canvas backing store when dimensions actually changed
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    }

    // object-fit: cover — preserve aspect ratio, crop to fill
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const canvasAspect = pw / ph;
    const imgAspect = imgW / imgH;

    let sx = 0, sy = 0, sw = imgW, sh = imgH;
    if (imgAspect > canvasAspect) {
      // Image wider than canvas — crop sides
      sw = Math.round(imgH * canvasAspect);
      sx = Math.round((imgW - sw) / 2);
    } else {
      // Image taller than canvas — crop top/bottom
      sh = Math.round(imgW / canvasAspect);
      sy = Math.round((imgH - sh) / 2);
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph);
  }, []);

  // Preload all frames
  useEffect(() => {
    const imgs = imagesRef.current;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i;

      img.onload = () => {
        imgs[idx] = img;
        loadedCountRef.current += 1;
        const count = loadedCountRef.current;
        const pct = Math.round((count / FRAME_COUNT) * 100);

        // Throttle React state updates — update every 8 frames or when done
        if (count % 8 === 0 || count === FRAME_COUNT) {
          setProgress(pct);
          if (count === FRAME_COUNT) setLoaded(true);
        }

        // Show first frame immediately — don't wait for full preload
        if (idx === 0) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(draw);
        }
      };

      img.onerror = () => {
        // Frame missing — count it as loaded so we don't hang the loader
        loadedCountRef.current += 1;
        const count = loadedCountRef.current;
        if (count === FRAME_COUNT) {
          setLoaded(true);
          setProgress(100);
        }
      };

      img.src = getFramePath(i);
    }

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  // Map scroll progress → frame index, schedule draw via RAF
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      Math.round(latest * (FRAME_COUNT - 1)),
      FRAME_COUNT - 1
    );
    if (index !== frameIndexRef.current) {
      frameIndexRef.current = index;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    }
  });

  return (
    <>
      {/* Premium loading screen */}
      <div
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0e0e]"
        style={{
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? 'none' : 'auto',
          transition: 'opacity 1s ease',
        }}
      >
        <div className="mb-8 text-[10px] tracking-[0.45em] uppercase text-orange-400/50 font-light">
          Loading Experience
        </div>

        {/* Progress bar */}
        <div className="relative w-52 h-px bg-white/[0.05]">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-700/50 via-orange-500 to-orange-300 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Glow dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-400 transition-all duration-500 ease-out"
            style={{
              left: `${progress}%`,
              boxShadow: '0 0 8px 2px rgba(249,115,22,0.7)',
            }}
          />
        </div>

        <div className="mt-5 text-[10px] text-white/[0.12] tracking-[0.25em]">
          {progress}%
        </div>
      </div>

      {/* Canvas — fades in once loaded */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      />
    </>
  );
}
