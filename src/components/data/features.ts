export interface Feature {
  id: string;
  title: string;
  description: string;
  badge?: string;
  points?: string[];
  stats?: { label: string; value: string; subtext: string };
  buttonText?: string;
  image: string;
  icon: string;
  reverse: boolean;
}

export const features: Feature[] = [
  {
    id: "01",
    title: "Identity Protocol",
    description: "Secure your position in the All Service Rental network. Our biometric-grade onboarding verifies your operational credentials in milliseconds, granting instant access to the fleet.",
    badge: "SECURITY CLEARANCE LEVEL 41",
    image: "/images/work1.png",
    icon: "/images/Work1.svg",
    reverse: false,
  },
  {
    id: "02",
    title: "Global Network Capacity",
    description: "Browse our monolithic fleet of autonomous vessels, heavy-lift aircraft, and hyper-rail modules. Real-time availability across 142 global hubs.",
    points: ["REAL-TIME ASSET TELEMETRY", "DYNAMIC CAPACITY FORECASTING"],
    image: "/images/work2.png",
    icon: "/images/work2.svg",
    reverse: true,
  },
  {
    id: "03",
    title: "Kinetic Pricing",
    description: "Eliminate negotiations. Our algorithmic engine calculates pricing based on mass, velocity, and global demand spikes, providing a binding quote in under 2 seconds.",
    stats: { label: "ESTIMATED DELTA:", value: "-14%", subtext: "COST EFFICIENCY VS. INDUSTRY BASELINE" },
    image: "/images/work3.png",
    icon: "/images/Work3.svg",
    reverse: false,
  },
  {
    id: "04",
    title: "Total Command Center",
    description: "The Monolith at your fingertips. Manage your global deployments, reroute assets on the fly, and receive AI-driven disruption alerts from a single glass interface.",
    buttonText: "VIEW INTERFACE SPECS",
    image: "/images/work4.png",
    icon: "/images/Work4.svg",
    reverse: true,
  }
];
