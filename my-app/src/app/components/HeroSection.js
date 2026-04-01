import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="about-us" className="hero-shell">
      <Image
        src="/assets/hero.png"
        alt="StratiqDigital sourcing hero"
        fill
        priority
        className="hero-image"
      />

      <div className="hero-overlay">
        <header className="top-nav">
          <a href="#about-us" className="nav-link">
            About us
          </a>
          <a href="#services" className="nav-link">
            Service
          </a>
          <a href="#about-us" className="logo-wrap" aria-label="StratiqDigital Home">
            <Image
              src="/assets/appLogo.png"
              alt="StratiqDigital logo"
              width={198}
              height={46}
            />
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </header>

        <div className="hero-content">
          <h1 style={{marginBottom:"20px"}}>Look Beyond Suppliers. Discover the Verified Factories in China</h1>

          <div className="hero-meta-row">
            <p className="hero-left-copy">
              Guaranteed Transparent Factory Pricing to Help Reduce Costs and
              Increase Profit Margins
            </p>

            <div className="hero-rating">
              <span className="stars">★★★★★</span>
              <p>
                <strong>3000+</strong> Happy Clients
              </p>
            </div>
          </div>

          <button className="cta-btn" type="button">
            Get Free Sourcing Quotation
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}