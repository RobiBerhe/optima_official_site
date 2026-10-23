"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ChevronLeft, ChevronRight, Globe, Database, Smartphone } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Developer {
  name: string;
  role: string;
  skills: string[];
  initials: string;
  gradient: string;
  roleIcon: LucideIcon;
  bio: string;
  social: { github: string; linkedin: string };
}

const developers: Developer[] = [
  {
    name: "Miruts Mebrahtu",
    role: "Frontend Developer",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    initials: "MM",
    gradient: "from-optima-blue to-cyan-500",
    roleIcon: Globe,
    bio: "Crafting pixel-perfect, high-performance user interfaces that deliver exceptional digital experiences.",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "Robel Berhe",
    role: "Backend Developer",
    skills: ["Node.js", "Go", "PostgreSQL", "REST APIs"],
    initials: "RB",
    gradient: "from-optima-green to-teal-500",
    roleIcon: Database,
    bio: "Building robust, scalable server-side architectures that power enterprise-grade solutions.",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "Yared Tekelehaymanot",
    role: "Mobile Developer",
    skills: ["Flutter", "React Native", "Firebase", "iOS & Android"],
    initials: "YT",
    gradient: "from-purple-500 to-optima-blue",
    roleIcon: Smartphone,
    bio: "Developing cross-platform mobile apps with native-level performance and beautiful UX.",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "TBD",
    role: "Senior Frontend Developer",
    skills: ["React", "Next.js", "TypeScript", "System Design"],
    initials: "SF",
    gradient: "from-sky-500 to-optima-blue",
    roleIcon: Globe,
    bio: "Leading frontend architecture decisions and mentoring the team to deliver world-class web experiences.",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "TBD",
    role: "Senior Backend Developer",
    skills: ["Go", "Microservices", "PostgreSQL", "AWS"],
    initials: "SB",
    gradient: "from-emerald-500 to-optima-green",
    roleIcon: Database,
    bio: "Designing resilient distributed systems and high-throughput APIs that scale to millions of users.",
    social: { github: "#", linkedin: "#" },
  },
  {
    name: "TBD",
    role: "Senior Mobile Developer",
    skills: ["Flutter", "Swift", "Kotlin", "CI/CD"],
    initials: "SM",
    gradient: "from-violet-500 to-purple-700",
    roleIcon: Smartphone,
    bio: "Architecting polished, performant mobile applications with deep platform expertise on iOS and Android.",
    social: { github: "#", linkedin: "#" },
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function DeveloperSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      const newIndex = (next + developers.length) % developers.length;
      setDirection(next > index || (index === developers.length - 1 && next === 0) ? 1 : -1);
      setIndex(newIndex);
    },
    [index]
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % developers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const dev = developers[index];
  const RoleIcon = dev.roleIcon;

  return (
    <section className="py-24 dark:bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-4"
          >
            The People Behind the Code
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-navy dark:text-white"
          >
            Meet Our Developers
          </motion.h2>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]"
              >
                {/* Left — Avatar Panel */}
                <div className={`relative bg-gradient-to-br ${dev.gradient} flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-0`}>
                  <div className="absolute w-72 h-72 rounded-full bg-white/10 -top-20 -left-20" />
                  <div className="absolute w-48 h-48 rounded-full bg-white/10 bottom-4 right-4" />
                  <div className="absolute w-24 h-24 rounded-full bg-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <span className="text-5xl font-black text-white select-none">{dev.initials}</span>
                    </div>
                  </div>

                  {/* Role badge */}
                  <div className="absolute bottom-6 left-6 z-10 flex items-center space-x-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                    <RoleIcon size={16} />
                    <span>{dev.role}</span>
                  </div>
                </div>

                {/* Right — Info Panel */}
                <div className="bg-white dark:bg-white/5 border-t border-r border-b border-gray-100 dark:border-white/10 p-10 lg:p-14 flex flex-col justify-center rounded-r-3xl">
                  <div className="mb-8">
                    <p className="text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-2">
                      {dev.role}
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-extrabold text-navy dark:text-white mb-4">
                      {dev.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                      {dev.bio}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {dev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-1.5 bg-gray-50 dark:bg-white/10 text-navy dark:text-gray-200 rounded-full text-sm font-medium border border-gray-100 dark:border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social */}
                  <div className="flex items-center space-x-3">
                    <a
                      href={dev.social.github}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-navy dark:bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-optima-blue transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={dev.social.linkedin}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-gray-50 dark:bg-white/10 text-navy dark:text-white border border-gray-100 dark:border-white/10 rounded-full text-sm font-semibold hover:border-optima-blue transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next Arrows */}
          <button
            onClick={() => go(index - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white dark:bg-white/10 backdrop-blur-sm border border-gray-100 dark:border-white/20 rounded-full flex items-center justify-center text-navy dark:text-white hover:bg-optima-blue hover:text-white hover:border-optima-blue transition-all shadow-lg"
            aria-label="Previous developer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(index + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white dark:bg-white/10 backdrop-blur-sm border border-gray-100 dark:border-white/20 rounded-full flex items-center justify-center text-navy dark:text-white hover:bg-optima-blue hover:text-white hover:border-optima-blue transition-all shadow-lg"
            aria-label="Next developer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots + Progress */}
        <div className="flex items-center justify-center space-x-3 mt-10">
          {developers.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to developer ${i + 1}`}
              className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                i === index ? "w-10 bg-gray-200 dark:bg-white/20" : "w-2 bg-gray-300 dark:bg-white/20"
              }`}
            >
              {i === index && !paused && (
                <motion.span
                  key={index}
                  className="absolute inset-y-0 left-0 bg-optima-blue dark:bg-optima-green rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
