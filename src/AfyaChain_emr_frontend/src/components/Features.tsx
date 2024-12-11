import React from 'react';
import { Shield, Video, Globe, Database } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Decentralized Record Management',
    description: 'Securely consolidate medical records across facilities, ensuring a seamless patient journey.'
  },
  {
    icon: Video,
    title: 'Integrated Telemedicine',
    description: 'Connect patients and providers through video consultations and digital prescriptions.'
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Supporting Kiswahili, Kikuyu, Luo, Kamba, and other local languages.'
  },
  {
    icon: Shield,
    title: 'Unparalleled Security',
    description: 'Blockchain technology ensures end-to-end encryption and HIPAA compliance.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Why Choose AfyaChain?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}