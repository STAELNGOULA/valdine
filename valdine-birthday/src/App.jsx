import { ParticleBackground } from './components/ParticleBackground';
import { HeroSection } from './components/HeroSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { TimelineSection } from './components/TimelineSection';
import { QualitiesSection } from './components/QualitiesSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { FinalLoveNote } from './components/FinalLoveNote';
import './App.css';

function App() {
  return (
    <div className="relative w-full text-soft-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-5">
        <HeroSection />
        <LoveLetterSection />
        <TimelineSection />
        <QualitiesSection />
        <PhotoGallerySection />
        <FinalLoveNote />
      </div>
    </div>
  );
}

export default App;
