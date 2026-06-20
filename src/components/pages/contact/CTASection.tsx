import React from 'react';

const IntegrationHero: React.FC = () => {
  return (
    <section className="bg-[#081D30] flex flex-col items-center justify-center min-h-[400px] py-16 md:py-20 text-center">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto px-4">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Ready to Integrate?
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-base md:text-xl max-w-[90%] lg:max-w-[65%] mx-auto mb-10 leading-relaxed">
          Experience the future of kinetic logistics. Join 5,000+ enterprise partners
          leveraging the Service Rental Network.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-green-400 to-green-600
                       hover:from-green-500 hover:to-green-700 text-slate-900 font-bold
                       rounded-sm transition-all duration-200 transform hover:scale-[1.02]"
          >
            GET STARTED
          </button>

          <button
            className="w-full sm:w-auto px-10 py-4 text-white font-semibold rounded-sm transition-colors duration-200 hover:bg-white/5 btn-border-light bg-transparent"
          >
            DOWNLOAD NETWORK SPECS
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationHero;
