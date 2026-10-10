import { useState } from 'react'; // useRef removed due to not being needed cuz of the height bug, fixed via grid-transition
import { team, type Person } from '../data.ts';

interface MemberProps { person: Person; open: boolean; onToggle: () => void }

function Member({ person, open, onToggle }: MemberProps) {
  const hasTeam = !!person.members?.length;
  return (
    <div className="border-b border-line">
      <button type="button" onClick={hasTeam ? onToggle : undefined}
        aria-expanded={hasTeam ? open : undefined}
        className={'group flex w-full items-baseline justify-between gap-5 py-[18px] text-left transition-[padding,color] duration-[400ms] ease-out-soft hover:pl-4 hover:text-lilac ' + (hasTeam ? 'cursor-pointer' : 'cursor-default')}>
        <span className="text-[clamp(22px,2.4vw,36px)] font-semibold tracking-[-.025em] [font-stretch:108%]">{person.name}</span>
        <span className="flex items-baseline gap-[18px] font-mono text-xs tracking-[.08em] text-muted">
          {person.role}
          {hasTeam && <span className="inline-block w-3.5 text-center text-base text-lilac transition-transform duration-500 ease-out-soft" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>+</span>}
        </span>
      </button>
      {hasTeam && (
        <div className="grid transition-[grid-template-rows] duration-[600ms] ease-in-out-strong" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col gap-3.5 pb-[26px] pt-1">
              <span className="font-mono text-[11px] tracking-[.1em] text-muted">{person.teamName} — {person.members!.length} MEMBERS</span>
              <div className="flex flex-wrap gap-2">
                {person.members!.map((m) => <span key={m} className="rounded-full border border-line px-3.5 py-2 text-sm text-[#d6d4e2]">{m}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const [open, setOpen] = useState(-1);
  return (
    <section id="team" className="grid gap-[4vw] px-[4vw] pb-[14vh] pt-[18vh] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="flex flex-col gap-5">
        <span className="font-mono text-xs tracking-[.08em] text-muted">(03) — THE PEOPLE</span>
        <p className="m-0 max-w-[300px] text-base leading-[1.55] text-soft">Run by students, for students.</p>
      </div>
      <div>
        {team.map((p, i) => <Member key={p.name} person={p} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
      </div>
    </section>
  );
}
