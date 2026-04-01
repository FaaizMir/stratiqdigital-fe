import Image from "next/image";
import { Plus } from "lucide-react";

const differenceItems = [
  "Quality Assurance",
  "Competitive Prices",
  "Commitment to Our Clients",
  "Professional Sourcing Team",
  "In-house Packaging Solution",
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
  return (
    <section id="difference" className="w-full bg-black px-4 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-[Sora] text-4xl font-extrabold leading-[0.95] text-[#ff5a0f] md:text-6xl">
              The Difference
              <br />
              You&apos;ll Notice
            </h2>

            <div className="mt-8 rounded-3xl border border-zinc-600 bg-gradient-to-br from-zinc-800/95 to-zinc-700/80 p-6 md:p-7">
              {differenceItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-zinc-400/70 py-3 text-white"
                >
                  <p className="text-xl font-semibold leading-tight md:text-[2rem]">
                    {item}
                  </p>
                  <Plus className="h-6 w-6 shrink-0 text-zinc-200" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mx-auto max-w-[360px] text-center text-2xl font-medium leading-tight text-white md:text-4xl lg:text-right">
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
          <h3 className="font-[Sora] text-4xl font-extrabold leading-[0.95] text-[#ff5a0f] md:text-6xl">
            Scale Across
            <br />
            Categories
          </h3>
          <p className="max-w-[500px] text-left text-2xl font-medium leading-tight text-white md:text-right md:text-4xl">
            Work with reliable factories in over 100 product categories.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-3xl border border-zinc-600 bg-gradient-to-br from-zinc-800 to-zinc-700 px-6 py-7 text-center"
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
              <h4 className="text-2xl font-semibold text-white md:text-[2rem]">
                {category.title}
              </h4>
              <p className="mx-auto mt-2 max-w-[250px] text-base leading-tight text-zinc-200 md:text-lg">
                {category.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}