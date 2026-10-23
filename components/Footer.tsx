import Logo from "./Logo";
import Link from "next/link";
import FooterCTA from "./FooterCTA";
// import SiteQRCode from "./SiteQRCode";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ArrowUp, ChevronRight } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  // { name: "Partnerships", href: "/partners" },
  { name: "Vackert", href: "/vackert" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  "Web Development",
  "Mobile App Development",
  "ERP Systems",
  "Cloud Solutions",
  "System Integration",
  "Network & Installation",
];

const socials = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Gradient accent line + glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-optima-blue to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[48rem] h-80 bg-gradient-to-r from-optima-blue/20 to-optima-green/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterCTA />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Optima Technologies home">
              <span className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Logo className="w-14 h-14" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-extrabold text-2xl tracking-tight">OPTIMA</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-optima-green mt-1">
                  Technologies
                </span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Leading the digital transformation with innovative technology solutions. We build systems that empower businesses and communities.
            </p>
            <div className="flex gap-3">
              {socials.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-optima-blue hover:border-optima-blue hover:-translate-y-0.5 rounded-full transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <ChevronRight size={14} className="-ml-4 mr-0.5 opacity-0 group-hover:ml-0 group-hover:opacity-100 text-optima-green transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link href="/services" className="group inline-flex items-center text-gray-400 hover:text-white transition-colors">
                    <ChevronRight size={14} className="-ml-4 mr-0.5 opacity-0 group-hover:ml-0 group-hover:opacity-100 text-optima-green transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="text-optima-blue" size={18} />
                </span>
                <span className="pt-1.5">Addis Ababa & Regional Cities, Ethiopia</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Phone className="text-optima-blue" size={18} />
                </span>
                <span className="flex flex-col pt-1.5 gap-1">
                  <a href="tel:+251939405104" className="hover:text-white transition-colors">+251 939 405104</a>
                  <a href="tel:+251914585645" className="hover:text-white transition-colors">+251 914 585645</a>
                </span>
              </li>
              <li>
                <a href="mailto:optimatech.dev@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors break-all">
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Mail className="text-optima-blue" size={18} />
                  </span>
                  optimatech.dev@gmail.com
                </a>
              </li>
            </ul>
            {/* QR Code - Hidden for now
            <div className="mt-8 flex items-center gap-4">
              <SiteQRCode size={96} />
              <p className="text-gray-400 text-sm">Scan to visit<br />our website</p>
            </div> */}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {currentYear} Optima Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a
              href="#"
              aria-label="Back to top"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-optima-blue hover:border-optima-blue transition-colors"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
