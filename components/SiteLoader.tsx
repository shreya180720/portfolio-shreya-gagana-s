'use client';

import { useEffect, useRef, useState } from 'react';

export default function SiteLoader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [explode, setExplode] = useState(false);
  const [started, setStarted] = useState(false);

  const runAudioRef = useRef<HTMLAudioElement | null>(null);
  const impactAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    runAudioRef.current = new Audio('/sounds/game_sound.wav');
    runAudioRef.current.volume = 0.3;

    impactAudioRef.current = new Audio('/sounds/impact_burst.wav');
    impactAudioRef.current.volume = 0.6;
  }, []);

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 28);

    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    if (!started || explode || progress >= 92) return;

    const soundInterval = setInterval(() => {
      if (runAudioRef.current) {
        runAudioRef.current.currentTime = 0;
        runAudioRef.current.play().catch(() => {});
      }
    }, 250);

    return () => clearInterval(soundInterval);
  }, [started, explode, progress]);

  useEffect(() => {
    if (progress >= 92 && !explode && started) {
      setExplode(true);

      if (impactAudioRef.current) {
        impactAudioRef.current.play().catch(() => {});
      }

      setProgress(100);
      setTimeout(() => setDone(true), 950);
    }
  }, [progress, explode, started]);

  if (done) {
    return <div className="animate-app-fade">{children}</div>;
  }

  return (
    <div
      onClick={() => !started && setStarted(true)}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#070300] text-orange-400 cursor-pointer ${
        explode ? 'loader-flash' : ''
      }`}
    >
      {!started ? (
        <div className="animate-pulse font-mono text-xl tracking-[0.2em] uppercase">
          [Click to Boot Up]
        </div>
      ) : (
        <div className="relative w-[92vw] max-w-[980px] h-[420px] overflow-hidden">
          <div className="loader-stars opacity-40" />

          <div className="absolute bottom-[155px] left-0 w-full h-28 opacity-70">
            <svg viewBox="0 0 1000 120" className="w-full h-full" fill="none" shapeRendering="crispEdges">
              <path
                d="M20 105 L70 105 L90 72 L120 105 L180 105 L220 45 L270 105 L335 105 L360 90 L390 105 L620 105 L640 95 L690 105 L770 105 L805 72 L845 105 L925 105 L955 85 L985 105"
                stroke="#9a3412"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="absolute bottom-[150px] right-[245px] text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            <svg width="48" height="70" viewBox="0 0 48 70" fill="none" shapeRendering="crispEdges">
              <rect x="20" y="12" width="8" height="50" fill="#f97316" />
              <rect x="12" y="32" width="8" height="8" fill="#f97316" />
              <rect x="8" y="24" width="8" height="16" fill="#f97316" />
              <rect x="28" y="38" width="8" height="8" fill="#f97316" />
              <rect x="32" y="30" width="8" height="16" fill="#f97316" />
            </svg>
          </div>

          <div className="absolute bottom-[152px] right-[88px] h-[100px] w-[14px] bg-orange-400 shadow-[0_0_28px_rgba(249,115,22,0.95)]" />

          <div className="absolute bottom-[150px] left-0 right-0 h-[3px] bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.75)]" />

          <div
            className={`absolute ${explode ? 'animate-dino-impact' : 'animate-dino-run'}`}
            style={{
              bottom: '140px',
              left: `calc(${Math.min(progress, 92)}% - 72px)`,
              transition: explode ? 'none' : 'left 80ms linear',
            }}
          >
            <svg
              width="92"
              height="92"
              viewBox="0 0 88 88"
              fill="none"
              shapeRendering="crispEdges"
              className={`drop-shadow-[0_0_18px_rgba(249,115,22,0.75)] ${explode ? 'pixelate' : ''}`}
            >
              <rect x="40" y="8" width="28" height="8" fill="#f97316" />
              <rect x="40" y="16" width="36" height="8" fill="#f97316" />
              <rect x="40" y="24" width="28" height="8" fill="#f97316" />
              <rect x="40" y="32" width="20" height="8" fill="#f97316" />
              <rect x="64" y="16" width="4" height="4" fill="#070300" />
              <rect x="32" y="32" width="16" height="8" fill="#f97316" />
              <rect x="24" y="40" width="32" height="8" fill="#f97316" />
              <rect x="16" y="48" width="40" height="8" fill="#f97316" />
              <rect x="8" y="56" width="48" height="8" fill="#f97316" />
              <rect x="0" y="48" width="16" height="8" fill="#f97316" />
              <rect x="0" y="40" width="8" height="8" fill="#f97316" />
              <rect x="56" y="40" width="8" height="8" fill="#fb923c" />
              <rect x="64" y="40" width="8" height="4" fill="#fb923c" />
              <rect x="24" y="64" width="8" height="12" fill="#f97316" />
              <rect x="32" y="76" width="12" height="4" fill="#f97316" />
              <rect x="48" y="64" width="8" height="12" fill="#f97316" />
              <rect x="56" y="76" width="12" height="4" fill="#f97316" />
            </svg>
          </div>

          {explode && (
            <div className="absolute bottom-[180px] right-[80px] pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="pixel-piece"
                  style={{
                    '--x': `${(Math.random() - 0.5) * 400}px`,
                    '--y': `${(Math.random() - 0.7) * 400}px`,
                    '--rot': `${Math.random() * 360}deg`,
                  } as any}
                />
              ))}
            </div>
          )}

          <div className="absolute bottom-[35px] left-1/2 -translate-x-1/2 font-mono text-5xl font-bold tracking-widest text-orange-400 drop-shadow-[0_0_16px_rgba(249,115,22,0.75)]">
            {progress}%
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dino-run {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-dino-run {
          animation: dino-run 0.25s infinite linear;
        }

        @keyframes dino-impact {
          0% { transform: translateY(0) scale(1) rotate(0); filter: blur(0); opacity: 1; }
          20% { transform: translateY(-25px) scale(1.05) rotate(-15deg); }
          40% { transform: translateY(0) scale(0.98); }
          100% { transform: translateY(100px) rotate(-90deg) scale(1.3); opacity: 0; filter: blur(6px); }
        }
        .animate-dino-impact {
          animation: dino-impact 0.9s cubic-bezier(0.15, 0.85, 0.35, 1) forwards;
        }

        @keyframes scatter {
          to { transform: translate(var(--x), var(--y)) rotate(var(--rot)); opacity: 0; }
        }
        .pixel-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #f97316;
          animation: scatter 1s cubic-bezier(0.1, 1, 0.2, 1) forwards;
        }

        .pixelate { image-rendering: pixelated; }

        @keyframes flash {
          0% { background-color: rgba(249, 115, 22, 0); }
          40% { background-color: rgba(249, 115, 22, 0.3); }
          100% { background-color: transparent; }
        }
        .loader-flash { animation: flash 0.4s ease forwards; }

        @keyframes app-fade {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-app-fade { animation: app-fade 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
