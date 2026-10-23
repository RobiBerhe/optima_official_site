"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, ArrowRight, Handshake } from "lucide-react";

const partners = [
  {
    name: "Tigray Regional Court",
    type: "Government Entity",
    description: "Developing a comprehensive digital court management system to modernize the judicial process.",
    project: { label: "Digital Court System", href: "/projects" },
    icon: Scale,
  },
];

export default function Partners() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-4">
              <Handshake size={18} />
              Partnerships
            </span>
            <h2 className="text-3xl font-extrabold text-navy dark:text-white mb-4">Trusted by Institutions That Serve the Public</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We work alongside our partners to build technology that makes public services faster, more transparent and easier to access.
            </p>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            {partners.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group relative overflow-hidden flex flex-col sm:flex-row bg-white dark:bg-navy rounded-3xl border border-gray-100 dark:border-white/10 hover:border-optima-blue/30 hover:shadow-2xl hover:shadow-optima-blue/10 transition-[border-color,box-shadow]"
                >
                  {/* Emblem panel */}
                  <div className="relative sm:w-2/5 flex items-center justify-center p-10 sm:p-12 bg-gradient-to-br from-navy to-optima-blue text-white overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-optima-green/30 blur-3xl" />
                    <div className="relative flex flex-col items-center text-center gap-4">
                      <span className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon size={40} />
                      </span>
                      <span className="text-sm font-extrabold uppercase tracking-[0.3em] text-white/80">Tigray Court</span>
                    </div>
                  </div>

                  <div className="sm:w-3/5 p-8 sm:p-10 flex flex-col justify-center">
                    <span className="text-optima-blue dark:text-optima-green font-bold text-xs uppercase tracking-widest mb-3">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold text-navy dark:text-white mb-3">{partner.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{partner.description}</p>
                    <Link
                      href={partner.project.href}
                      className="inline-flex items-center gap-2 font-bold text-navy dark:text-white hover:text-optima-blue dark:hover:text-optima-green transition-colors"
                    >
                      Project: {partner.project.label}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
