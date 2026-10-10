const links: [string, string][] = [['about', 'ABOUT'], ['events', 'EVENTS'], ['team', 'TEAM'], ['contact', 'CONTACT']];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[4vw] py-[22px] font-mono text-xs tracking-[.06em] text-white mix-blend-difference">
      <a href="#top" className="flex items-center gap-2.5">
        <img src="/nightly-logo.svg" alt="" className="h-[26px] w-[26px]" />
        FIREFOX CLUB
      </a>
      <nav className="flex gap-5 sm:gap-7">
        {links.map(([id, label]) => <a key={id} href={'#' + id} className="hover:text-lilac">{label}</a>)}
      </nav>
    </header>
  );
}
