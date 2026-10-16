import { useRef, useState } from 'react';
import { useSmoothScroll, env } from './motion.ts';
import Loader from './components/Loader.tsx';
import Cursor from './components/Cursor.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Events from './components/Events.tsx';
import Marquee from './components/Marquee.tsx';
import Team from './components/Team.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import Gallery from './components/Gallery.tsx';

const FLAGS = { intro: true, smoothScroll: true, cursor: true };

export default function App() {
  const showIntro = FLAGS.intro && !env.reduce;
  const [revealed, setRevealed] = useState(!showIntro);
  const scroller = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useSmoothScroll(scroller, content, FLAGS.smoothScroll);

  return (
    <>
      {showIntro && <Loader onReveal={() => setRevealed(true)} />}
      {FLAGS.cursor && !env.touch && <Cursor />}
      <Header />
      <div ref={scroller} className="left-0 top-0 w-full will-change-transform">
        <div ref={content}>
          <Hero revealed={revealed} />
          <About />
          <Events />
          <Marquee />
          <Team />
          <Gallery />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}
