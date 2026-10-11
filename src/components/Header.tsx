
import { useEffect, useRef, useState } from 'react';

const links: [string, string][] = [
  ['about', 'ABOUT'],
  ['events', 'EVENTS'],
  ['team', 'TEAM'],
  ['contact', 'CONTACT'],
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[4vw] py-[22px] font-mono text-xs tracking-[.06em] text-white mix-blend-difference">
      <a
        href="#top"
        className="flex shrink-0 items-center gap-2.5"
        onClick={() => setIsOpen(false)}
      >
        <img src="/nightly-logo.svg" alt="" className="h-[26px] w-[26px]" />
        FIREFOX CLUB
      </a>

      <nav
        aria-label="Main navigation"
        className="hidden gap-5 sm:flex sm:gap-7"
      >
        {links.map(([id, label]) => (
          <a
            key={id}
            href={'#' + id}
            className="hover:text-lilac"
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/40 sm:hidden"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true" className="text-xl leading-none">
          {isOpen ? '×' : '☰'}
        </span>
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full mx-[4vw] flex flex-col gap-5 rounded-lg border border-white/20 bg-neutral-950 p-5 text-white shadow-xl sm:hidden"
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              className="block py-1 hover:text-lilac"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
