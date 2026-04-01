"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alan",
    role: "CEO at Alibaba",
    avatar: "https://i.pravatar.cc/160?img=65",
    message:
      "StratiqDigital helped us cut sourcing time dramatically while keeping quality checks strict and transparent. Their factory communication process is fast and reliable. StratiqDigital helped us cut sourcing time dramatically while keeping quality checks strict and transparent. Their factory communication process is fast and reliable",
  },
  {
    id: 2,
    name: "Mex",
    role: "COO at TradeNest",
    avatar: "https://i.pravatar.cc/160?img=12",
    message:
      "From supplier verification to logistics, every step was managed professionally. We shipped faster and improved margins within the first quarter. StratiqDigital helped us cut sourcing time dramatically while keeping quality checks strict and transparent. Their factory communication process is fast and reliable",
  },
  {
    id: 3,
    name: "Sophia",
    role: "Founder at BoltCart",
    avatar: "https://i.pravatar.cc/160?img=47",
    message:
      "Their team negotiated better production terms and prevented common manufacturing issues before they reached us. The experience felt premium. StratiqDigital helped us cut sourcing time dramatically while keeping quality checks strict and transparent. Their factory communication process is fast and reliable",
  },
  {
    id: 4,
    name: "Daniel",
    role: "Head of Ops at UrbanPixel",
    avatar: "https://i.pravatar.cc/160?img=18",
    message:
      "The sourcing quotation process is clear, quick, and data-backed. We now have trusted factories with stable lead times for scaling.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getLoopedIndex = (index) => {
    const length = testimonials.length;
    return (index + length) % length;
  };

  const visibleCards = useMemo(
    () => [
      testimonials[getLoopedIndex(activeIndex - 1)],
      testimonials[getLoopedIndex(activeIndex)],
      testimonials[getLoopedIndex(activeIndex + 1)],
    ],
    [activeIndex]
  );

  const goPrev = () => setActiveIndex((prev) => getLoopedIndex(prev - 1));
  const goNext = () => setActiveIndex((prev) => getLoopedIndex(prev + 1));

  return (
    <section id="testimonials" className="w-full bg-black px-4 pb-16 pt-6 md:px-8 md:pb-24">
      <div className="mx-auto max-w-[1700px] overflow-hidden">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.85fr_1.9fr_0.85fr]">
          {visibleCards.map((item, index) => {
            const isCenter = index === 1;
            return (
              <article
                key={item.id}
                className={`rounded-[2rem] border border-zinc-700 bg-gradient-to-r from-[#1f2024] to-[#2d2d31] p-5 text-white transition-all duration-500 md:min-h-[310px] md:p-6 ${
                  isCenter
                    ? "md:col-span-1 md:scale-100 md:opacity-100"
                    : "md:scale-95 md:opacity-40"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={`${item.name} avatar`}
                      className="h-14 w-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-[Sora] text-2xl font-extrabold leading-none md:text-[2.8rem]">
                        {item.name}
                      </h3>
                      <p className="text-base font-semibold text-zinc-200 md:text-[1.05rem]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <span className="font-[Sora] text-6xl font-bold leading-none text-[#ff5a0f] md:text-7xl">
                    “
                  </span>
                </div>

                <p className="text-[1.05rem] leading-[1.25] text-zinc-100 md:text-[1rem]">
                  {item.message}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 md:mt-12">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-100 text-zinc-100 transition hover:bg-zinc-100 hover:text-black"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-100 text-zinc-100 transition hover:bg-zinc-100 hover:text-black"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
}