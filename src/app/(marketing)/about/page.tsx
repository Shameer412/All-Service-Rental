import AboutHero from "@/components/pages/about/AboutHero";
import OurArchitecture from "@/components/pages/about/OurArchitecture";
import StrategicEcosystem from "@/components/pages/about/StrategicEcosystem";
import OurTeam from "@/components/pages/about/OurTeam";
import IntegrateCTA from "@/components/pages/about/IntegrateCTA";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full font-manrope">
      <AboutHero />
      <OurArchitecture />
      <OurTeam />
      <StrategicEcosystem />
      <IntegrateCTA />
    </div>
  );
}
