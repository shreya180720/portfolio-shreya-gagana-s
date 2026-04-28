'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface PointerParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface NotifState {
  visible: boolean;
  message: string;
  sub?: string;
}

interface EventParticle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
}

const POINTER_FX = ['⭐', '✨', '💫', '🌟', '⚡'];
const INACTIVITY_DELAY = 44000;

const EVENT_KEYS: Record<string, { message: string; sub: string; particles: string[] }> = {
  '0422': {
    message: 'April 22, 2023 🌸',
    sub: 'The day our story began 💕',
    particles: ['💕', '🌸', '✨', '💖', '🌷', '🥰'],
  },
  '0527': {
    message: 'May 27, 2023 ',
    sub: 'The day everything i could never forget',
    particles: ['💍', '🌹', '💎', '✨', '🥂', '💝'],
  },
};

export default function UserInteractions() {
  const [notif, setNotif] = useState<NotifState>({ visible: false, message: '' });
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [birlaOpen, setBirlaOpen] = useState(false);
  const [pointerTrail, setPointerTrail] = useState<PointerParticle[]>([]);
  const [motionActive, setMotionActive] = useState(false);
  const [eventParticles, setEventParticles] = useState<EventParticle[]>([]);

  const keyBuffer = useRef('');
  const nameBuffer = useRef('');
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shiftHeld = useRef(false);
  const trailCounter = useRef(0);
  const particleCounter = useRef(0);
  const motionLock = useRef(false);

  const showNotif = useCallback((message: string, sub?: string) => {
    setNotif({ visible: true, message, sub });
    setTimeout(() => setNotif({ visible: false, message: '' }), 4000);
  }, []);

  const fireParticles = useCallback((particles: string[]) => {
    const items: EventParticle[] = Array.from({ length: 28 }, (_, i) => ({
      id: particleCounter.current++,
      emoji: particles[Math.floor(Math.random() * particles.length)],
      x: Math.random() * 100,
      delay: Math.random() * 1.2,
    }));
    setEventParticles((prev) => [...prev, ...items]);
    const ids = items.map((p) => p.id);
    setTimeout(() => setEventParticles((prev) => prev.filter((p) => !ids.includes(p.id))), 4500);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyG') {
        e.preventDefault();
        setOverlayOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') { shiftHeld.current = true; return; }
      if (/^[0-9]$/.test(e.key)) {
        keyBuffer.current = (keyBuffer.current + e.key).slice(-4);
        const match = EVENT_KEYS[keyBuffer.current];
        if (match) {
          showNotif(match.message, match.sub);
          fireParticles(match.particles);
          keyBuffer.current = '';
        }
      }
      if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) {
        nameBuffer.current = (nameBuffer.current + e.key).slice(-5);
        if (nameBuffer.current === 'GaaGa') {
          setOverlayOpen(true);
          nameBuffer.current = '';
        }
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') shiftHeld.current = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [showNotif, fireParticles]);


  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (motionLock.current) return;
      motionLock.current = true;
      setMotionActive(true);
      setTimeout(() => {
        setMotionActive(false);
        motionLock.current = false;
      }, 5000);
    }, INACTIVITY_DELAY);
  }, []);

  useEffect(() => {
    resetInactivity();
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, resetInactivity, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetInactivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivity]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!shiftHeld.current) return;
      const id = trailCounter.current++;
      const emoji = POINTER_FX[Math.floor(Math.random() * POINTER_FX.length)];
      setPointerTrail((prev) => [...prev.slice(-40), { id, x: e.clientX, y: e.clientY, emoji }]);
      setTimeout(() => setPointerTrail((prev) => prev.filter((p) => p.id !== id)), 900);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    const handler = () => setBirlaOpen(true);
    window.addEventListener('birla-tap', handler);
    return () => window.removeEventListener('birla-tap', handler);
  }, []);


  return (
    <>
      {pointerTrail.map((p) => (
        <span
          key={p.id}
          className="fixed pointer-events-none z-[9990] text-base ui-trail"
          style={{ left: p.x - 8, top: p.y - 8 }}
        >
          {p.emoji}
        </span>
      ))}

      {eventParticles.map((p) => (
        <span
          key={p.id}
          className="fixed pointer-events-none z-[9989] text-2xl ui-shower"
          style={{ left: `${p.x}vw`, top: '-2.5rem', animationDelay: `${p.delay}s` }}
        >
          {p.emoji}
        </span>
      ))}

      {notif.visible && (
        <div className="fixed bottom-8 left-1/2 z-[9995] ui-toast">
          <div className="bg-white dark:bg-[#1c1108] border border-slate-200 dark:border-orange-900/50 rounded-2xl px-7 py-4 shadow-2xl text-center min-w-[220px]">
            <p className="font-poppins font-bold text-slate-900 dark:text-[#fef3e2] text-base leading-snug">
              {notif.message}
            </p>
            {notif.sub && (
              <p className="font-inter text-sm text-slate-500 dark:text-orange-400 mt-1">
                {notif.sub}
              </p>
            )}
          </div>
        </div>
      )}

      {overlayOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOverlayOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1c1108] rounded-2xl p-10 max-w-sm mx-6 text-center shadow-2xl border border-slate-200 dark:border-orange-900/30 ui-overlay-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-5">💌</div>
            <h2 className="font-poppins font-bold text-2xl text-slate-900 dark:text-[#fef3e2] mb-3">
              You found the secret
            </h2>
            <p className="font-inter text-slate-500 dark:text-[#c49a6c] text-sm leading-relaxed">
              Built with love for Shreya, who makes every line of code worth writing
            </p>
            <div className="my-5 flex justify-center gap-6 font-poppins text-xs font-semibold text-blue-500 dark:text-orange-400 tracking-wide uppercase">
              <span>Apr 22, 2023</span>
              <span className="text-slate-300 dark:text-orange-900">·</span>
              <span>May 27, 2023</span>
              <span className="text-slate-300 dark:text-orange-900">·</span>
              <span>Always and Forever!</span>
            </div>
            <button
              onClick={() => setOverlayOpen(false)}
              className="mt-1 px-6 py-2 rounded-lg text-sm font-inter font-medium text-white bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {birlaOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setBirlaOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#1c1108] rounded-2xl p-10 max-w-sm mx-6 text-center shadow-2xl border border-slate-200 dark:border-orange-900/30 ui-overlay-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-5">🏢</div>
            <h2 className="font-poppins font-bold text-xl text-slate-900 dark:text-[#fef3e2] mb-4 leading-snug">
              The place that changed everything
            </h2>
            <p className="font-inter text-slate-500 dark:text-[#c49a6c] text-sm leading-relaxed">
              Some places give you a career.<br />
              Aditya Birla gave me something far greater!<br /><br />
              <span className="italic">
                it gave me the person who rewrote every chapter I thought I already knew.
              </span><br /><br />
              Between the projects and the deadlines,
              somewhere in those Chennai corridors full of numbers and noise 
              life quietly handed me the one I'd cross seven oceans for 
              leaving behind family, friends, every familiar shore 
              and still never once look back.<br /><br />
              <span className="italic text-slate-400 dark:text-slate-500">
                only to find the shore had forgotten my name.
              </span>
            </p>
            <p className="font-poppins text-xs font-semibold text-blue-500 dark:text-orange-400 tracking-wide uppercase mt-6 mb-4">
              chennai · 2023 → USA · 2024-present
            </p>
            <button
              onClick={() => setBirlaOpen(false)}
              className="px-6 py-2 rounded-lg text-sm font-inter font-medium text-white bg-blue-600 dark:bg-orange-500 hover:bg-blue-500 dark:hover:bg-orange-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {motionActive && (
        <div className="fixed bottom-0 left-0 right-0 z-[9994] pointer-events-none overflow-hidden h-24">
          <div className="ui-motion-walk absolute bottom-3">
            <svg
              width="80"
              height="80"
              viewBox="0 0 88 88"
              fill="none"
              shapeRendering="crispEdges"
              className="drop-shadow-[0_0_14px_rgba(249,115,22,0.8)] ui-motion-bounce"
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
        </div>
      )}

      <style jsx global>{`
        @keyframes ui-trail-fade {
          0%   { opacity: 1; transform: scale(1.3) translateY(0);    }
          100% { opacity: 0; transform: scale(0.4) translateY(-18px); }
        }
        .ui-trail { animation: ui-trail-fade 0.9s ease-out forwards; }

        @keyframes ui-shower-fall {
          0%   { opacity: 1;   transform: translateY(0)     rotate(0deg);   }
          100% { opacity: 0.2; transform: translateY(105vh) rotate(420deg); }
        }
        .ui-shower { animation: ui-shower-fall 3.5s ease-in forwards; }

        @keyframes ui-toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(14px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
        }
        .ui-toast {
          transform: translateX(-50%);
          animation: ui-toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes ui-overlay-in {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .ui-overlay-card { animation: ui-overlay-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes ui-motion-walk {
          from { left: -100px; }
          to   { left: 110vw;  }
        }
        .ui-motion-walk { animation: ui-motion-walk 5s linear forwards; }

        @keyframes ui-motion-bounce {
          0%, 100% { transform: translateY(0);    }
          50%      { transform: translateY(-8px); }
        }
        .ui-motion-bounce { animation: ui-motion-bounce 0.28s infinite linear; }
      `}</style>
    </>
  );
}
