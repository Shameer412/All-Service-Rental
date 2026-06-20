import Hero from "@/components/pages/home/Hero";
import FeaturedVehicles from "@/components/pages/home/FeaturedVehicles";
import HowItWorks from "@/components/pages/home/HowItWorks";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import MemberBenefits from "@/components/pages/home/MemberBenefits";
import Reviews from "@/components/pages/home/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <WhyChooseUs />
      <HowItWorks />

      <MemberBenefits />
      <Reviews />
    </>
  );
}
