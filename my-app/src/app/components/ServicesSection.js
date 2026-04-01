"use client";

import { ArrowRight } from "lucide-react";

const services = [
  { id: "01", title: "Direct Factory Supplier Sourcing" },
  { id: "02", title: "Existing Supplier Management" },
  { id: "03", title: "Custom Packaging & Branding Sourcing" },
  { id: "04", title: "Product Sampling & Quality Inspection" },
  { id: "05", title: "DDP Shipping & Logistics Management" },
];

export default function ServicesSection() {
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
                  className="group flex items-center justify-between border border-zinc-600 rounded-full px-6 py-4 hover:border-orange-500 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-zinc-300 group-hover:text-orange-500 transition">
                      {service.id}
                    </span>
                    <p className="text-white text-sm md:text-base font-medium">
                      {service.title}
                    </p>
                  </div>

                  <ArrowRight className="text-zinc-400 group-hover:text-orange-500 transition" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl text-white font-medium">
              We offer a range of product outsourcing services
            </h3>

            <div className="bg-zinc-700/60 rounded-xl p-6 text-zinc-200 text-sm md:text-base leading-relaxed">
              We help ecommerce brands connect directly with reliable and
              verified manufacturers in China, ensuring transparent pricing and
              efficient production partnerships.
            </div>

            <div className="bg-black rounded-xl p-6">
              <h4 className="text-orange-500 font-semibold mb-4 text-lg">
                What we do:
              </h4>
              <ul className="space-y-2 text-sm md:text-base text-white list-disc list-inside">
                <li>Identify and shortlist verified manufacturing factories</li>
                <li>Conduct supplier capability and background verification</li>
                <li>Negotiate pricing, MOQs, and production terms</li>
                <li>Coordinate product sampling and quotation comparison</li>
                <li>Assist in production planning and order confirmation</li>
                <li>Ensure direct factory communication without middlemen</li>
              </ul>
            </div>

            <div className="bg-orange-500 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-3 text-lg">Outcome:</h4>
              <ul className="space-y-1 text-sm md:text-base list-disc list-inside">
                <li>Stronger brand perception</li>
                <li>Higher product value and conversion potential</li>
                <li>Professional retail presentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}