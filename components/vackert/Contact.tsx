"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sectors, site } from "@/lib/vackert";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useSector } from "./SectorContext";
import Reveal from "./Reveal";

type FormData = {
  name: string;
  email: string;
  phone: string;
  sector: string;
  message: string;
};

const inputClass = (hasError: boolean) =>
  `w-full px-5 py-4 bg-cream dark:bg-white/5 border ${hasError ? "border-red-500" : "border-forest/10 dark:border-white/10"} rounded-2xl text-forest-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all`;

const labelClass = "block text-sm font-bold text-forest-dark dark:text-white mb-2";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { selection } = useSector();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { sector: "" } });

  // Picking a sector brings the form back if the success message is showing
  const [prevSelection, setPrevSelection] = useState(selection);
  if (selection !== prevSelection) {
    setPrevSelection(selection);
    setSubmitted(false);
  }

  useEffect(() => {
    if (selection) setValue("sector", selection.sector, { shouldValidate: true });
  }, [selection, setValue]);

  useGSAP(() => {
    if (!submitted) return;
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.timeline()
        .from(".success-icon", { scale: 0, rotation: -90, duration: 0.7, ease: "back.out(2)" })
        .from(".success-text > *", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.3");
    });
  }, { scope: ref, dependencies: [submitted] });

  // Briefly flash the sector field when a card pre-fills it
  useGSAP(() => {
    if (!selection) return;
    gsap.fromTo("#sector", { boxShadow: "0 0 0 4px rgba(212,160,23,0.6)" }, { boxShadow: "0 0 0 0px rgba(212,160,23,0)", duration: 1.4, delay: 0.5 });
  }, { scope: ref, dependencies: [selection] });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Vackert" }),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send information");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Info */}
        <Reveal stagger={0.12} className="lg:col-span-2 space-y-10">
          <div>
            <span className="text-forest dark:text-gold font-bold text-sm uppercase tracking-widest">Get Started</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-extrabold text-forest-dark dark:text-white mt-4 mb-4">Send Us Your Information</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Share a few details about your business and what you need. We&apos;ll review it and contact you.
            </p>
          </div>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="w-12 h-12 shrink-0 rounded-xl bg-forest text-gold flex items-center justify-center"><Mail size={22} /></span>
              <div>
                <h4 className="font-bold text-forest-dark dark:text-white">Email</h4>
                <a href={`mailto:${site.email}`} className="text-gray-600 dark:text-gray-400 hover:text-forest dark:hover:text-gold break-all">{site.email}</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-12 h-12 shrink-0 rounded-xl bg-forest text-gold flex items-center justify-center"><Phone size={22} /></span>
              <div>
                <h4 className="font-bold text-forest-dark dark:text-white">Phone</h4>
                {site.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="block text-gray-600 dark:text-gray-400 hover:text-forest dark:hover:text-gold">{phone.label}</a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-12 h-12 shrink-0 rounded-xl bg-forest text-gold flex items-center justify-center"><MapPin size={22} /></span>
              <div>
                <h4 className="font-bold text-forest-dark dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">{site.location}</p>
              </div>
            </li>
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal y={60} className="lg:col-span-3 bg-white dark:bg-white/5 p-6 sm:p-8 md:p-10 rounded-3xl border border-forest/10 dark:border-white/10 shadow-xl shadow-forest/5 dark:shadow-none">
          {submitted ? (
            <div className="text-center py-12 sm:py-16">
              <div className="success-icon w-20 h-20 bg-forest/10 dark:bg-gold/10 text-forest dark:text-gold rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <div className="success-text">
              <h3 className="text-2xl sm:text-3xl font-bold text-forest-dark dark:text-white mb-4">Information Received!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Thank you. Our team will get back to you shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-forest text-white px-8 py-3 rounded-xl font-bold hover:bg-forest-dark transition-colors"
              >
                Send more information
              </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>Full Name / Company</label>
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={inputClass(!!errors.name)}
                    placeholder="Your name or company"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className={inputClass(false)}
                    placeholder="+251 9xx xxx xxx"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email Address</label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={inputClass(!!errors.email)}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="sector" className={labelClass}>Business Sector</label>
                <select
                  id="sector"
                  {...register("sector", { required: "Please choose a sector" })}
                  className={inputClass(!!errors.sector)}
                >
                  <option value="" disabled>Select your sector</option>
                  {sectors.map((sector) => (
                    <option key={sector.title} value={sector.title} className="text-forest-dark">
                      {sector.title}
                    </option>
                  ))}
                </select>
                {errors.sector && <p className="mt-1 text-sm text-red-500">{errors.sector.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>Business Information</label>
                <textarea
                  id="message"
                  {...register("message", { required: "Please tell us about your business" })}
                  rows={6}
                  className={`${inputClass(!!errors.message)} resize-none`}
                  placeholder="Tell us about your business and what you need"
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-forest-dark py-5 rounded-2xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Information</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
