"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

// Cables run from devices at the edges into a central switch
const cables = [
  "M40,90 C260,90 320,300 600,300",
  "M40,510 C260,510 320,300 600,300",
  "M40,300 H600",
  "M600,300 C880,300 940,70 1160,70",
  "M600,300 C880,300 940,530 1160,530",
  "M600,300 V40 Q600,20 620,20 H900",
  "M600,300 V560 Q600,580 580,580 H300",
];

const nodes = [
  [40, 90], [40, 510], [40, 300],
  [1160, 70], [1160, 530], [900, 20], [300, 580],
];

export default function CableNetwork({ className = "" }: { className?: string }) {
  const container = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        });

        // Draw the cables in, then light up the nodes
        tl.from(".cable-active", {
          drawSVG: 0,
          duration: 1.6,
          ease: "power2.inOut",
          stagger: 0.12,
        })
          .from(".cable-node", {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.4,
            ease: "back.out(3)",
            stagger: 0.05,
          }, "-=0.6")
          .from(".cable-hub", {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.6,
            ease: "back.out(2)",
          }, "-=0.4");

        // Data packets travelling along each cable, alternating direction
        gsap.utils.toArray<SVGCircleElement>(".cable-packet").forEach((packet, i) => {
          const reverse = i % 2 === 1;
          tl.fromTo(packet, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.6);
          gsap.to(packet, {
            motionPath: {
              path: `#cable-path-${i}`,
              align: `#cable-path-${i}`,
              alignOrigin: [0.5, 0.5],
              start: reverse ? 1 : 0,
              end: reverse ? 0 : 1,
            },
            duration: gsap.utils.random(2.2, 3.6),
            delay: i * 0.35,
            ease: "none",
            repeat: -1,
          });
        });

        // Gentle pulse on the central switch
        gsap.to(".cable-hub-ring", {
          scale: 1.8,
          opacity: 0,
          transformOrigin: "50% 50%",
          duration: 1.8,
          ease: "power1.out",
          repeat: -1,
        });
      });
    },
    { scope: container }
  );

  return (
    <svg
      ref={container}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--optima-blue)" />
          <stop offset="100%" stopColor="var(--optima-green)" />
        </linearGradient>
        <filter id="cableGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base cables */}
      {cables.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          fill="none"
          strokeWidth={6}
          strokeLinecap="round"
          className="stroke-gray-200/70 dark:stroke-white/5"
        />
      ))}

      {/* Active (coloured) cables — these get drawn in */}
      {cables.map((d, i) => (
        <path
          key={`active-${i}`}
          id={`cable-path-${i}`}
          d={d}
          fill="none"
          stroke="url(#cableGrad)"
          strokeWidth={2}
          strokeLinecap="round"
          className="cable-active opacity-40 dark:opacity-50"
        />
      ))}

      {/* Data packets */}
      {cables.map((_, i) => (
        <circle
          key={`packet-${i}`}
          r={5}
          className={`cable-packet opacity-0 ${i % 2 ? "fill-optima-green" : "fill-optima-blue"}`}
          filter="url(#cableGlow)"
        />
      ))}

      {/* End devices */}
      {nodes.map(([cx, cy], i) => (
        <g key={`node-${i}`} className="cable-node">
          <circle cx={cx} cy={cy} r={10} className="fill-white dark:fill-navy stroke-optima-blue/50" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={4} className="fill-optima-blue" />
        </g>
      ))}

      {/* Central switch */}
      <circle cx={600} cy={300} r={22} className="cable-hub-ring fill-none stroke-optima-green/60" strokeWidth={2} />
      <g className="cable-hub">
        <rect x={576} y={286} width={48} height={28} rx={6} className="fill-white dark:fill-navy stroke-optima-blue/60" strokeWidth={2} />
        {[588, 600, 612].map((x) => (
          <circle key={x} cx={x} cy={300} r={3} className="fill-optima-green" />
        ))}
      </g>
    </svg>
  );
}
