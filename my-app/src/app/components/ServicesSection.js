"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: "01",
    title: "Direct Factory Supplier Sourcing",
    headline: "We offer a range of product outsourcing services",
    description:
      "We help ecommerce brands connect directly with reliable and verified manufacturers in China, ensuring transparent pricing and efficient production partnerships.",
    whatWeDo: [
      "Identify and shortlist verified manufacturing factories",
      "Conduct supplier capability and background verification",
      "Negotiate pricing, MOQs, and production terms",
      "Coordinate product sampling and quotation comparison",
      "Assist in production planning and order confirmation",
      "Ensure direct factory communication without middlemen",
    ],
    outcome: [
      "Stronger brand perception",
      "Higher product value and conversion potential",
      "Professional retail presentation",
    ],
  },
  {
    id: "02",
    title: "Existing Supplier Management",
    headline: "Improve supplier consistency without operational stress",
    description:
      "We optimize your current supplier relationships, reduce communication friction, and improve delivery reliability while keeping your cost targets in focus.",
    whatWeDo: [
      "Audit supplier performance and identify risk areas",
      "Standardize communication and escalation workflows",
      "Review quality reports and corrective action plans",
      "Align suppliers with your production calendar",
      "Track compliance, lead times, and delivery scorecards",
      "Support negotiations for better commercial terms",
    ],
    outcome: [
      "Fewer production delays and quality incidents",
      "Better supplier accountability and consistency",
      "More predictable operations and planning",
    ],
  },
  {
    id: "03",
    title: "Custom Packaging & Branding Sourcing",
    headline: "Create premium packaging that elevates your brand",
    description:
      "From concept to production, we source packaging partners that match your design goals, budget, and quality requirements for a stronger customer unboxing experience.",
    whatWeDo: [
      "Source packaging vendors aligned with your product category",
      "Match materials and finishes to your brand identity",
      "Compare prototypes and print quality benchmarks",
      "Optimize costs for inserts, boxes, and labels",
      "Coordinate packaging compliance requirements",
      "Oversee packaging timelines with production planning",
    ],
    outcome: [
      "More professional and memorable product presentation",
      "Stronger customer trust and brand recall",
      "Packaging quality that supports premium pricing",
    ],
  },
  {
    id: "04",
    title: "Product Sampling & Quality Inspection",
    headline: "Reduce quality risk before mass production starts",
    description:
      "We manage sample validation and inspection checkpoints so you can approve production confidently and avoid costly defects, rework, and shipment rejections.",
    whatWeDo: [
      "Coordinate sample rounds and benchmark testing",
      "Define product specifications and tolerances",
      "Run pre-production and in-line quality checks",
      "Perform final random inspection before dispatch",
      "Document defects and enforce correction cycles",
      "Provide photo and report-based approval summaries",
    ],
    outcome: [
      "Higher pass rates and fewer returns",
      "Lower risk of post-shipment quality issues",
      "Faster approvals with transparent inspection data",
    ],
  },
  {
    id: "05",
    title: "DDP Shipping & Logistics Management",
    headline: "Simplify global delivery with end-to-end coordination",
    description:
      "We handle freight planning, documentation, and customs coordination under DDP workflows to ensure your inventory arrives on time with clear landed costs.",
    whatWeDo: [
      "Plan shipping methods based on urgency and margin",
      "Consolidate cargo and optimize route selection",
      "Manage export documents and customs coordination",
      "Track shipments and provide milestone updates",
      "Coordinate last-mile delivery and warehouse handoff",
      "Monitor landed costs and improve logistics efficiency",
    ],
    outcome: [
      "Smoother, predictable delivery timelines",
      "Reduced logistics complexity for your team",
      "Better control over total landed cost",
    ],
  },
];

export default function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const activeService =
    services.find((service) => service.id === activeServiceId) || services[0];

  return (
    <section id="services" className="w-full bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500 leading-tight mb-10">
              Services <br /> We Offer
            </h2>

            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                >
                  <button
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`group flex w-full items-center justify-between rounded-full border px-6 py-4 text-left transition-all duration-300 ${
                      activeServiceId === service.id
                        ? "border-orange-500"
                        : "border-zinc-600 hover:border-orange-500"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-3xl font-bold transition ${
                          activeServiceId === service.id
                            ? "text-orange-500"
                            : "text-zinc-300 group-hover:text-orange-500"
                        }`}
                      >
                        {service.id}
                      </span>
                      <p className="text-white text-sm md:text-base font-medium">
                        {service.title}
                      </p>
                    </div>

                    <ArrowRight className="text-zinc-400 group-hover:text-orange-500 transition" />
                  </button>

                  {activeServiceId === service.id && (
                    <div className="mt-4 space-y-4 lg:hidden">
                      <h3 className="text-lg text-white font-medium">
                        {service.headline}
                      </h3>

                      <div className="bg-zinc-700/60 rounded-xl p-5 text-zinc-200 text-sm leading-relaxed">
                        {service.description}
                      </div>

                      <div className="bg-black rounded-xl p-5">
                        <h4 className="text-orange-500 font-semibold mb-3 text-base">
                          What we do:
                        </h4>
                        <ul className="space-y-2 text-sm text-white list-disc list-inside">
                          {service.whatWeDo.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-orange-500 rounded-xl p-5 text-white">
                        <h4 className="font-semibold mb-3 text-base">Outcome:</h4>
                        <ul className="space-y-1 text-sm list-disc list-inside">
                          {service.outcome.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden space-y-6 lg:block">
            <h3 className="text-xl md:text-2xl text-white font-medium">
              {activeService.headline}
            </h3>

            <div className="bg-zinc-700/60 rounded-xl p-6 text-zinc-200 text-sm md:text-base leading-relaxed">
              {activeService.description}
            </div>

            <div className="bg-black rounded-xl p-6">
              <h4 className="text-orange-500 font-semibold mb-4 text-lg">
                What we do:
              </h4>
              <ul className="space-y-2 text-sm md:text-base text-white list-disc list-inside">
                {activeService.whatWeDo.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-500 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-3 text-lg">Outcome:</h4>
              <ul className="space-y-1 text-sm md:text-base list-disc list-inside">
                {activeService.outcome.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}