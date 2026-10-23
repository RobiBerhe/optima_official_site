"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  // Animate each direct child in turn instead of the wrapper as a whole
  stagger?: number;
  y?: number;
  delay?: number;
};

export default function Reveal({ children, className, stagger, y = 40, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const el = ref.current!;
      gsap.fromTo(stagger ? el.children : el, { y, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, { scope: ref });

  return <div ref={ref} className={className}>{children}</div>;
}
