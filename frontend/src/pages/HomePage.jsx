import AnnouncementBar from '../components/home/AnnouncementBar';
import SiteHeader from '../components/home/SiteHeader';
import HeroSection from '../components/home/HeroSection';
import ProgramMetricsStrip from '../components/home/ProgramMetricsStrip';
import FailurePatternSection from '../components/home/FailurePatternSection';
import CheckpointTimelineSection from '../components/home/CheckpointTimelineSection';
import VinceVideoLetterSection from '../components/home/VinceVideoLetterSection';
import CohortCalendarSection from '../components/home/CohortCalendarSection';
import CohortMapSection from '../components/home/CohortMapSection';
import AdmissionsCriteriaSection from '../components/home/AdmissionsCriteriaSection';
import SinsPreviewSection from '../components/home/SinsPreviewSection';
import FaqSection from '../components/home/FaqSection';
import FooterCTASection from '../components/home/FooterCTASection';
import SiteFooter from '../components/home/SiteFooter';

export default function HomePage() {
  return (
    <div className="lp-home">
      <AnnouncementBar />
      <SiteHeader activePath="/" />
      <main>
        <HeroSection />
        <ProgramMetricsStrip />
        <FailurePatternSection />
        <CheckpointTimelineSection />
        <VinceVideoLetterSection />
        <CohortCalendarSection />
        <CohortMapSection />
        <AdmissionsCriteriaSection />
        <SinsPreviewSection />
        <FaqSection />
        <FooterCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
