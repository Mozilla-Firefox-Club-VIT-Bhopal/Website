import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { events } from '../data.ts';
import { env, useFrame, type Point } from '../motion.ts';

export default function Events() {
  const [active, setActive] = useState(-1);
  const card = useRef<HTMLDivElement>(null);
  const pos = useRef<Point | null>(null);
  const ev = events[Math.max(0, active)];

  useFrame((_, m) => {
    const p = pos.current || (pos.current = { ...m });
    const dx = m.x - p.x; p.x += dx * 0.12; p.y += (m.y - p.y) * 0.12;
    const on = active >= 0;
    const el = card.current; if (!el) return;
    el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
    el.style.transform = on ? `scale(1) rotate(${Math.max(-14, Math.min(14, dx * 0.08))}deg)` : 'scale(.6)';
  }, [active]);

  return (
    <section id="events" className="px-[4vw] pb-[14vh] pt-[10vh]">
      <div className="mb-[4vh] flex items-baseline justify-between font-mono text-xs tracking-[.08em] text-muted">
        <span>(02) — EVENTS / FALL 2026</span><span className="hidden md:inline">HOVER TO PREVIEW</span>
      </div>
      <div className="border-t border-line" onPointerLeave={() => setActive(-1)}>
        {events.map((e, i) => (
          <a key={e.n} href="#contact" onPointerEnter={() => !env.touch && setActive(i)}
            className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-6 border-b border-line py-[3.2vh] md:grid-cols-[70px_minmax(0,1fr)_200px_120px]">
            <span className="font-mono text-xs text-muted">{e.n}</span>
            <span className="text-[clamp(26px,3.6vw,58px)] font-bold leading-none tracking-[-.035em] [font-stretch:112%]"
              style={{
                transform: active === i ? 'translateX(2vw)' : 'none',
                color: active === -1 ? undefined : active === i ? 'var(--color-lilac)' : '#5d5a70',
                transition: 'transform .6s var(--ease-out-soft), color .3s',
              }}>{e.title}</span>
            <span className="hidden font-mono text-xs tracking-[.08em] text-muted md:block">{e.kind}</span>
            <span className="text-right font-mono text-sm font-medium">{e.date}</span>
          </a>
        ))}
      </div>

      {/* Portal to <body>: the smooth-scroll wrapper is transformed, which would trap position:fixed inside it. */}
      {!env.touch && createPortal(
        <div ref={card} className="pointer-events-none fixed left-0 top-0 z-40 -ml-[150px] -mt-[190px] h-[380px] w-[300px] overflow-hidden rounded-md"
          style={{ opacity: active >= 0 ? 1 : 0, transition: 'opacity .35s, transform .5s var(--ease-out-soft)' }}>
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 30% 20%,oklch(0.62 0.2 ${ev.hue}),oklch(0.28 0.12 ${ev.hue - 20}))` }} />
          <img src="/nightly-logo.svg" alt="" className="absolute -bottom-[60px] -right-[60px] w-[260px] opacity-35 mix-blend-screen" />
          <div className="absolute left-5 top-4 text-8xl font-extrabold leading-none tracking-[-.05em] text-white [font-stretch:120%]">{ev.d}</div>
          <div className="absolute bottom-[18px] left-[22px] font-mono text-xs font-medium tracking-[.1em] text-white">{ev.kind}</div>
        </div>,
        document.body,
      )}
    </section>
  );
}
