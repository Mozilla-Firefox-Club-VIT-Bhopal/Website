import { useRef } from 'react';
import { manifesto } from '../data.ts';
import { useFrame } from '../motion.ts';

const words = manifesto.split(/\s+/);

export default function About() {
  const p = useRef<HTMLParagraphElement>(null);
  const refs = useRef<HTMLSpanElement[]>([]);
  useFrame(() => {
    if (!p.current) return;
    const r = p.current.getBoundingClientRect(), vh = innerHeight;
    const prog = (vh * 0.8 - r.top) / (r.height + vh * 0.2);
    refs.current.forEach((w, i) => { w.style.opacity = i / words.length < prog ? '1' : '0.14'; });
  });
  return (
    <section id="about" className="px-[4vw] pb-[18vh] pt-[22vh]">
      <div className="mb-[5vh] font-mono text-xs tracking-[.08em] text-muted">(01) — MANIFESTO</div>
      <p ref={p} className="m-0 max-w-[1400px] text-[clamp(30px,4.6vw,76px)] font-medium leading-[1.08] tracking-[-.03em]">
        {words.map((w, i) => (
          <span key={i}><span ref={(el) => { if (el) refs.current[i] = el; }} className="opacity-[.14] transition-opacity duration-[400ms]">{w}</span>{' '}</span>
        ))}
      </p>
    </section>
  );
}
