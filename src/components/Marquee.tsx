import { useRef } from 'react';
import { marqueeWords } from '../data.ts';
import { useFrame } from '../motion.ts';

const doubled = [...marqueeWords, ...marqueeWords];

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const st = useRef({ x: 0, dir: 1, speed: 1 });
  useFrame((s) => {
    const m = st.current, t = track.current; if (!t) return;
    if (Math.abs(s.vel) > 0.5) m.dir = s.vel > 0 ? 1 : -1;
    m.speed += (0.6 + Math.min(6, Math.abs(s.vel) * 0.2) - m.speed) * 0.08;
    m.x -= m.speed * m.dir;
    const half = t.scrollWidth / 2;
    if (m.x < -half) m.x += half;
    if (m.x > 0) m.x -= half;
    t.style.transform = `translate3d(${m.x}px,0,0)`;
  });
  return (
    <section className="overflow-hidden border-y border-line py-[4.5vh]">
      <div ref={track} className="flex w-max will-change-transform">
        {doubled.map((w, i) => (
          <span key={i} className="flex items-center gap-[3vw] whitespace-nowrap pr-[3vw] font-serif text-[clamp(28px,3.4vw,56px)] italic leading-none text-soft">
            {w}<span className="h-[5px] w-[5px] rounded-full bg-violet" />
          </span>
        ))}
      </div>
    </section>
  );
}
