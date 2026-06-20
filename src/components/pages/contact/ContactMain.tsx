import React from 'react';
import Image from 'next/image';
import { Building2, Headset, Mail } from 'lucide-react';
import ContactForm from './ContactForm';
import Section from '@/components/common/Section';

const ContactMain = () => {
  return (
    <Section className="bg-[#011428]">
      <div className="w-full">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left Side: Form Component & Map */}
          <div className="lg:col-span-7 flex flex-col gap-10 md:gap-16">

            {/* Form yahan use ho raha hai */}
            <ContactForm />

            {/* Regional Hub Status (Map) */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h4 className="text-white text-[20px] md:text-[24px] font-[600]">Regional Hub Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#28A745] rounded-full animate-pulse" />
                  <span className="text-[#28A745] text-[12px] font-[700] uppercase">Systems Operational</span>
                </div>
              </div>
              <div className="relative w-full aspect-video rounded-[12px] overflow-hidden border border-[#021928]">
                <Image
                  src="/contact-main.png"
                  alt="Global Hub Map"
                  fill
                  className="object-cover opacity-60"
                />
                {/* Glowing Triangle Dots */}
                <div className="absolute inset-0 z-[1] pointer-events-none">
                  <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-4 h-4 bg-[#28A745] rounded-full shadow-[0_0_40px_15px_rgba(40,167,69,0.7)] animate-pulse" />
                  <div className="absolute top-[65%] left-[25%] w-3 h-3 bg-[#28A745] rounded-full shadow-[0_0_30px_10px_rgba(40,167,69,0.6)] animate-pulse animation-delay-500" />
                  <div className="absolute top-[65%] left-[76.5%] w-3 h-3 bg-[#28A745] rounded-full shadow-[0_0_30px_10px_rgba(40,167,69,0.6)] animate-pulse animation-delay-1000" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-12 pt-4">

            {/* Global Headquarters */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#182B40] w-14 h-14 flex items-center justify-center rounded-[8px] text-[#28A745] border border-white/5 shadow-lg">
                <Building2 size={28} />
              </div>
              <div>
                <p className="text-gray-400 text-[12px] font-[700] uppercase tracking-[0.25em] mb-3 opacity-60">Global Headquarters</p>
                <h4 className="text-blue-100 text-[22px] md:text-[26px] font-[600] leading-tight">One World Trade Center <br /> New York, NY 10007</h4>
              </div>
            </div>

            {/* Direct Comms */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#182B40] w-14 h-14 flex items-center justify-center rounded-[8px] text-[#28A745] border border-white/5 shadow-lg">
                <Headset size={28} />
              </div>
              <div>
                <p className="text-gray-400 text-[12px] font-[700] uppercase tracking-[0.25em] mb-3 opacity-60">Direct Comms</p>
                <h4 className="text-[#28A745] text-[24px] sm:text-[28px] md:text-[32px] font-[700] tracking-tight">+1-800-SERVICE-RENTAL</h4>
                <p className="text-gray-400 text-[16px] mt-1 font-medium opacity-80">Available 24/7/365</p>
              </div>
            </div>

            {/* Technical Support */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#182B40] w-14 h-14 flex items-center justify-center rounded-[8px] text-[#28A745] border border-white/5 shadow-lg">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-gray-400 text-[12px] font-[700] uppercase tracking-[0.25em] mb-3 opacity-60">Technical Support</p>
                <h4 className="text-blue-100 text-[22px] md:text-[28px] font-[600] tracking-tight">ops@all-service-rental.com</h4>
                <p className="text-gray-400 text-[16px] mt-1 font-medium opacity-80">Average Response: &lt; 15 mins</p>
              </div>
            </div>

            {/* Zero Latency Quote */}
            <div className="border-l-4 border-[#28A745] bg-[#0D2135B2] p-8 mt-4 rounded-r-[8px] backdrop-blur-md">
              <p className="text-gray-300 text-[17px] italic leading-relaxed font-light">
                "All Service Rental operates on a zero-latency mandate. Your transmission is routed through our global mission control for immediate prioritization."
              </p>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default ContactMain;
