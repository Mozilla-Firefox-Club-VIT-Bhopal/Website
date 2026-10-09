import { useEffect, type DependencyList, type RefObject } from 'react';

export interface Point { x: number; y: number }
export interface ScrollState { cur: number; vel: number; smooth: boolean }
export type FrameFn = (scroll: ScrollState, mouse: Point) => void;

const hasWindow = typeof window !== 'undefined';

// One requestAnimationFrame loop shared by every animated component.
export const mouse: Point = { x: hasWindow ? innerWidth / 2 : 0, y: hasWindow ? innerHeight / 2 : 0 };
export const scroll: ScrollState = { cur: 0, vel: 0, smooth: false };
export const env = {
  touch: hasWindow && matchMedia('(hover: none)').matches,
  reduce: hasWindow && matchMedia('(prefers-reduced-motion: reduce)').matches,
};

const subs = new Set<FrameFn>();
export function useFrame(fn: FrameFn, deps: DependencyList = []): void {
  useEffect(() => {
    subs.add(fn);
    return () => { subs.delete(fn); };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop, behavior: scroll.smooth ? 'auto' : 'smooth' });
}

// Lerped "virtual" scroll: the content wrapper is fixed and translated, body height mirrors it.
export function useSmoothScroll(
  scrollerRef: RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>,
  enabled: boolean,
): void {
  useEffect(() => {
    const scroller = scrollerRef.current, content = contentRef.current;
    if (!scroller || !content) return;
    const smooth = enabled && !env.touch && !env.reduce;
    scroll.smooth = smooth;
    scroller.style.position = smooth ? 'fixed' : 'relative';
    const size = () => { document.body.style.height = smooth ? content.offsetHeight + 'px' : ''; };
    const ro = new ResizeObserver(size); ro.observe(content); size();
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = a?.getAttribute('href');
      if (!href || href.length < 2) return;
      e.preventDefault(); scrollToId(href.slice(1));
    };
    addEventListener('pointermove', onMove);
    document.addEventListener('click', onClick);
    let cur = scrollY, last = cur, raf = 0;
    const loop = () => {
      const target = scrollY;
      cur = smooth ? cur + (target - cur) * 0.085 : target;
      if (Math.abs(target - cur) < 0.05) cur = target;
      if (smooth) scroller.style.transform = `translate3d(0,${-cur}px,0)`;
      scroll.vel = cur - last; scroll.cur = cur; last = cur;
      subs.forEach((fn) => fn(scroll, mouse));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      removeEventListener('pointermove', onMove); document.removeEventListener('click', onClick);
      document.body.style.height = '';
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps
}
