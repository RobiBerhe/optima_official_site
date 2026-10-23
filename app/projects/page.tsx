"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

const projects = [
  {
    title: "Healthcare System",
    category: "Healthcare",
    description: "A complete hospital management system with patient records, billing, and pharmacy integration.",
    features: ["Patient Management", "Electronic Health Records", "Billing & Insurance", "Pharmacy Inventory"],
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Digital Court System",
    category: "Government",
    description: "An end-to-end judicial platform for case filing, scheduling, and digital evidence management.",
    features: ["Online Case Filing", "Automated Scheduling", "Evidence Storage", "Virtual Court Integration"],
    tech: ["React", "Go", "MongoDB"],
  },
  {
    title: "SACCO System",
    category: "Finance",
    description: "Comprehensive management software for Savings and Credit Cooperative Organizations.",
    features: ["Member Management", "Loan Processing", "Savings Tracking", "Financial Reporting"],
    tech: ["Next.js", "NestJS", "MySQL"],
  },
  {
    title: "Bank System",
    category: "Finance",
    description: "Core banking solution designed for modern financial institutions with high security and reliability.",
    features: ["Transaction Processing", "Account Management", "Mobile Banking API", "Security Auditing"],
    tech: ["Java Spring Boot", "Angular", "Oracle"],
  },
  {
    title: "Digital Lottery System",
    category: "Entertainment",
    description: "A secure and transparent digital lottery platform with real-time draw and winner management.",
    features: ["Ticket Generation", "Secure Payments", "Random Number Generation", "Winner Notifications"],
    tech: ["Next.js", "Solidity", "Tailwind"],
  },
  {
    title: "Digital Equb",
    category: "Finance",
    description: "A digital platform for traditional Equb savings groups with automated contributions, fair rotation draws and secure payouts.",
    features: ["Group Management", "Automated Contributions", "Transparent Rotation Draws", "Mobile Money Payouts"],
    tech: ["Flutter", "Node.js", "PostgreSQL"],
  },
  {
    title: "Bus Ticketing System",
    category: "Transportation",
    description: "Online bus booking and fleet management system for intercity and city bus operators.",
    features: ["Online Seat Booking", "Route & Schedule Management", "Mobile Payments", "QR Ticket Validation"],
    tech: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Betting Game",
    category: "Gaming",
    description: "Real-time sports betting platform with live odds, secure digital wallets and responsible gaming controls.",
    features: ["Live Odds Updates", "Secure Wallet & Payments", "Bet History & Slips", "Responsible Gaming Limits"],
    tech: ["React", "Go", "Redis"],
  },
  {
    title: "Bingo Game",
    category: "Gaming",
    description: "Interactive multiplayer bingo game with live number calling, automatic card verification and instant prizes.",
    features: ["Live Number Calling", "Automatic Card Checking", "Multiplayer Rooms", "Instant Prize Payouts"],
    tech: ["Flutter", "Node.js", "Socket.io"],
  },
  {
    title: "E-commerce Platform",
    category: "Retail",
    description: "Scalable e-commerce solution with multi-vendor support and advanced analytics.",
    features: ["Multi-vendor Support", "Inventory Tracking", "Payment Gateway Integration", "Sales Analytics"],
    tech: ["Next.js", "Shopify API", "Firebase"],
  },
  {
    title: "Delivery System",
    category: "Logistics",
    description: "Real-time delivery tracking and management system for logistics companies.",
    features: ["Real-time Tracking", "Route Optimization", "Driver App", "Customer Notifications"],
    tech: ["React Native", "Node.js", "Google Maps API"],
  },
  {
    title: "Ride System",
    category: "Transportation",
    description: "Ride-hailing platform with advanced matching algorithms and driver management.",
    features: ["Real-time Matching", "Dynamic Pricing", "In-app Chat", "Rating System"],
    tech: ["Flutter", "Node.js", "Socket.io"],
  },
  {
    title: "Inventory + AI",
    category: "Enterprise",
    description: "Smart inventory management system powered by AI for predictive restocking and demand forecasting.",
    features: ["Predictive Analytics", "Automated Restocking", "Visual Search", "Smart Categorization"],
    tech: ["Next.js", "Python", "TensorFlow"],
  },
];

function CaseStudyButton({ title }: { title: string }) {
  const [comingSoon, setComingSoon] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = () => {
    setComingSoon(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setComingSoon(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`View ${title} case study`}
      className="w-full py-4 bg-gradient-to-r from-optima-blue to-optima-green text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={comingSoon ? "soon" : "view"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center justify-center gap-2"
        >
          {comingSoon ? (
            <>
              <Clock size={18} />
              Case Study Coming Soon
            </>
          ) : (
            "View Case Study"
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {comingSoon ? "Case study coming soon" : ""}
      </span>
    </button>
  );
}

export default function Projects() {
  return (
    <div className="pt-24 pb-24">
      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-navy dark:text-white mb-6"
          >
            Our Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Explore the diverse range of digital solutions we have developed to solve real-world challenges.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all group"
            >
              <div className="p-8">
                <span className="text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-wider mb-4 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">{project.description}</p>
                
                <div className="space-y-4 mb-10">
                  {project.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle2 size={16} className="text-optima-green mr-3 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <CaseStudyButton title={project.title} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
