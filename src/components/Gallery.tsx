import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gallery } from '../data.ts';

const DURATION = 400;
const events = gallery.filter((g) => g.photos.length > 0);

interface Open { e: number; p: number }

function LightboxImage({ src, alt, shown }: { src: string; alt: string; shown: boolean }) {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

    const ref = useCallback((img: HTMLImageElement | null) => {
        if (img && img.complete && img.naturalWidth > 0) setStatus('ready');
    }, []);

    return (
        <div className="relative max-w-full" onClick={(e) => e.stopPropagation()}>
            <img ref={ref} src={src} alt={alt} width={1280} height={960}
                onLoad={() => setStatus('ready')} onError={() => setStatus('error')}
                className="max-h-[75vh] max-w-full rounded-md object-contain transition-[transform,opacity] duration-400 ease-out-soft motion-reduce:transition-none"
                style={{ transform: shown ? 'scale(1)' : 'scale(.92)', opacity: shown && status === 'ready' ? 1 : 0 }} />
            {status !== 'ready' && (
                <div role="status" className="absolute inset-0 grid place-items-center font-mono text-xs tracking-[.08em] text-soft">
                    {status === 'loading'
                        ? <><span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-lilac motion-reduce:animate-none" /><span className="sr-only">Loading photo</span></>
                        : <span>COULD NOT LOAD PHOTO</span>}
                </div>
            )}
        </div>
    );
}

export default function Gallery() {
    const [open, setOpen] = useState<Open | null>(null);
    const [shown, setShown] = useState(false);
    const closeBtn = useRef<HTMLButtonElement>(null);
    const timer = useRef<number>(0);
    const isOpen = open !== null;

    const openAt = (e: number) => {
        clearTimeout(timer.current);
        setOpen({ e, p: 0 });
    };

    const close = useCallback(() => {
        setShown(false);
        timer.current = window.setTimeout(() => setOpen(null), DURATION); // unmount after it ends
    }, []);

    const step = useCallback((dir: 1 | -1) => {
        setOpen((o) => {
            if (!o) return o;
            const n = events[o.e].photos.length;
            return { e: o.e, p: (o.p + dir + n) % n };
        });
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const id = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(id);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        window.addEventListener('keydown', onKey);
        closeBtn.current?.focus();
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, close, step]);

    useEffect(() => {
        if (!open) return;
        const list = events[open.e].photos;
        [1, -1].forEach((d) => { new Image().src = list[(open.p + d + list.length) % list.length].src; });
    }, [open]);

    const ev = open ? events[open.e] : null;
    const photo = ev && open ? ev.photos[open.p] : null;
    const multi = !!ev && ev.photos.length > 1;

    return (
        <section id="gallery" className="px-[4vw] pb-[14vh] pt-[10vh]">
            <div className="mb-[4vh] flex items-baseline justify-between font-mono text-xs tracking-[.08em] text-muted">
                <span>(04) — GALLERY</span><span className="hidden md:inline">PAST EVENTS</span>
            </div>
            {events.length === 0 ? (
                <p className="border-t border-line py-[6vh] font-mono text-sm tracking-[.08em] text-muted">No Photos To Show!</p>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
                    {events.map((g, i) => (
                        <figure key={g.event + g.date} className="group m-0 flex flex-col gap-3">
                            <button type="button" onClick={() => openAt(i)} aria-haspopup="dialog"
                                aria-label={`${g.event}, ${g.photos.length} ${g.photos.length === 1 ? 'photo' : 'photos'}`}
                                className="relative block cursor-zoom-in overflow-hidden rounded-md border border-line p-0">
                                <img src={g.photos[0].src} alt={g.photos[0].alt} width={800} height={600} loading="lazy" decoding="async"
                                    className="aspect-4/3 w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
                                {g.photos.length > 1 && (
                                    <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 font-mono text-[11px] tracking-widest text-white">
                                        {g.photos.length} PHOTOS
                                    </span>
                                )}
                            </button>
                            <figcaption className="flex items-baseline justify-between gap-4 font-mono text-xs tracking-[.08em]">
                                <span>{g.event}</span><span className="text-muted">{g.date}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            )}
            {ev && photo && open && createPortal(
                <div role="dialog" aria-modal="true" aria-label={ev.event}
                    onClick={close}
                    className="fixed inset-0 z-60 flex flex-col items-center justify-center gap-4 bg-ink/90 p-[4vw] backdrop-blur-sm transition-opacity duration-400 motion-reduce:transition-none"
                    style={{ opacity: shown ? 1 : 0 }}>
                    <button ref={closeBtn} type="button" onClick={close} aria-label="Close"
                        className="absolute right-6 top-6 font-mono text-xs tracking-[.08em] text-white hover:text-lilac">
                        CLOSE
                    </button>
                    <LightboxImage key={photo.src} src={photo.src} alt={photo.alt} shown={shown} />
                    <div className="absolute bottom-8 flex items-center gap-6 font-mono text-xs tracking-[.08em] text-soft" onClick={(e) => e.stopPropagation()}>
                        {multi && <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="px-2 py-1 text-white hover:text-lilac">←</button>}
                        <span>
                            {photo.alt} <span className="text-muted">— {ev.date}</span>
                            {multi && <span className="text-muted"> · {open.p + 1} / {ev.photos.length}</span>}
                        </span>
                        {multi && <button type="button" onClick={() => step(1)} aria-label="Next photo" className="px-2 py-1 text-white hover:text-lilac">→</button>}
                    </div>
                </div>,
                document.body,
            )}
        </section>
    );
}