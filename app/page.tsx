"use client";

import Hero from "@/components/Hero";
import { ServiceCard, ProjectCard } from "@/components/Cards";
import { Globe, Database, Smartphone, Gamepad2, Network, Wifi, Server, Cctv, Cable, MonitorCog, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
// import DeveloperSlider from "@/components/DeveloperSlider";
import CableNetwork from "@/components/CableNetwork";
import Clients from "@/components/Clients";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites built with the latest technologies to ensure performance and scalability.",
    icon: Globe,
  },
  {
    title: "Mobile App Development",
    description: "High-performance iOS and Android applications that deliver exceptional user experiences.",
    icon: Smartphone,
  },
  {
    title: "ERP Systems",
    description: "Custom Enterprise Resource Planning solutions to streamline your business operations.",
    icon: Database,
  },
  {
    title: "Game Development",
    description: "Engaging web and mobile games, from real-time multiplayer to betting and bingo platforms, built for performance and fair play.",
    icon: Gamepad2,
  },
];

const networkServices = [
  {
    title: "Network Design & Setup",
    description: "LAN/WAN planning, routing and switching configured for reliable, secure connectivity.",
    icon: Network,
  },
  {
    title: "Structured Cabling",
    description: "Clean, standards-compliant copper and fiber cabling for offices and data rooms.",
    icon: Cable,
  },
  {
    title: "Wi-Fi Solutions",
    description: "Enterprise wireless coverage with access point placement and site surveys.",
    icon: Wifi,
  },
  {
    title: "Server Installation",
    description: "Server racking, configuration and maintenance for on-premise infrastructure.",
    icon: Server,
  },
  {
    title: "CCTV & Security Systems",
    description: "IP camera installation, remote monitoring and access control systems.",
    icon: Cctv,
  },
  {
    title: "Software Installation",
    description: "Deployment and configuration of operating systems, business software and updates.",
    icon: MonitorCog,
  },
];

const featuredProjects = [
  {
    title: "Digital Court System",
    category: "Government",
    description: "A comprehensive digital solution for judicial process management and case tracking.",
  },
  {
    title: "Healthcare Platform",
    category: "Healthcare",
    description: "Integrated hospital management and patient record system for modern medical facilities.",
  },
  {
    title: "E-commerce Ecosystem",
    category: "Retail",
    description: "Full-stack e-commerce solution with advanced inventory management and secure payments.",
  },
  {
    title: "Fintech Gateway",
    category: "Finance",
    description: "Secure and scalable payment processing gateway for digital financial services.",
  },
  {
    title: "Digital Lottery",
    category: "Entertainment",
    description: "Secure, transparent lottery platform with digital ticketing, verifiable draws and instant winner payouts.",
  },
  {
    title: "Digital Equb",
    category: "Finance",
    description: "Traditional Equb savings groups made digital, with automated contributions, rotation draws and payouts.",
  },
  {
    title: "Bus Ticketing System",
    category: "Transportation",
    description: "Online bus booking with seat selection, route scheduling and mobile payment integration.",
  },
  {
    title: "Betting Game",
    category: "Gaming",
    description: "Real-time sports betting platform with live odds, secure wallets and responsible gaming controls.",
  },
  {
    title: "Bingo Game",
    category: "Gaming",
    description: "Interactive multiplayer bingo with live number calling, automatic card checking and instant prizes.",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Clients */}
      <Clients />

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold text-navy dark:text-white mb-4">Our Core Expertise</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We provide a wide range of technology services designed to help your business thrive in the digital age.
              </p>
            </div>
            <Link href="/services" className="shrink-0 whitespace-nowrap bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full font-bold text-navy dark:text-white hover:border-optima-blue transition-all">
              View All Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Network & Installation Section */}
      <section className="relative py-24 dark:bg-navy overflow-hidden">
        <CableNetwork className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-block text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-4">
                IT Infrastructure
              </span>
              <h2 className="text-3xl font-extrabold text-navy dark:text-white mb-4">
                Network & Installation Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Beyond software, we design, install and maintain the infrastructure your business runs on — from cabling and Wi-Fi to servers and security systems.
              </p>
              <Link href="/contact" className="inline-flex items-center bg-gradient-to-r from-optima-blue to-optima-green text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all group">
                Request a Site Survey
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {networkServices.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-optima-blue/20 hover:shadow-xl hover:shadow-optima-blue/5 transition-all group"
                  >
                    <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-optima-blue to-optima-green rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy dark:text-white mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-navy dark:text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A glimpse into the transformative digital solutions we&apos;ve delivered for our clients across various industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects" className="inline-flex items-center space-x-2 bg-navy dark:bg-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-optima-blue transition-colors">
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <Partners />

      {/* Testimonials */}
      <Testimonials />

      {/* Developers Slider - Hidden for now
      <DeveloperSlider /> */}

      {/* Contact CTA */}
      <section className="py-24 overflow-hidden relative dark:bg-navy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-optima-blue/20 to-optima-green/20 blur-3xl rounded-full opacity-50" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white mb-6">Ready to Build Your Next Big Idea?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Let&apos;s collaborate to create something extraordinary. Our team is ready to turn your vision into reality.
          </p>
          <Link href="/contact" className="bg-gradient-to-r from-optima-blue to-optima-green text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
