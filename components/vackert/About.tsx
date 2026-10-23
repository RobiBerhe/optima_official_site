import { Briefcase, Cpu, Plus } from "lucide-react";
import { site } from "@/lib/vackert";
import Reveal from "./Reveal";

const pillars = [
  {
    title: "Vackert",
    role: "Business",
    description: "Works directly with companies and entrepreneurs across all ten economic sectors.",
    icon: Briefcase,
  },
  {
    title: site.sister,
    role: "Technology",
    description: "Our sister company, bringing software, systems and IT infrastructure to the businesses we work with.",
    icon: Cpu,
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal stagger={0.12}>
          <span className="block text-forest dark:text-gold font-bold text-sm uppercase tracking-widest">About Vackert</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark dark:text-white mt-4 mb-6 leading-tight">
            Two sister companies, every kind of business
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Vackert is the sister company of {site.sister}. Together we do business across every major sector.
            Whatever sector you are in, share your information with us and we will find the right way to work with you.
          </p>
        </Reveal>

        <Reveal stagger={0.15} className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-7 sm:p-8 rounded-3xl bg-cream dark:bg-white/5 border border-forest/10 dark:border-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10 transition-[translate,box-shadow] duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-forest text-gold flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-forest/60 dark:text-gold/70">{pillar.role}</span>
                </div>
                <h3 className="text-xl font-bold text-forest-dark dark:text-white mb-2">{pillar.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
          <span className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold text-forest-dark items-center justify-center shadow-lg ring-4 ring-white dark:ring-forest-dark">
            <Plus size={20} strokeWidth={3} />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
