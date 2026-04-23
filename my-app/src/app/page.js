import EfficiencySection from "./components/EfficiencySection";
import AboutUsSection from "./components/AboutUsSection";
import FooterSection from "./components/FooterSection";
import GetInTouchSection from "./components/GetInTouchSection";
import HeroSection from "./components/HeroSection";
import LogoMarquee from "./components/LogoMarquee";
import PlatformsSection from "./components/PlatformsSection";
import ServicesSection from "./components/ServicesSection";
import Services2 from "./components/services2";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="landing-page">
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <Services2 />
      {/* <PlatformsSection /> */}
      <EfficiencySection />
      <LogoMarquee />

      <Testimonials />
      <GetInTouchSection />
      <FooterSection />
    </div>
  );
}
