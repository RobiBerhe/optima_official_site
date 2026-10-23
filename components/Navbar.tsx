"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  // { name: "Partners", href: "/partners" },
  { name: "Vackert", href: "/vackert" },
  { name: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`relative w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-navy dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center ${className}`}
      aria-label="Toggle theme"
    >
      {/* Icons swap via the dark class, so no mount check is needed */}
      <Sun size={18} className="absolute transition-all duration-300 scale-0 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100" />
      <Moon size={18} className="absolute transition-all duration-300 scale-100 rotate-0 opacity-100 dark:scale-0 dark:-rotate-90 dark:opacity-0" />
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  // Close the mobile menu with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        solid
          ? "bg-white/80 dark:bg-navy/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Optima Technologies home">
            <Logo className={`transition-all duration-300 group-hover:scale-105 ${scrolled ? "w-12 h-12" : "w-14 h-14"}`} />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-tight text-navy dark:text-white">OPTIMA</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-optima-blue dark:text-optima-green">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-gray-100/70 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    active
                      ? "text-navy dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-navy dark:hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white dark:bg-white/10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 bg-gradient-to-r from-optima-blue to-optima-green text-white pl-5 pr-4 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-optima-blue/20 hover:shadow-lg hover:shadow-optima-blue/30 transition-all hover:-translate-y-0.5"
            >
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-navy dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-optima-blue to-optima-green transition-opacity ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                        active
                          ? "bg-optima-blue/10 text-optima-blue dark:bg-white/10 dark:text-optima-green"
                          : "text-navy dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-optima-blue to-optima-green text-white px-6 py-3.5 rounded-xl font-semibold"
                >
                  Get in Touch
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
