"use client";

import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function QuoteButtonModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsOpen(false);
    setFormData(initialForm);
  };

  return (
    <>
      <div className="mt-8 flex justify-center md:mt-10">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full max-w-[600px] rounded-full border border-[#cfd5df] bg-gradient-to-b from-[#737983] via-[#343940] to-[#1a1d21] px-8 py-3 text-left font-[Sora] text-[1.15rem] font-extrabold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition duration-300 hover:scale-[1.015] md:py-3 md:text-[1.95rem]"
        >
          <span className="flex items-center justify-between gap-4">
            <span className="leading-[1.02]">
              Get Free
              <br />
              Sourcing Quotation
            </span>
            <span className="shrink-0 text-3xl md:text-4xl">↗</span>
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto bg-black/60 opacity-100"
            : "pointer-events-none bg-black/0 opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`w-full max-w-2xl rounded-3xl border border-zinc-600 bg-[#0f1114] p-6 text-white shadow-2xl transition-all duration-300 md:p-8 ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
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
              onClick={() => setIsOpen(false)}
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
    </>
  );
}