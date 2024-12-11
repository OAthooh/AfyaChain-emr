import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
const footerLinks = {
    product: [
        { name: 'Features', href: '#' },
        { name: 'Security', href: '#' },
        { name: 'For Providers', href: '#' },
        { name: 'For Patients', href: '#' },
        { name: 'For Investors', href: '#' }
    ],
    company: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'News', href: '#' },
        { name: 'Partners', href: '#' }
    ],
    resources: [
        { name: 'Documentation', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' }
    ],
    contact: [
        { icon: Mail, text: 'contact@afyachain.co.ke' },
        { icon: Phone, text: '+254 700 000 000' },
        { icon: MapPin, text: 'Nairobi, Kenya' }
    ]
};
const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' }
];
export function Footer() {
    return (<footer className="bg-[#090E34] text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">AfyaChain</h2>
            <p className="mb-6 text-gray-400">
              Transforming healthcare in Kenya through secure, decentralized medical records and innovative health management solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (<a key={index} href={social.href} className="text-gray-400 hover:text-white transition-colors">
                  <social.icon className="w-5 h-5"/>
                </a>))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (<li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (<li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, index) => (<li key={index} className="flex items-center">
                  <item.icon className="w-5 h-5 mr-2"/>
                  <span>{item.text}</span>
                </li>))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} AfyaChain. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerLinks.resources.map((link) => (<a key={link.name} href={link.href} className="text-sm hover:text-white transition-colors">
                  {link.name}
                </a>))}
            </div>
          </div>
        </div>
      </div>
    </footer>);
}
