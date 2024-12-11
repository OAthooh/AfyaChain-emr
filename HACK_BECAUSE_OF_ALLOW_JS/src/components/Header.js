import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'For Providers', href: '#providers' },
    { name: 'For Patients', href: '#patients' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
];
export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (<header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600"/>
              <span className="ml-2 text-xl font-bold text-gray-900">AfyaChain</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (<a key={item.name} href={item.href} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                {item.name}
              </a>))}
            <Link to="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Sign in
            </Link>
            <Link to="/auth/register" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (<X className="block h-6 w-6" aria-hidden="true"/>) : (<Menu className="block h-6 w-6" aria-hidden="true"/>)}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (<a key={item.name} href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                {item.name}
              </a>))}
            <Link to="/auth/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
              Sign in
            </Link>
            <Link to="/auth/register" className="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>);
}
