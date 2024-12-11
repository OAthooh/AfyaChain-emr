import React from 'react';
import { ArrowRight } from 'lucide-react';
export function CTA() {
    return (<section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Join the Healthcare Revolution
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Together, we can transform healthcare and empower communities across Kenya.
          Start your journey with AfyaChain today.
        </p>
        
        <button className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-all duration-200">
          Get Started Today
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
    </section>);
}
