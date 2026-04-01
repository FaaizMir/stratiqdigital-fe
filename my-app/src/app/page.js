import EfficiencySection from "./components/EfficiencySection";
import FooterSection from "./components/FooterSection";
import GetInTouchSection from "./components/GetInTouchSection";
import HeroSection from "./components/HeroSection";
import PlatformsSection from "./components/PlatformsSection";
import ServicesSection from "./components/ServicesSection";
import Services2 from "./components/services2";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="landing-page">
      <HeroSection />
      <ServicesSection />
      <Services2 />
      <PlatformsSection />
      <EfficiencySection />

      <Testimonials />
      <GetInTouchSection />
      <FooterSection />
    </div>
  );
}
