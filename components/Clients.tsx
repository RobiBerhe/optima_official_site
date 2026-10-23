"use client";

import { motion } from "framer-motion";
import { Scale, Gamepad2 } from "lucide-react";

// Add new clients here; each shows as a wordmark in the "Trusted by" strip
const clients = [
  { name: "Tigray Court System", sector: "Government", icon: Scale },
  { name: "Saphi Games", sector: "Gaming", icon: Gamepad2 },
];

export default function Clients() {
  return (
    <section aria-labelledby="clients-heading" className="py-12 border-y border-gray-100 dark:border-white/10 dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <h2
          id="clients-heading"
          className="shrink-0 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 text-center md:text-left"
        >
          Trusted by
        </h2>
        <span aria-hidden="true" className="hidden md:block h-10 w-px bg-gray-200 dark:bg-white/10" />
        <ul className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
          {clients.map((client, index) => {
            const Icon = client.icon;
            return (
              <motion.li
                key={client.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-optima-blue/30 transition-colors"
              >
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-optima-blue to-optima-green text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon size={22} />
                </span>
                <span>
                  <span className="block font-extrabold text-navy dark:text-white leading-tight">{client.name}</span>
                  <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400">{client.sector}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
