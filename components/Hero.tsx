"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ArrowRight, /* ChevronRight, */ Globe, Smartphone, Database, Network, Cloud, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const orbitNodes = [
  { label: "Web", icon: Globe },
  { label: "Mobile", icon: Smartphone },
  { label: "ERP", icon: Database },
  { label: "Network", icon: Network },
  { label: "Cloud", icon: Cloud },
  { label: "Security", icon: ShieldCheck },
];

// Node positions on a circle, as percentages of the visual's box
const RADIUS = 38;
const positions = orbitNodes.map((_, i) => {
  const angle = (i / orbitNodes.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
});

// Figures taken from the content on this site
const stats = [
  { value: 13, suffix: "+", label: "Projects Delivered" },
  { value: 9, suffix: "", label: "Industries Served" },
  { value: 12, suffix: "", label: "Services Offered" },
];

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { autoAlpha: 1 });
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-line", { yPercent: 110, duration: 0.9, stagger: 0.12 })
          .from(".hero-fade", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
          .from(".hero-visual", { scale: 0.85, autoAlpha: 0, duration: 1 }, 0.3)
          .from(".hero-cable", { drawSVG: 0, duration: 0.9, stagger: 0.08, ease: "power2.inOut" }, 0.8)
          .from(".hero-node", { scale: 0, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2.5)" }, 1.1);

        // Count the stats up
        gsap.utils.toArray<HTMLElement>(".hero-stat").forEach((el) => {
          const target = Number(el.dataset.value);
          const counter = { v: 0 };
          tl.to(counter, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => { el.textContent = String(Math.round(counter.v)); },
          }, 1);
        });

        // Ambient motion
        gsap.to(".hero-ring", { rotation: 360, duration: 60, ease: "none", repeat: -1, svgOrigin: "50 50" });
        gsap.to(".hero-ring-reverse", { rotation: -360, duration: 90, ease: "none", repeat: -1, svgOrigin: "50 50" });
        gsap.utils.toArray<HTMLElement>(".hero-node-inner").forEach((node, i) => {
          gsap.to(node, { y: i % 2 ? 6 : -6, duration: 2 + i * 0.25, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
        gsap.utils.toArray<SVGCircleElement>(".hero-packet").forEach((packet, i) => {
          const { x, y } = positions[i];
          gsap.fromTo(
            packet,
            { attr: { cx: 50, cy: 50 }, opacity: 0 },
            {
              keyframes: [
                { opacity: 1, duration: 0.2 },
                { attr: { cx: x, cy: y }, duration: 1.6, ease: "power1.inOut" },
                { opacity: 0, duration: 0.2 },
              ],
              delay: 1.6 + i * 0.3,
              repeat: -1,
              repeatDelay: 0.8,
            }
          );
        });
        gsap.to(".hero-core-ring", { scale: 1.6, opacity: 0, duration: 2, ease: "power1.out", repeat: -1, transformOrigin: "50% 50%" });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="invisible relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden dark:bg-navy transition-colors duration-300"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(4_30_66/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(4_30_66/0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-optima-blue rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-optima-green rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-10 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            {/* Badge - Hidden for now
            <Link
              href="/services"
              className="hero-badge inline-flex items-center gap-2 bg-optima-blue/10 text-optima-blue dark:text-optima-green pl-2 pr-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-optima-blue/20 hover:bg-optima-blue/15 transition-colors"
            >
              <span className="bg-optima-blue dark:bg-optima-green text-white dark:text-navy text-xs px-2 py-0.5 rounded-full">New</span>
              <span>Network & Installation Services</span>
              <ChevronRight size={16} />
            </Link> */}

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy dark:text-white leading-[1.1] tracking-tight mb-6">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">Transforming Ideas</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-line block">
                  Into{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-optima-blue via-optima-blue to-optima-green">
                    Digital Excellence
                  </span>
                </span>
              </span>
            </h1>

            <p className="hero-fade max-w-xl mx-auto lg:mx-0 text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              We build state-of-the-art software and the infrastructure it runs on. From healthcare systems to e-commerce platforms and enterprise networks, we deliver excellence.
            </p>

            <div className="hero-fade flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-gradient-to-r from-optima-blue to-optima-green text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-optima-blue/25 hover:shadow-xl hover:shadow-optima-blue/30 hover:-translate-y-0.5 transition-all flex items-center justify-center group"
              >
                Explore Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto bg-white/80 dark:bg-white/10 backdrop-blur text-navy dark:text-white border-2 border-gray-100 dark:border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:border-optima-blue transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-fade mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white">
                    <span className="hero-stat" data-value={stat.value}>{stat.value}</span>
                    <span className="text-optima-green">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Network visual */}
          <div className="hero-visual relative w-full max-w-[520px] aspect-square mx-auto" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
              <defs>
                <linearGradient id="heroCableGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--optima-blue)" />
                  <stop offset="100%" stopColor="var(--optima-green)" />
                </linearGradient>
              </defs>

              {/* Orbits */}
              <circle cx={50} cy={50} r={RADIUS} fill="none" strokeWidth={0.3} strokeDasharray="1 2" className="hero-ring stroke-optima-blue/40" />
              <circle cx={50} cy={50} r={RADIUS - 14} fill="none" strokeWidth={0.25} strokeDasharray="0.5 1.5" className="hero-ring-reverse stroke-optima-green/40" />
              <circle cx={50} cy={50} r={RADIUS + 8} fill="none" strokeWidth={0.2} className="stroke-gray-200 dark:stroke-white/10" />

              {/* Cables from the core to each service */}
              {positions.map(({ x, y }, i) => (
                <line
                  key={`cable-${i}`}
                  x1={50} y1={50} x2={x} y2={y}
                  stroke="url(#heroCableGrad)"
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  className="hero-cable opacity-50"
                />
              ))}

              {/* Data packets */}
              {positions.map((_, i) => (
                <circle
                  key={`packet-${i}`}
                  cx={50} cy={50} r={1}
                  className={`hero-packet opacity-0 ${i % 2 ? "fill-optima-green" : "fill-optima-blue"}`}
                />
              ))}

              <circle cx={50} cy={50} r={11} fill="none" strokeWidth={0.4} className="hero-core-ring stroke-optima-blue/50" />
            </svg>

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%] aspect-square rounded-3xl bg-white dark:bg-white shadow-2xl shadow-optima-blue/20 flex items-center justify-center ring-1 ring-gray-100">
              <Logo className="w-[85%] h-[85%]" />
            </div>

            {/* Service nodes */}
            {orbitNodes.map(({ label, icon: Icon }, i) => (
              <div
                key={label}
                className="hero-node absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
              >
                <div className="hero-node-inner flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-navy border border-gray-100 dark:border-white/10 shadow-lg flex items-center justify-center">
                    <span className="w-full h-full rounded-2xl bg-gradient-to-br from-optima-blue/10 to-optima-green/10 flex items-center justify-center text-optima-blue dark:text-optima-green">
                      <Icon size={22} />
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
