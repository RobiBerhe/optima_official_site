import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-optima-blue/20 hover:shadow-xl hover:shadow-optima-blue/5 transition-all group"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-optima-blue to-optima-green rounded-xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-navy dark:text-white mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{description}</p>
      <Link href="/services" className="text-optima-blue dark:text-optima-green font-semibold flex items-center group/link">
        Learn more <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  index: number;
}

export function ProjectCard({ title, category, description, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group overflow-hidden rounded-3xl bg-white dark:bg-black/40 aspect-[4/3] border border-gray-100 dark:border-white/5 hover:shadow-xl hover:shadow-optima-blue/10 transition-shadow"
    >
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-optima-blue/20 via-optima-green/5 via-40% to-transparent to-70%" />

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-navy dark:via-navy/60 z-10" />

      <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
        <span className="text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-wider mb-2">{category}</span>
        <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-6 group-hover:text-navy dark:group-hover:text-white transition-colors">{description}</p>
        <Link
          href={`/projects`}
          aria-label={`View ${title}`}
          className="w-10 h-10 bg-navy text-white dark:bg-white dark:text-navy rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <ArrowRight size={20} />
        </Link>
      </div>
    </motion.div>
  );
}
