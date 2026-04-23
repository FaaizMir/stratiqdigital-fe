"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

const differenceItems = [
  {
    title: "Quality Assurance",
    description: "We maintain rigorous quality control standards at every step of production. Our team conducts thorough inspections to ensure products meet your exact specifications.",
  },
  {
    title: "Competitive Prices",
    description: "By working directly with factories and eliminating middlemen, we pass savings directly to you. Our volume purchasing power ensures you get the best rates without compromising quality.",
  },
  {
    title: "Commitment to Our Clients",
    description: "Your success is our priority. We provide dedicated support throughout your entire sourcing journey, from product selection to final delivery and beyond.",
  },
  {
    title: "Professional Sourcing Team",
    description: "Our experienced sourcing agents have deep industry knowledge and established relationships with trusted manufacturers. We navigate complexities so you can focus on your business.",
  },
  {
    title: "In-house Packaging Solution",
    description: "We handle all packaging and branding needs in-house, reducing costs and ensuring consistency. From design to fulfillment, we manage every detail for you.",
  },
];

const categories = [
  {
    title: "Fashion Accessories",
    subtitle: "Bracelets, Necklaces, and more",
    logo: "/assets/servicesLogo1.png",
    alt: "Fashion accessories icon",
  },
  {
    title: "Fashion and Athleisure",
    subtitle: "Shirts, sportswear, and more",
    logo: "/assets/servicesLogo2.png",
    alt: "Fashion and athleisure icon",
  },
  {
    title: "Homegoods",
    subtitle: "Furniture, candles, and more",
    logo: "/assets/servicesLogo3.png",
    alt: "Homegoods icon",
  },
];

export default function Services2() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <section id="difference" className="w-full bg-[var(--black)] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="heading-font text-4xl leading-[0.95] text-[var(--orange)] md:text-6xl">
              The Difference
              <br />
              You&apos;ll Notice
            </h2>

            <div className="morphism-surface-dark mt-8 rounded-3xl border border-zinc-600 p-6 md:p-7">
              {differenceItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleExpand(index)}
                    className={`flex w-full items-center justify-between border-b py-3 text-left transition-all duration-300 ${
                      expandedId === index
                        ? "border-[var(--orange)] bg-orange-500/10"
                        : "border-zinc-400/70 hover:border-[var(--orange)]/50"
                    } hover:bg-zinc-800/30 rounded-lg px-3 -mx-3`}
                  >
                    <p
                      className={`heading-font text-xl leading-tight md:text-[2rem] transition-colors duration-300 ${
                        expandedId === index
                          ? "text-[var(--orange)]"
                          : "text-white hover:text-[var(--orange)]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <Plus
                      className={`h-6 w-6 shrink-0 transition-all duration-300 ${
                        expandedId === index
                          ? "text-[var(--orange)] rotate-45"
                          : "text-zinc-200 hover:text-[var(--orange)]"
                      }`}
                    />
                  </button>
                  {expandedId === index && (
                    <div className="overflow-hidden">
                      <p className="description-font px-3 py-4 text-base md:text-lg leading-relaxed text-zinc-300 animate-in fade-in slide-in-from-top-2 duration-300">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="description-font mx-auto max-w-[360px] text-center text-2xl leading-tight text-[var(--white-soft)] md:text-4xl lg:text-right">
              What sets us apart from other sourcing agents.
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-600/70">
              <Image
                src="/assets/services2Img.png"
                alt="Team discussing sourcing strategy"
                width={680}
                height={780}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto] md:gap-10">
          <h3 className="heading-font text-4xl leading-[0.95] text-[var(--orange)] md:text-6xl">
            Scale Across
            <br />
            Categories
          </h3>
          <p className="description-font max-w-[500px] text-left text-2xl leading-tight text-[var(--white-soft)] md:text-right md:text-4xl">
            Work with reliable factories in over 100 product categories.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className="morphism-surface-dark rounded-3xl border border-zinc-600 px-6 py-7 text-center"
            >
              <div className="mx-auto mb-5 flex h-[62px] w-[62px] items-center justify-center">
                <Image
                  src={category.logo}
                  alt={category.alt}
                  width={62}
                  height={62}
                  className="h-auto w-auto"
                />
              </div>
              <h4 className="heading-font text-2xl text-white md:text-[2rem]">
                {category.title}
              </h4>
              <p className="description-font mx-auto mt-2 max-w-[250px] text-base leading-tight text-zinc-200 md:text-lg">
                {category.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}