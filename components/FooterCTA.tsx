"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

// These pages already end with their own call to action
const hiddenOn = ["/", "/contact", "/vackert"];

export default function FooterCTA() {
  const pathname = usePathname();
  if (hiddenOn.includes(pathname)) return null;

  return (
    <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10">
      <div>
        <h3 className="text-2xl md:text-3xl font-extrabold">Have a project in mind?</h3>
        <p className="text-gray-400 mt-2">Let&apos;s talk about how we can help your business grow.</p>
      </div>
      <Link
        href="/contact"
        className="group inline-flex items-center gap-2 bg-gradient-to-r from-optima-blue to-optima-green px-7 py-3.5 rounded-full font-bold shadow-lg shadow-optima-blue/20 hover:shadow-optima-blue/40 hover:-translate-y-0.5 transition-all shrink-0"
      >
        Start a Conversation
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
