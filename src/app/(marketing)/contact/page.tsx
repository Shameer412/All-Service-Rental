import ContactHero from "@/components/pages/contact/ContactHero";
import ContactMain from "@/components/pages/contact/ContactMain";
import CTASection from "@/components/pages/contact/CTASection";

export const metadata = {
  title: "Contact Us | All Service Rental",
  description: "Get in touch with our global logistics network for high-velocity deployments and mission-critical support.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full font-manrope">
      <ContactHero />
      <ContactMain />
      <CTASection />
    </div>
  );
}
