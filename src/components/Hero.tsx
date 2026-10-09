import { heroCopy } from '../data.ts';

interface SplitProps { text: string; offset: number; revealed: boolean }

function Split({ text, offset, revealed }: SplitProps) {
  return [...text].map((c, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[.04em] align-top">
      <span className="inline-block" style={{
        transform: revealed ? 'none' : 'translateY(105%)',
        transition: `transform 1.2s var(--ease-out-soft) ${(offset + i) * 0.045}s`,
      }}>{c}</span>
    </span>
  ));
}

const big = 'm-0 whitespace-nowrap text-[13vw] font-black uppercase leading-[.82] tracking-[-.055em] [font-stretch:125%]';

export default function Hero({ revealed }: { revealed: boolean }) {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-end overflow-hidden px-[4vw] pb-[5vh]">
      <div className="mb-[.6vw] ml-[.4vw] whitespace-nowrap font-serif text-[7vw] italic leading-none tracking-[-.01em] text-lilac">
        <Split text="Mozilla" offset={0} revealed={revealed} />
      </div>
      <h1 className={big}><Split text="Firefox" offset={7} revealed={revealed} /></h1>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-[3vw]">
        <h1 className={big}><Split text="Club" offset={14} revealed={revealed} /></h1>
        <div className="flex max-w-[340px] flex-col gap-[22px] md:pb-[1.4vw]" style={{
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'opacity 1s .5s, transform 1s .5s var(--ease-out-soft)',
        }}>
          <p className="m-0 text-[17px] leading-normal text-soft [text-wrap:pretty]">{heroCopy}</p>
          <span className="font-mono text-xs tracking-[.08em] text-muted">SCROLL ↓</span>
        </div>
      </div>
    </section>
  );
}
