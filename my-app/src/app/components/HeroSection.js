"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
        <div className="hidden md:block">
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
        </div>

        <div className="relative md:hidden">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#010307]/95 px-4 py-3">
            <a
              href="#about-us"
              aria-label="StratiqDigital Home"
              onClick={closeMobileMenu}
            >
              <Image
                src="/assets/appLogo.png"
                alt="StratiqDigital logo"
                width={142}
                height={33}
              />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 rounded-2xl border border-white/10 bg-[#010307]/97 p-4 shadow-xl">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about-us"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 font-[Sora] text-sm text-white"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 font-[Sora] text-sm text-white"
                  >
                    Service
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 font-[Sora] text-sm text-white"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 font-[Sora] text-sm text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <div className="hero-content">
          <h1>Look Beyond Suppliers. Discover the Verified Factories in China</h1>

          <div className="hero-meta-row">
            <p className="hero-left-copy">
              Guaranteed Transparent Factory Pricing to Help Reduce Costs and
              Increase Profit Margins
            </p>

            <div className="hero-rating">
              <span className="stars">★★★★★</span>
              <p>
                <strong>300+</strong> Happy Clients
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