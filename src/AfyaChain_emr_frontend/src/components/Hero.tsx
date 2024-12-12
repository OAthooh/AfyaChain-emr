import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-blue-900/75" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            AfyaChain: Transforming Healthcare, One Record at a Time
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12">
            Empowering Kenya's Healthcare System with Secure and Decentralized Medical Records
          </p>
          
          <div className="flex flex-wrap gap-4">
            {['For Providers', 'For Patients', 'For Investors'].map((text) => (
              <button
                key={text}
                className="group flex items-center px-6 py-3 text-lg font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-all duration-200"
              >
                {text}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}