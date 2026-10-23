"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Database, 
  Code2, 
  Cloud, 
  Settings2,
  Cpu,
  Layers,
  Network,
  Cable,
  Wifi,
  Server,
  Cctv,
  MonitorCog
} from "lucide-react";
import CableNetwork from "@/components/CableNetwork";

const services = [
  {
    title: "Web Development",
    description: "We build high-performance, responsive websites and web applications using modern frameworks like Next.js, React, and Vue. Our focus is on user experience, speed, and SEO.",
    icon: Globe,
    color: "bg-blue-500",
  },
  {
    title: "Mobile App Development",
    description: "Our mobile solutions bring your ideas to life on both iOS and Android. We specialize in native and cross-platform development (Flutter, React Native) for seamless performance.",
    icon: Smartphone,
    color: "bg-green-500",
  },
  {
    title: "ERP Systems",
    description: "Streamline your business operations with our custom Enterprise Resource Planning systems. We integrate finance, HR, inventory, and sales into a single, cohesive platform.",
    icon: Database,
    color: "bg-purple-500",
  },
  {
    title: "Custom Software Development",
    description: "Every business is unique. We develop tailored software solutions that address your specific challenges and requirements, ensuring maximum efficiency.",
    icon: Code2,
    color: "bg-red-500",
  },
  {
    title: "Cloud Solutions",
    description: "Leverage the power of the cloud with our architecture and migration services. We help you scale securely using AWS, Azure, or Google Cloud Platform.",
    icon: Cloud,
    color: "bg-cyan-500",
  },
  {
    title: "System Integration",
    description: "We help your existing systems talk to each other. Our integration services ensure smooth data flow across your entire technology stack.",
    icon: Settings2,
    color: "bg-orange-500",
  },
];

const networkServices = [
  {
    title: "Network Design & Setup",
    description: "We plan and configure LAN/WAN networks, routers, switches and firewalls to give your organization fast, reliable and secure connectivity.",
    icon: Network,
  },
  {
    title: "Structured Cabling",
    description: "Clean, standards-compliant copper and fiber cabling for offices, campuses and data rooms, fully labeled, tested and documented.",
    icon: Cable,
  },
  {
    title: "Wi-Fi Solutions",
    description: "Enterprise wireless coverage designed from site surveys, with optimal access point placement, guest networks and centralized management.",
    icon: Wifi,
  },
  {
    title: "Server Installation",
    description: "Server racking, operating system setup, virtualization and ongoing maintenance for dependable on-premise infrastructure.",
    icon: Server,
  },
  {
    title: "CCTV & Security Systems",
    description: "IP camera installation, remote video monitoring and access control systems to keep your premises safe around the clock.",
    icon: Cctv,
  },
  {
    title: "Software Installation",
    description: "Deployment and configuration of operating systems, business applications, licensing and updates across all your workstations.",
    icon: MonitorCog,
  },
];

export default function Services() {
  return (
    <div className="pt-24 pb-24">
      {/* Header */}
      <section className="py-20 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-navy dark:text-white mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Comprehensive technology solutions designed to scale your business and drive digital transformation.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 dark:bg-navy transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-optima-blue transition-all hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-navy dark:bg-optima-blue text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:bg-optima-blue transition-all duration-300">
                <service.icon size={32} />
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-6 group-hover:text-optima-blue transition-colors">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Network & Installation */}
      <section className="relative py-24 bg-gray-50 dark:bg-white/5 border-y border-gray-100 dark:border-white/5 transition-colors duration-300 overflow-hidden">
        <CableNetwork className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-4">
              IT Infrastructure
            </span>
            <h2 className="text-4xl font-extrabold text-navy dark:text-white mb-4">Network & Installation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We design, install and maintain the physical and network infrastructure your systems run on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {networkServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 hover:border-optima-blue transition-all hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-navy dark:bg-optima-blue text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:bg-optima-blue transition-all duration-300">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-6 group-hover:text-optima-blue transition-colors">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-navy text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">How we turn your vision into a production-ready solution.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals and requirements." },
              { step: "02", title: "Design", desc: "Creating intuitive and beautiful interfaces." },
              { step: "03", title: "Development", desc: "Building robust and scalable software." },
              { step: "04", title: "Deployment", desc: "Launching and maintaining your solution." },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-black text-white/5 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-optima-green">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
