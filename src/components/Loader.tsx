import { useEffect, useRef, useState } from 'react';
import { introFrames } from '../data.ts';

const EZ = 'cubic-bezier(.77,0,.18,1)';
const box = (w: number, h: number, r: number): string => {
  const cx = innerWidth / 2, cy = innerHeight / 2;
  return `inset(${cy - h / 2}px ${innerWidth - cx - w / 2}px ${innerHeight - cy - h / 2}px ${cx - w / 2}px round ${r}px)`;
};

interface LoaderProps { onReveal: () => void }

export default function Loader({ onReveal }: LoaderProps) {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null), win = useRef<HTMLDivElement>(null), finalRef = useRef<HTMLDivElement>(null), logo = useRef<HTMLImageElement>(null);
  const count = useRef<HTMLDivElement | null>(null), head = useRef<HTMLDivElement>(null), word = useRef<HTMLDivElement | null>(null);
  const chrome = useRef<(HTMLDivElement | null)[]>([]), name = useRef<(HTMLDivElement | null)[]>([]);
  const frames = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timers: number[] = [];
    const later = (fn: () => void, t: number) => { timers.push(window.setTimeout(fn, t)); };
    let raf = 0;
    const w = win.current!;
    w.style.transition = 'none'; w.style.clipPath = box(0, 0, 0);
    raf = requestAnimationFrame(() => requestAnimationFrame(() => {
      const fw = Math.min(innerWidth * 0.2, innerHeight * 0.26);
      w.style.transition = `clip-path 1s ${EZ}`; w.style.clipPath = box(fw, fw * 1.3, 2);
    }));

    const enter = () => {
      const D = Math.min(innerHeight * 0.3, innerWidth * 0.28) * 1.18, R = Math.hypot(innerWidth, innerHeight);
      w.style.clipPath = box(D, D, D / 2);
      logo.current!.style.opacity = '1'; logo.current!.style.transform = 'translate(-50%,-50%) scale(1)';
      later(() => { chrome.current.forEach((e) => { if (e) e.style.opacity = '0'; }); w.style.transition = `clip-path 1.4s ${EZ}`; w.style.clipPath = box(R * 2, R * 2, R); }, 1300);
      later(() => name.current.forEach((e) => { if (e) e.style.transform = 'none'; }), 2100);
      later(() => { onReveal(); root.current!.style.opacity = '0'; }, 4100);
      later(() => setGone(true), 5000);
    };

    const t0 = performance.now(), dur = 3200, n = frames.current.length;
    let lastF = -1;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      count.current!.textContent = String(Math.round(e * 100)).padStart(2, '0') + '%';
      head.current!.style.left = e * 100 + '%';
      const fi = Math.floor(e * n * 2.4) % n;
      if (fi !== lastF && p < 1) {
        frames.current.forEach((f, i) => { f.style.opacity = i === fi ? '1' : '0'; }); lastF = fi;
        word.current!.textContent = `FRAME ${String(fi + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
      }
      if (p < 1) { raf = requestAnimationFrame(tick); return; }
      frames.current.forEach((f) => { f.style.opacity = '0'; });
      finalRef.current!.style.opacity = '1'; word.current!.textContent = 'READY';
      later(enter, 200);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (gone) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden bg-ink text-paper transition-opacity duration-[800ms]">
      <div ref={win} className="absolute inset-0">
        {introFrames.map((f, i) => (
          <div key={f.word} ref={(el) => { if (el) frames.current[i] = el; }} className="absolute inset-0 flex items-center justify-center opacity-0" style={{ background: f.bg }}>
            <span className="font-serif text-[clamp(40px,5vw,84px)] italic leading-none tracking-[-.01em] text-[rgba(236,240,255,.95)]">{f.word}</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(-50%+4.6vh)] font-mono text-[10px] tracking-[.14em] text-[rgba(200,212,240,.6)]">{f.cap}</span>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent_40%,rgba(3,4,10,.75))]" />
          </div>
        ))}
        <div ref={finalRef} className="absolute inset-0 opacity-0 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_50%_50%,#121a33,#05060d_70%)]">
          <img ref={logo} src="/nightly-logo.webp" alt="" className="absolute left-1/2 top-1/2 w-[min(30vh,28vw)] opacity-0 drop-shadow-[0_0_60px_rgba(90,140,255,.35)]" style={{ transform: 'translate(-50%,-50%) scale(.82)', transition: 'transform 1.4s cubic-bezier(.22,1,.36,1), opacity .8s' }} />
          <div className="absolute inset-x-0 top-[calc(50%+min(15vh,14vw)+5vh)] flex flex-col items-center gap-3.5">
            <div className="overflow-hidden pb-[.1em]">
              <div ref={(el) => { name.current[0] = el; }} className="whitespace-nowrap font-serif text-[clamp(34px,4.2vw,72px)] leading-none tracking-[-.015em] text-[#ecf0ff]" style={{ transform: 'translateY(110%)', transition: `transform 1.1s ${EZ}` }}>
                Mozilla Firefox <i>Club</i>
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={(el) => { name.current[1] = el; }} className="font-mono text-[11px] tracking-[.2em] text-[#8a93b0]" style={{ transform: 'translateY(110%)', transition: `transform 1.1s .1s ${EZ}` }}>VIT BHOPAL</div>
            </div>
          </div>
        </div>
      </div>
      <div ref={(el) => { count.current = el; chrome.current[0] = el; }} className="absolute bottom-[5vh] left-[4vw] text-[clamp(40px,5vw,84px)] font-extrabold leading-none tracking-[-.04em] tabular-nums transition-opacity duration-500 [font-stretch:115%]">00%</div>
      <div ref={(el) => { chrome.current[1] = el; }} className="absolute inset-x-[4vw] bottom-[3vh] h-2 transition-opacity duration-500 bg-[repeating-linear-gradient(90deg,#3a3850_0_1px,transparent_1px_12px)]">
        <div ref={head} className="absolute -top-1.5 left-0 h-5 w-0.5 bg-violet" />
      </div>
      <div ref={(el) => { word.current = el; chrome.current[2] = el; }} className="absolute bottom-[5vh] right-[4vw] font-mono text-xs tracking-[.08em] text-muted transition-opacity duration-500">LOADING</div>
    </div>
  );
}
