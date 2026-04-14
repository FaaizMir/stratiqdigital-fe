"use client";
import Image from "next/image";

const logoItems = [
  { src: "/assets/aliexpress-logo.svg", alt: "AliExpress" },
  { src: "/assets/alibaba-logo.jpg", alt: "Alibaba" },
  { src: "/assets/global-sources-logo.webp", alt: "Global Sources" },
  { src: "/assets/forbes-logo.png", alt: "Forbes" },
  { src: "/assets/cnbc-logo.png", alt: "CNBC" },
  { src: "/assets/inc-logo.webp", alt: "Inc" },
  { src: "/assets/yahoo-logo.png", alt: "Yahoo" },
];

const marqueeItems = [...logoItems, ...logoItems];

export default function LogoMarquee() {
  return (
    <section className="w-full bg-[var(--black)] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="heading-font mb-6 text-center text-4xl leading-none text-[var(--orange)] md:mb-8 md:text-6xl">
          Featured On
        </h2>

        <div className="marquee-wrap relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--morphism-black)] px-2 py-6 md:px-4 md:py-8">
          <div className="marquee-track flex w-max items-center gap-12 md:gap-16">
            {marqueeItems.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="morphism-surface flex h-24 w-48 items-center justify-center rounded-2xl px-5 py-4 md:h-28 md:w-56"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.alt} logo`}
                  width={170}
                  height={70}
                  className="h-12 w-36 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
