import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { useActiveSection } from './hooks/useActiveSection';
import { useScrollPosition } from './hooks/useScrollPosition';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import CommandPalette from './components/CommandPalette';
import RecruiterModeModal from './components/RecruiterModeModal';
import CVViewerModal from './components/CVViewerModal';
import DigitalBusinessCardModal from './components/DigitalBusinessCardModal';
import NotFoundModal from './components/NotFoundModal';
import ToastContainer from './components/ToastContainer';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Certificates from './sections/Certificates';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function PortfolioMain() {
  const { isDark } = usePortfolio();
  const activeSection = useActiveSection();
  const { isScrolled, scrollY } = useScrollPosition();

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-grid-pattern">
      <LoadingScreen />
      <ScrollProgressBar />
      <CustomCursor isDark={isDark} />
      <ToastContainer />
      <CommandPalette />
      <RecruiterModeModal />
      <CVViewerModal />
      <DigitalBusinessCardModal />
      <NotFoundModal />

      <Navbar activeSection={activeSection} isScrolled={isScrolled} />

      <main>
        <Hero isDark={isDark} />
        <About isDark={isDark} />
        <Skills isDark={isDark} />
        <Experience isDark={isDark} />
        <Education isDark={isDark} />
        <Certificates isDark={isDark} />
        <Projects isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
      <ScrollToTop isVisible={scrollY > 400} />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
