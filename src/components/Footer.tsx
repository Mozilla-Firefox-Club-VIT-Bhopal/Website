import { useRef } from 'react';
import { useFrame } from '../motion.ts';

export default function Footer() {
  const foot = useRef<HTMLElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  useFrame((_, m) => {
    if (!foot.current || !logo.current) return;
    const r = foot.current.getBoundingClientRect(), vh = innerHeight;
    const p = Math.max(0, Math.min(1, (vh - r.top) / r.height));
    const tx = m.x / innerWidth - 0.5, ty = m.y / vh - 0.5;
    logo.current.style.transform = `scale(${0.45 + 0.55 * p}) rotate(${(1 - p) * -140}deg) rotateY(${tx * 24}deg) rotateX(${-ty * 24}deg)`;
  });
  return (
    <footer ref={foot} className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-[4vw] pb-[4vh] pt-[14vh] bg-[radial-gradient(60%_50%_at_50%_55%,oklch(0.3_0.12_290/.55),transparent_70%)]">
      <div className="relative flex flex-1 items-center justify-center [perspective:900px]">
        <img ref={logo} src="/nightly-logo.webp" alt="Firefox Nightly" className="h-auto w-[min(56vh,62vw)] will-change-transform drop-shadow-[0_40px_80px_rgba(130,90,255,.35)]" />
      </div>
      <div className="flex w-full justify-between gap-5 pt-[6vh] font-mono text-xs tracking-[.06em] text-muted">
        <span>© 2026 MOZILLA FIREFOX CLUB, VIT BHOPAL</span>
        <a href="#top" className="hover:text-lilac">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
