"use client";

import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Zap, Users, Globe2 } from "lucide-react";

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries to find better, faster, and more efficient solutions.",
    icon: Zap,
  },
  {
    title: "Integrity",
    description: "We build trust through transparency, honesty, and ethical practices in everything we do.",
    icon: ShieldCheck,
  },
  {
    title: "Collaboration",
    description: "We work closely with our clients and partners to ensure mutual success.",
    icon: Users,
  },
  {
    title: "Global Vision",
    description: "We design solutions with a global perspective while addressing local needs.",
    icon: Globe2,
  },
];

export default function About() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-navy py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-optima-blue via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-extrabold mb-6">About Optima Technologies</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are a team of dedicated technologists, designers, and strategists passionate about solving complex problems through elegant digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-optima-blue/10 rounded-2xl flex items-center justify-center text-optima-blue shrink-0">
                  <Target size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy dark:text-white mb-3">Our Mission</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To empower businesses and communities by providing cutting-edge, reliable, and accessible technology solutions that drive growth and digital transformation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-optima-green/10 rounded-2xl flex items-center justify-center text-optima-green shrink-0">
                  <Eye size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy dark:text-white mb-3">Our Vision</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To be a global leader in digital innovation, recognized for our commitment to excellence, integrity, and the positive impact we create through technology.
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-optima-blue/20 to-optima-green/20 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5">
                {/* Placeholder for an image */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-navy dark:text-white mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide our work, our interactions, and our commitment to our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-white/10 p-8 rounded-2xl border border-gray-100 dark:border-white/10 text-center shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-navy dark:bg-optima-blue text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
