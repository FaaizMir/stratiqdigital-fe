"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!isQuoteModalOpen) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === "Escape") {
        setIsQuoteModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isQuoteModalOpen]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsQuoteModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

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

          <button
            className="cta-btn"
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
          >
            Get Free Sourcing Quotation
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            isQuoteModalOpen
              ? "pointer-events-auto bg-black/60 opacity-100"
              : "pointer-events-none bg-black/0 opacity-0"
          }`}
          onClick={() => setIsQuoteModalOpen(false)}
        >
          <div
            className={`w-full max-w-2xl rounded-3xl border border-zinc-600 bg-[#0f1114] p-6 text-white shadow-2xl transition-all duration-300 md:p-8 ${
              isQuoteModalOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
            }`}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Get free sourcing quotation"
          >
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-[Sora] text-3xl font-bold text-[#ff5a0f] md:text-4xl">
                  Request A Quote
                </h3>
                <p className="mt-2 text-zinc-300">
                  Fill out your details and our team will get in touch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="rounded-full border border-zinc-500 px-3 py-1 text-sm text-zinc-200 transition hover:border-zinc-300"
              >
                Close
              </button>
            </div>

            <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSubmit}>
              <label className="space-y-2 text-sm">
                <span>Name</span>
                <input
                  required
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={onInputChange}
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-900/70 px-4 py-3 outline-none transition focus:border-[#ff5a0f]"
                  placeholder="Your full name"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span>Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onInputChange}
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-900/70 px-4 py-3 outline-none transition focus:border-[#ff5a0f]"
                  placeholder="you@company.com"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span>Phone</span>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={onInputChange}
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-900/70 px-4 py-3 outline-none transition focus:border-[#ff5a0f]"
                  placeholder="+1 234 567 891"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span>Company</span>
                <input
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={onInputChange}
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-900/70 px-4 py-3 outline-none transition focus:border-[#ff5a0f]"
                  placeholder="Company name"
                />
              </label>

              <label className="space-y-2 text-sm md:col-span-2">
                <span>Project Details</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={onInputChange}
                  className="w-full resize-none rounded-xl border border-zinc-600 bg-zinc-900/70 px-4 py-3 outline-none transition focus:border-[#ff5a0f]"
                  placeholder="Tell us what products you need sourced."
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#ff5a0f] px-5 py-3 font-semibold text-white transition hover:bg-[#ff6f2c]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}