import type { Language } from "../data";
import type { Theme } from "../components/Header";
import Hero from "../components/Hero";
import FocusStrip from "../components/FocusStrip";
import Projects from "../components/Projects";
import About from "../components/About";
import Ecosystem from "../components/Ecosystem";
import TeamSection from "../components/TeamSection";
import Technology from "../components/Technology";
import Journey from "../components/Journey";

export default function HomePage({ lang, theme }: { lang: Language; theme: Theme }) {
  return (
    <>
      <Hero lang={lang} theme={theme} />
      <FocusStrip lang={lang} />
      <Projects lang={lang} />
      <About lang={lang} />
      <Ecosystem lang={lang} />
      <TeamSection lang={lang} />
      <Technology lang={lang} />
      <Journey lang={lang} />
    </>
  );
}
