import Image from "next/image";
import { Phone } from "lucide-react";

const footerColumns = [
  {
    title: "About us",
    links: [
      { label: "Our Story", href: "#about-us" },
      { label: "Why Stratiq", href: "#difference" },
      { label: "Factory Network", href: "#services" },
      { label: "Client Results", href: "#testimonials" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Supplier Sourcing", href: "#services" },
      { label: "Quality Inspection", href: "#services" },
      { label: "Brand Packaging", href: "#services" },
      { label: "Shipping Support", href: "#services" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Case Studies", href: "#projects" },
      { label: "Category Expansion", href: "#projects" },
      { label: "Marketplace Growth", href: "#projects" },
      { label: "Success Stories", href: "#testimonials" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Request Quote", href: "#contact" },
      { label: "Book Consultation", href: "#contact" },
      { label: "Email Us", href: "mailto:info@stratiqdigital.com" },
      { label: "Call Us", href: "tel:+18884233159" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="w-full bg-[var(--black)] pb-4 pt-0 md:pb-6">
      <div className="mx-4 w-[calc(100%-2rem)] rounded-[28px] bg-[var(--orange)] px-6 py-7 text-white md:mx-4 md:rounded-[34px] md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <a href="#hero" className="inline-flex items-center">
              <Image
                src="/assets/appLogo.png"
                alt="StratiqDigital"
                width={330}
                height={84}
                className="h-auto w-[260px] md:w-[330px]"
              />
            </a>
          </div>

          <p className="description-font max-w-[560px] text-lg leading-relaxed text-white/95 md:justify-self-end md:text-2xl lg:text-right">
            StratiqDigital connects brands with verified factories in China,
            manages sourcing with transparency, and helps you reduce risk,
            improve margins, and scale with confidence.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-10 md:grid-cols-4 md:gap-8">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="heading-font text-3xl md:text-[2.5rem]">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="description-font text-base text-white/90 transition hover:text-white md:text-xl"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/70 pt-5 md:flex-row md:items-center">
          <a
            href="mailto:info@stratiqdigital.com"
            className="heading-font text-2xl text-white md:text-4xl"
          >
            info@stratiqdigital.com
          </a>

          <a
            href="tel:+18884233159"
            className="heading-font inline-flex items-center gap-3 text-2xl text-white md:text-4xl"
          >
            <Phone className="h-6 w-6 md:h-8 md:w-8" />
            1-888-000-0000
          </a>
        </div>
      </div>
    </footer>
  );
}