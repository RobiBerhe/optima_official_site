"use client";

import { motion } from "framer-motion";
import { Handshake, Globe2, Building2, Briefcase } from "lucide-react";

const partners = [
  {
    name: "Dedebit Microfinance",
    description: "Collaborating on digital finance solutions to improve accessibility and financial inclusion in the region.",
    type: "Financial Institution",
    logoText: "DEDEBIT",
  },
  {
    name: "Tigray Regional Court",
    description: "Developing a comprehensive digital court management system to modernize the judicial process.",
    type: "Government Entity",
    logoText: "REGIONAL COURT",
  },
];

export default function Partners() {
  return (
    <div className="pt-24 pb-24">
      {/* Hero Section */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 bg-white/10 rounded-full mb-8"
          >
            <Handshake size={48} className="text-optima-green" />
          </motion.div>
          <h1 className="text-5xl font-extrabold mb-6">Our Partnerships</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe in the power of collaboration. By working together with regional and international partners, we create impactful technology that changes lives.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-navy transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="md:w-1/3 bg-gray-50 dark:bg-white/5 flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/10">
                <div className="text-2xl font-black text-navy/20 dark:text-white/10 tracking-tighter text-center">
                  {partner.logoText}
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <span className="text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-4 block">
                  {partner.type}
                </span>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{partner.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-24 bg-gray-50 dark:bg-white/5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy dark:text-white mb-6">Want to Partner with Us?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            We are always looking for organizations that share our passion for innovation and excellence. Let's explore how we can work together.
          </p>
          <button className="bg-navy dark:bg-gradient-to-r dark:from-optima-blue dark:to-optima-green text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all">
            Start a Conversation
          </button>
        </div>
      </section>
    </div>
  );
}
