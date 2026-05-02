'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { SpotifyCard, defaultSongs } from '@/components/ui/spotify-card';

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
  const [gaagaStep, setGaagaStep] = useState<null | 'secret' | 'music'>(null);
  const [gaagaSongIndex, setGaagaSongIndex] = useState(0);
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
        setGaagaStep('secret');
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
          setGaagaStep('secret');
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

      {gaagaStep === 'secret' && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="relative bg-white dark:bg-[#1c1108] rounded-2xl p-10 max-w-sm mx-6 text-center shadow-2xl border border-slate-200 dark:border-orange-900/30 ui-overlay-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setGaagaStep(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <X size={16} />
            </button>

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
              onClick={() => setGaagaStep('music')}
              className="mt-2 w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-400 active:scale-95 flex items-center justify-center mx-auto transition-all duration-300 animate-bounce shadow-lg shadow-purple-500/30"
              aria-label="See what's inside"
            >
              <ChevronDown size={20} className="text-white" />
            </button>
            <p className="text-xs text-purple-400 dark:text-purple-300 mt-2 font-inter">
              see what&apos;s inside
            </p>
          </div>
        </div>
      )}

      {gaagaStep === 'music' && (
        <div className="fixed inset-0 z-[10000] overflow-y-auto" style={{ background: 'rgba(6,3,14,0.97)', backdropFilter: 'blur(24px)' }}>

          <button
            onClick={() => setGaagaStep(null)}
            className="fixed top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 70%)' }} />
            <div className="absolute top-[38%] left-[30%] w-[380px] h-[380px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(219,39,119,0.07) 0%, transparent 65%)' }} />
            <div className="absolute top-[55%] left-[58%] w-[280px] h-[280px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 65%)' }} />
          </div>

          <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
            {([
              { left: '11%',  top: '22%', w: 4, h: 4,  color: 'rgba(168,85,247,0.55)',  delay: 0,   dur: 8  },
              { left: '87%',  top: '18%', w: 3, h: 3,  color: 'rgba(236,72,153,0.45)',  delay: 2.2, dur: 11 },
              { left: '76%',  top: '74%', w: 5, h: 5,  color: 'rgba(139,92,246,0.5)',   delay: 1,   dur: 9  },
              { left: '19%',  top: '71%', w: 3, h: 3,  color: 'rgba(244,114,182,0.4)',  delay: 3.4, dur: 13 },
              { left: '51%',  top: '10%', w: 4, h: 4,  color: 'rgba(168,85,247,0.35)',  delay: 1.7, dur: 10 },
            ] as const).map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full gaaga-float"
                style={{
                  left: p.left, top: p.top,
                  width: p.w, height: p.h,
                  background: p.color,
                  filter: 'blur(1.5px)',
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.dur}s`,
                }}
              />
            ))}
          </div>

          <div className="min-h-full flex items-center justify-center px-6 py-16 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 w-full max-w-[1200px]">

              <div className="flex-shrink-0 lg:-translate-y-4 ui-overlay-card">
                <img
                  src={defaultSongs[gaagaSongIndex]?.poster ?? defaultSongs[0].poster}
                  alt="GaaGa Poster"
                  className={`w-[330px] sm:w-[380px] lg:w-[420px] h-auto rounded-3xl select-none block ${
                    gaagaSongIndex === 0
                      ? 'gaaga-poster-glow-pink gaaga-breathe-pink'
                      : 'gaaga-poster-glow gaaga-breathe'
                  }`}
                />
              </div>

              <div className={`flex-shrink-0 lg:translate-y-4 ui-overlay-card w-[330px] sm:w-[380px] lg:w-[420px] ${
                  gaagaSongIndex === 0
                    ? 'gaaga-breathe-alt-pink gaaga-card-wrap-pink'
                    : 'gaaga-breathe-alt gaaga-card-wrap'
                }`}>
                <SpotifyCard onSongChange={setGaagaSongIndex} />
              </div>

              <div
                key={`gaaga-lyric-${gaagaSongIndex}`}
                className={`hidden lg:flex flex-col justify-center lg:translate-y-4 w-[210px] flex-shrink-0 ${
                  gaagaSongIndex === 0 ? 'gaaga-lyric-pink' : 'gaaga-lyric-purple'
                }`}
              >
                {gaagaSongIndex === 1 ? (
                  <div className="border-l-2 border-purple-400/35 pl-5 space-y-2.5">
                    <p className="gaaga-line text-purple-200/85 text-sm font-light leading-snug"
                      style={{ animationDelay: '0.2s' }}>
                      Somewhere beyond
                    </p>
                    <p className="gaaga-line text-purple-200/85 text-sm font-light leading-snug"
                      style={{ animationDelay: '0.55s' }}>
                      the seven seas...
                    </p>
                    <div className="gaaga-line h-px bg-purple-400/25 my-1"
                      style={{ animationDelay: '0.9s' }} />
                    <p className="gaaga-line text-purple-300/80 text-sm font-light leading-snug"
                      style={{ animationDelay: '1.2s' }}>
                      With the desire
                    </p>
                    <p className="gaaga-line text-purple-300/80 text-sm font-light leading-snug"
                      style={{ animationDelay: '1.55s' }}>
                      to meet you,
                    </p>
                    <p className="gaaga-line text-purple-300 text-base font-semibold tracking-wide pt-1"
                      style={{ animationDelay: '1.95s' }}>
                      GaaGa 💜
                    </p>
                  </div>
                ) : (
                  <div className="border-l-2 border-[#EEB4B4]/35 pl-5 space-y-2.5">
                    <p className="gaaga-line text-[#EEB4B4]/80 text-sm font-light italic leading-snug"
                      style={{ animationDelay: '0.2s' }}>
                      Now I know I have met
                    </p>
                    <p className="gaaga-line text-[#EEB4B4]/80 text-sm font-light italic leading-snug"
                      style={{ animationDelay: '0.55s' }}>
                      an angel in person
                    </p>
                    <div className="gaaga-line h-px bg-[#EEB4B4]/22 my-1"
                      style={{ animationDelay: '0.9s' }} />
                    <p className="gaaga-line text-[#EEB4B4]/75 text-sm font-light italic leading-snug"
                      style={{ animationDelay: '1.2s' }}>
                      And she looks perfect
                    </p>
                    <p className="gaaga-line text-[#EEB4B4]/75 text-sm font-light italic leading-snug"
                      style={{ animationDelay: '1.55s' }}>
                      I don&apos;t deserve this
                    </p>
                    <p className="gaaga-line text-[#EEB4B4] text-base font-semibold italic tracking-wide pt-1"
                      style={{ animationDelay: '1.95s' }}>
                      You look perfect tonight
                    </p>
                  </div>
                )}
              </div>

            </div>
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

        @keyframes gaaga-glow-breathe {
          0%, 100% { box-shadow: 0 0 28px rgba(109,40,217,0.18), 0 24px 52px rgba(0,0,0,0.45); }
          50%      { box-shadow: 0 0 56px rgba(109,40,217,0.34), 0 0 22px rgba(219,39,119,0.12), 0 24px 58px rgba(0,0,0,0.5); }
        }

        .gaaga-breathe {
          animation: gaaga-glow-breathe 6s ease-in-out infinite;
        }
        .gaaga-breathe-alt {
          animation: gaaga-glow-breathe 7.5s ease-in-out infinite;
          animation-delay: -2.5s;
        }

        .gaaga-poster-glow {
          box-shadow: 0 0 28px rgba(109,40,217,0.18), 0 24px 52px rgba(0,0,0,0.45);
          transition: box-shadow 0.65s ease, transform 0.65s cubic-bezier(0.34,1.2,0.64,1);
        }
        .gaaga-poster-glow:hover {
          box-shadow: 0 0 64px rgba(109,40,217,0.38), 0 0 24px rgba(219,39,119,0.16), 0 24px 60px rgba(0,0,0,0.55);
          transform: scale(1.016);
          animation-play-state: paused;
        }

        .gaaga-card-wrap {
          border-radius: 0.75rem;
          box-shadow: 0 0 22px rgba(109,40,217,0.14), 0 20px 44px rgba(0,0,0,0.4);
          transition: box-shadow 0.65s ease;
        }
        .gaaga-card-wrap:hover {
          box-shadow: 0 0 52px rgba(109,40,217,0.3), 0 0 18px rgba(219,39,119,0.12), 0 20px 50px rgba(0,0,0,0.5);
        }

        @keyframes gaaga-glow-breathe-pink {
          0%, 100% { box-shadow: 0 0 28px rgba(238,180,180,0.30), 0 24px 52px rgba(0,0,0,0.45); }
          50%      { box-shadow: 0 0 56px rgba(238,180,180,0.52), 0 0 22px rgba(238,180,180,0.22), 0 24px 58px rgba(0,0,0,0.5); }
        }

        .gaaga-breathe-pink {
          animation: gaaga-glow-breathe-pink 6s ease-in-out infinite;
        }
        .gaaga-breathe-alt-pink {
          animation: gaaga-glow-breathe-pink 7.5s ease-in-out infinite;
          animation-delay: -2.5s;
        }

        .gaaga-poster-glow-pink {
          box-shadow: 0 0 28px rgba(238,180,180,0.30), 0 24px 52px rgba(0,0,0,0.45);
          transition: box-shadow 0.65s ease, transform 0.65s cubic-bezier(0.34,1.2,0.64,1);
        }
        .gaaga-poster-glow-pink:hover {
          box-shadow: 0 0 64px rgba(238,180,180,0.58), 0 0 24px rgba(238,180,180,0.30), 0 24px 60px rgba(0,0,0,0.55);
          transform: scale(1.016);
          animation-play-state: paused;
        }

        .gaaga-card-wrap-pink {
          border-radius: 0.75rem;
          box-shadow: 0 0 22px rgba(238,180,180,0.22), 0 20px 44px rgba(0,0,0,0.4);
          transition: box-shadow 0.65s ease;
        }
        .gaaga-card-wrap-pink:hover {
          box-shadow: 0 0 52px rgba(238,180,180,0.48), 0 0 18px rgba(238,180,180,0.24), 0 20px 50px rgba(0,0,0,0.5);
        }

        @keyframes gaaga-line-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .gaaga-line {
          opacity: 0;
          animation: gaaga-line-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes gaaga-lyric-breathe-purple {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(192,132,252,0.38)); }
          50%      { filter: drop-shadow(0 0 11px rgba(192,132,252,0.70)) drop-shadow(0 0 26px rgba(168,85,247,0.26)); }
        }
        @keyframes gaaga-lyric-breathe-pink {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(238,180,180,0.38)); }
          50%      { filter: drop-shadow(0 0 11px rgba(238,180,180,0.70)) drop-shadow(0 0 26px rgba(238,180,180,0.26)); }
        }
        .gaaga-lyric-purple { animation: gaaga-lyric-breathe-purple 4.5s ease-in-out infinite; }
        .gaaga-lyric-pink   { animation: gaaga-lyric-breathe-pink   4.5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .gaaga-lyric-purple, .gaaga-lyric-pink, .gaaga-line {
            animation: none !important;
            opacity: 1;
          }
        }

        @keyframes gaaga-float {
          0%, 100% { transform: translateY(0px)   translateX(0px);  opacity: 0.45; }
          40%      { transform: translateY(-18px)  translateX(6px);  opacity: 0.75; }
          70%      { transform: translateY(-9px)   translateX(-5px); opacity: 0.55; }
        }
        .gaaga-float { animation: gaaga-float 9s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .gaaga-breathe, .gaaga-breathe-alt,
          .gaaga-breathe-pink, .gaaga-breathe-alt-pink,
          .gaaga-float {
            animation: none !important;
          }
          .gaaga-poster-glow, .gaaga-poster-glow-pink { transition: none; }
        }
      `}</style>
    </>
  );
}
