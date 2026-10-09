import { useEffect, useRef } from 'react';
import { useFrame, type Point } from '../motion.ts';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const pos = useRef<Point | null>(null);
  useEffect(() => {
    document.body.classList.add('cc-cursor');
    const over = (e: PointerEvent) => {
      const s = (e.target as Element).closest('a,button,[data-hover]') ? 64 : 14;
      if (dot.current) Object.assign(dot.current.style, { width: s + 'px', height: s + 'px', margin: `${-s / 2}px 0 0 ${-s / 2}px` });
    };
    document.addEventListener('pointerover', over);
    return () => { document.body.classList.remove('cc-cursor'); document.removeEventListener('pointerover', over); };
  }, []);
  useFrame((_, m) => {
    const p = pos.current || (pos.current = { ...m });
    p.x += (m.x - p.x) * 0.2; p.y += (m.y - p.y) * 0.2;
    if (dot.current) dot.current.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
  });
  return (
    <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[7px] -mt-[7px] h-3.5 w-3.5 rounded-full bg-paper mix-blend-difference"
      style={{ transition: 'width .35s var(--ease-out-soft), height .35s var(--ease-out-soft), margin .35s var(--ease-out-soft)' }} />
  );
}
