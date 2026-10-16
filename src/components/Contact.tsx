import { contact } from '../data.ts';

const label = 'font-mono text-xs tracking-[.08em] text-muted pb-2.5 border-b border-line';

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-[4vw] pb-[16vh] pt-[20vh]">
      <div className="mb-[5vh] font-mono text-xs tracking-[.08em] text-muted">(05) — CONTACT</div>
      <h2 className="mb-[4vh] text-[clamp(48px,9vw,150px)] font-black uppercase leading-[.9] tracking-[-.055em] [font-stretch:125%]">
        Say <span className="font-serif font-normal normal-case italic tracking-[-.01em] text-lilac">hello.</span>
      </h2>
      <a href={'mailto:' + contact.email} className="mb-[10vh] inline-block border-b border-[#3a3850] pb-1.5 text-[clamp(22px,3vw,48px)] font-medium tracking-[-.03em] transition-colors hover:border-lilac hover:text-lilac">
        {contact.email}
      </a>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[5vw]">
        <div className="flex flex-col">
          <span className={label}>FOLLOW</span>
          {contact.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 text-[17px] transition-all duration-300 hover:pl-2.5 hover:text-lilac">
              <span>{s.label}</span><span className="font-mono text-xs text-muted">{s.handle} ↗</span>
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3.5">
          <span className={label}>FIND US</span>
          <address className="text-[17px] not-italic leading-[1.55]">{contact.address.map((l) => <div key={l}>{l}</div>)}</address>
        </div>
      </div>
    </section>
  );
}
