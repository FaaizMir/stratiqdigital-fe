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
    <footer className="w-full bg-black pb-8 md:pb-12">
      <div className="w-full rounded-none bg-[#ff5a0f] px-6 py-8 text-white md:px-12 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <a href="#about-us" className="inline-flex items-center">
              <Image
                src="/assets/appLogo.png"
                alt="StratiqDigital"
                width={330}
                height={84}
                className="h-auto w-[260px] md:w-[330px]"
              />
            </a>
          </div>

          <p className="max-w-[560px] text-xl leading-tight text-white/95 md:justify-self-end md:text-3xl">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-[Sora] text-4xl font-semibold md:text-[2.75rem]">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-lg text-white/90 transition hover:text-white md:text-[1.9rem]"
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
            className="text-3xl font-semibold text-white md:text-5xl"
          >
            info@stratiqdigital.com
          </a>

          <a
            href="tel:+18884233159"
            className="inline-flex items-center gap-3 text-3xl font-semibold text-white md:text-5xl"
          >
            <Phone className="h-7 w-7 md:h-9 md:w-9" />
            1-888-000-0000
          </a>
        </div>
      </div>
    </footer>
  );
}