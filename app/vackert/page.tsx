import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Hero from "@/components/vackert/Hero";
import Marquee from "@/components/vackert/Marquee";
import About from "@/components/vackert/About";
import Sectors from "@/components/vackert/Sectors";
import HowItWorks from "@/components/vackert/HowItWorks";
import Contact from "@/components/vackert/Contact";
import { SectorProvider } from "@/components/vackert/SectorContext";

// Vackert keeps its own typeface alongside its forest & gold colours
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vackert | Sister Company of Optima Technologies",
  description: "Vackert, sister company of Optima Technologies, does business across agriculture, mining, manufacturing, construction, trade, transport, finance and more in Ethiopia.",
};

export default function VackertPage() {
  return (
    <div className={`vackert-page ${manrope.className} bg-white text-gray-800 dark:bg-forest-dark dark:text-gray-100`}>
      <SectorProvider>
        <Hero />
        <Marquee />
        <About />
        <Sectors />
        <HowItWorks />
        <Contact />
      </SectorProvider>
    </div>
  );
}
