import React from 'react';
import { CheckCircle } from 'lucide-react';
const benefits = [
    {
        title: "For Providers",
        items: [
            "Access secure and real-time patient records",
            "Streamline billing with automated processes",
            "Enhance decision-making with robust analytics"
        ]
    },
    {
        title: "For Patients",
        items: [
            "Manage your health with a user-friendly portal",
            "Access medical history, test results, and prescriptions",
            "Book appointments and consult with doctors online"
        ]
    },
    {
        title: "For Investors",
        items: [
            "Partner with a game-changing healthcare solution",
            "Support a scalable and innovative platform",
            "Transform healthcare in Kenya"
        ]
    }
];
export function Benefits() {
    return (<section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Experience the AfyaChain Difference
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (<div key={benefit.title} className="p-8 rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                {benefit.title}
              </h3>
              <ul className="space-y-4">
                {benefit.items.map((item) => (<li key={item} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"/>
                    <span className="text-gray-700">{item}</span>
                  </li>))}
              </ul>
            </div>))}
        </div>
      </div>
    </section>);
}
