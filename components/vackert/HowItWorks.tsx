"use client";

import { useRef } from "react";
import { MousePointerClick, Send, PhoneCall } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Reveal from "./Reveal";

const steps = [
  { title: "Choose your sector", description: "Pick the sector your business operates in.", icon: MousePointerClick },
  { title: "Send your information", description: "Tell us about your business and what you need.", icon: Send },
  { title: "We get in touch", description: "Our team reviews it and contacts you to discuss next steps.", icon: PhoneCall },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { desktop: "(min-width: 768px)", motion: MOTION_OK },
      (context) => {
        const { desktop, motion } = context.conditions!;
        if (!motion) return;

        // The line fills as you scroll and lights each step as it reaches it
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".steps", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        });
        tl.from(".steps-line", { [desktop ? "scaleX" : "scaleY"]: 0, ease: "none", duration: 1 });
        gsap.utils.toArray<HTMLElement>(".step-dot").forEach((dot, i) => {
          tl.to(dot, { backgroundColor: "#d4a017", color: "#0b2a1a", scale: 1.1, duration: 0.1 }, (i / (steps.length - 1)) * 0.95);
        });
      }
    );
  }, { scope: ref });

  return (
    <section id="how-it-works" ref={ref} className="relative py-20 sm:py-28 bg-forest text-white overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-grid [--grid-line:rgba(255,255,255,0.06)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal stagger={0.1} className="text-center mb-14 sm:mb-20">
          <span className="block text-gold font-bold text-sm uppercase tracking-widest">Process</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">How it works</h2>
        </Reveal>

        <div className="steps relative">
          {/* Track: vertical on mobile, horizontal from md up */}
          <div
            aria-hidden="true"
            className="absolute left-8 top-8 bottom-8 w-0.5 md:left-[16.67%] md:right-[16.67%] md:bottom-auto md:w-auto md:h-0.5 bg-white/15"
          >
            <div className="steps-line w-full h-full bg-gold origin-top md:origin-left" />
          </div>

          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative flex md:flex-col items-start md:items-center gap-6 md:text-center">
                <div className="step-dot relative z-10 w-16 h-16 shrink-0 rounded-full bg-forest-dark border-2 border-gold/50 text-gold flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <div className="pt-2 md:pt-0">
                  <span className="text-gold/80 text-sm font-bold">Step {index + 1}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{step.title}</h3>
                  <p className="text-white/70 max-w-xs">{step.description}</p>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
