"use client";

import { useEffect, useState } from "react";
import { saveQuoteRequest } from "../firebase";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function QuoteForm() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    if (!isSuccessOpen) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessOpen(false);
      setSubmitStatus(null);
      setSubmitMessage("");
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [isSuccessOpen]);

  const validateForm = (values) => {
    const nextErrors = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedPhone = values.phone.trim();
    const trimmedCompany = values.company.trim();
    const trimmedMessage = values.message.trim();

    if (!trimmedName) {
      nextErrors.name = "Name is required.";
    } else if (trimmedName.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 100) {
      nextErrors.name = "Name must not exceed 100 characters.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      nextErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Please provide a valid email address.";
    }

    if (trimmedPhone) {
      const phoneDigits = trimmedPhone.replace(/\D/g, "");
      if (phoneDigits.length < 7) {
        nextErrors.phone = "Please provide a valid phone number.";
      }
    }

    if (!trimmedCompany) {
      nextErrors.company = "Company name is required.";
    } else if (trimmedCompany.length < 2) {
      nextErrors.company = "Company name must be at least 2 characters.";
    } else if (trimmedCompany.length > 150) {
      nextErrors.company = "Company name must not exceed 150 characters.";
    }

    if (!trimmedMessage) {
      nextErrors.message = "Project details are required.";
    } else if (trimmedMessage.length < 10) {
      nextErrors.message = "Please provide at least 10 characters for project details.";
    } else if (trimmedMessage.length > 2000) {
      nextErrors.message = "Project details must not exceed 2000 characters.";
    }

    return nextErrors;
  };

  const updateFieldTouched = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    if (fieldErrors[name] || touchedFields[name]) {
      setFieldErrors(validateForm(nextFormData));
    }
  };

  const onFieldBlur = (event) => {
    const { name } = event.target;
    updateFieldTouched(name);
    setFieldErrors(validateForm(formData));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextTouched = {
      name: true,
      email: true,
      phone: true,
      company: true,
      message: true,
    };
    const nextErrors = validateForm(formData);

    setTouchedFields(nextTouched);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      await saveQuoteRequest({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        message: formData.message.trim(),
        status: "pending",
      });

      setSubmitStatus("success");
      setSubmitMessage("Quote submitted successfully. We will contact you soon.");
      setFormData(initialForm);
      setFieldErrors({});
      setTouchedFields({});
      setIsSuccessOpen(true);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Unable to submit right now. Please try again.");
      console.error("Quote form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:max-w-[900px]" onSubmit={onSubmit}>
      {submitStatus === "success" && (
        <div className="md:col-span-2 rounded-2xl border border-green-600/50 bg-green-900/25 p-4 text-sm text-green-200">
          {submitMessage}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="md:col-span-2 rounded-2xl border border-red-600/50 bg-red-900/25 p-4 text-sm text-red-200">
          {submitMessage}
        </div>
      )}

      <label className="space-y-2 text-sm text-white md:col-span-1">
        <span className="description-font text-xs uppercase tracking-[0.18em] text-zinc-300">
          Name
        </span>
        <input
          required
          name="name"
          type="text"
          value={formData.name}
          onChange={onInputChange}
          onBlur={onFieldBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(touchedFields.name && fieldErrors.name)}
          className={`description-font w-full rounded-2xl border bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-50 ${touchedFields.name && fieldErrors.name ? "border-red-500" : "border-zinc-600"}`}
          placeholder="Your full name"
        />
        {touchedFields.name && fieldErrors.name && (
          <p className="text-xs text-red-300">{fieldErrors.name}</p>
        )}
      </label>

      <label className="space-y-2 text-sm text-white md:col-span-1">
        <span className="description-font text-xs uppercase tracking-[0.18em] text-zinc-300">
          Email
        </span>
        <input
          required
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          onBlur={onFieldBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(touchedFields.email && fieldErrors.email)}
          className={`description-font w-full rounded-2xl border bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-50 ${touchedFields.email && fieldErrors.email ? "border-red-500" : "border-zinc-600"}`}
          placeholder="you@company.com"
        />
        {touchedFields.email && fieldErrors.email && (
          <p className="text-xs text-red-300">{fieldErrors.email}</p>
        )}
      </label>

      <label className="space-y-2 text-sm text-white md:col-span-1">
        <span className="description-font text-xs uppercase tracking-[0.18em] text-zinc-300">
          Phone
        </span>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          onBlur={onFieldBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(touchedFields.phone && fieldErrors.phone)}
          className={`description-font w-full rounded-2xl border bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-50 ${touchedFields.phone && fieldErrors.phone ? "border-red-500" : "border-zinc-600"}`}
          placeholder="+1 234 567 891"
        />
        {touchedFields.phone && fieldErrors.phone && (
          <p className="text-xs text-red-300">{fieldErrors.phone}</p>
        )}
      </label>

      <label className="space-y-2 text-sm text-white md:col-span-1">
        <span className="description-font text-xs uppercase tracking-[0.18em] text-zinc-300">
          Company
        </span>
        <input
          name="company"
          type="text"
          value={formData.company}
          onChange={onInputChange}
          onBlur={onFieldBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(touchedFields.company && fieldErrors.company)}
          className={`description-font w-full rounded-2xl border bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-50 ${touchedFields.company && fieldErrors.company ? "border-red-500" : "border-zinc-600"}`}
          placeholder="Company name"
        />
        {touchedFields.company && fieldErrors.company && (
          <p className="text-xs text-red-300">{fieldErrors.company}</p>
        )}
      </label>

      <label className="space-y-2 text-sm text-white md:col-span-2">
        <span className="description-font text-xs uppercase tracking-[0.18em] text-zinc-300">
          Project Details
        </span>
        <textarea
          required
          name="message"
          rows={4}
          value={formData.message}
          onChange={onInputChange}
          onBlur={onFieldBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(touchedFields.message && fieldErrors.message)}
          className={`description-font w-full resize-none rounded-2xl border bg-zinc-900/70 px-4 py-3 text-white outline-none transition focus:border-[var(--orange)] disabled:cursor-not-allowed disabled:opacity-50 ${touchedFields.message && fieldErrors.message ? "border-red-500" : "border-zinc-600"}`}
          placeholder="Tell us what products you need sourced."
        />
        {touchedFields.message && fieldErrors.message && (
          <p className="text-xs text-red-300">{fieldErrors.message}</p>
        )}
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="heading-font w-full rounded-2xl bg-[var(--orange)] px-5 py-3 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>

      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="morphism-surface-dark w-full max-w-md rounded-[28px] border border-[var(--morphism-white)]/20 p-6 text-white shadow-2xl md:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="heading-font text-2xl text-[var(--orange)] md:text-3xl">
                  Success
                </p>
                <p className="description-font mt-2 text-sm leading-relaxed text-zinc-200 md:text-base">
                  Your quote request was sent successfully. Our team will contact you soon.
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--orange)] text-xl font-bold text-white">
                ✓
              </div>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full origin-left animate-[shrink_2.8s_linear_forwards] rounded-full bg-[var(--orange)]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
