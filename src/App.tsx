import React, { useState } from 'react';
import Home from './pages/Home';
import Travel from './pages/Travel';
import Hotels from './pages/Hotels';
import FoodDelivery from './pages/FoodDelivery';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Payment from './pages/Payment';
import HelpSupport from './pages/HelpSupport';
import AdminDashboard from './pages/AdminDashboard';

import { 
  Menu, X, Phone, Mail, MapPin, ShieldCheck, 
  MessageSquare, Compass, Utensils, Hotel as HotelIcon, 
  HelpCircle, CreditCard, ChevronRight, Sparkles 
} from 'lucide-react';

type PageType = 'home' | 'travel' | 'hotels' | 'food' | 'about' | 'contact' | 'payment' | 'help' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick navigation wrappers
  const handlePageSelect = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'travel', label: 'Travel', icon: <Compass className="w-4 h-4 text-orange-500" /> },
    { id: 'hotels', label: 'Hotels', icon: <HotelIcon className="w-4 h-4 text-blue-500" /> },
    { id: 'food', label: 'Food Delivery', icon: <Utensils className="w-4 h-4 text-orange-600" /> },
    { id: 'about', label: 'About Us', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'contact', label: 'Contact Us', icon: <Phone className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment API', icon: <CreditCard className="w-4 h-4 text-violet-700" /> },
    { id: 'help', label: 'Help Desk', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen text-slate-800 font-sans tracking-normal bg-slate-50 antialiased selection:bg-orange-500 selection:text-white">
      
      {/* DIRECT WA FLOATING ICON FOR OWNER COMM */}
      <a 
        href="https://wa.me/919835474866?text=Hello%20Satyam%20Kumar,%20I%20have%20an%20urgent%20ticketing/support%20request%20via%20SafarSetu." 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition duration-300 group z-50 flex items-center justify-center border-2 border-white"
        title="Direct Chat with Satyam Kumar"
      >
        <MessageSquare className="w-6 h-6 flex-shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition duration-300 ease-in-out font-bold text-xs font-sans whitespace-nowrap pl-0 group-hover:pl-2">
          Chat With Owner
        </span>
      </a>

      {/* 1. PROFESSIONAL NAVIGATION HEADER */}
      <header className="sticky top-0 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200 h-16 z-40 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            onClick={() => handlePageSelect('home')}
            className="flex items-center gap-3 cursor-pointer focus:outline-none bg-transparent border-none"
          >
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-orange-500 font-bold text-2xl">S</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-extrabold tracking-tight text-blue-900 leading-none underline decoration-orange-500 decoration-3">
                SafarSetu
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 font-semibold uppercase mt-1">
                India Multi-Gateway
              </span>
            </div>
          </button>

          {/* Desktop Links (8 cols roughly) */}
          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handlePageSelect(link.id)}
                className={`py-2 text-[11px] font-bold uppercase transition flex items-center gap-1 focus:outline-none cursor-pointer ${currentPage === link.id ? 'text-blue-905 border-b-2 border-blue-900 font-extrabold' : 'text-slate-600 hover:text-blue-900 border-b-2 border-transparent hover:border-slate-300'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons (Payment & Admin) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handlePageSelect('admin')}
              className={`text-[11px] font-bold uppercase px-4 py-2 rounded-full border transition cursor-pointer ${currentPage === 'admin' ? 'bg-blue-900 text-white border-blue-900 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-blue-905'}`}
            >
              🛠 Admin Portal
            </button>
            <button
              onClick={() => handlePageSelect('payment')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold text-[11px] shadow-sm hover:shadow transition-all uppercase tracking-wider cursor-pointer border-none"
            >
              <span>पे Scan Pay</span>
            </button>
          </div>

          {/* Responsive Hamburger icon */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handlePageSelect('payment')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[11px] px-3.5 py-1.5 rounded-full flex items-center gap-1 tracking-tight uppercase border-none"
            >
              <span>पे Scan</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer border-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* 2. MOBILE MULTI DRAWER CONTAINER */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white absolute top-16 inset-x-0 p-5 shadow-xl animate-slide-down space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handlePageSelect(link.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold uppercase transition flex items-center justify-between border-none cursor-pointer ${currentPage === link.id ? 'bg-blue-900 text-white' : 'text-slate-750 hover:bg-slate-100'}`}
                >
                  <span className="flex items-center gap-2.5">
                    {link.icon}
                    <span>{link.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => handlePageSelect('admin')}
                className="w-full text-center bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase transition border-none cursor-pointer"
              >
                🛠 Access Admin Panel
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. PRIMARY PAGE ROUTER PORTS & VIEWS */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home onNavigate={(p) => handlePageSelect(p)} />}
        {currentPage === 'travel' && <Travel onNavigateToPayment={() => handlePageSelect('payment')} />}
        {currentPage === 'hotels' && <Hotels onNavigateToPayment={() => handlePageSelect('payment')} />}
        {currentPage === 'food' && <FoodDelivery onNavigateToPayment={() => handlePageSelect('payment')} />}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'contact' && <ContactUs />}
        {currentPage === 'payment' && <Payment />}
        {currentPage === 'help' && <HelpSupport />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* 4. PROFESSIONAL INDIA-WIDE CORPORATE FOOTER */}
      <footer className="bg-slate-900 text-white pt-12 pb-6 px-4 md:px-8 border-t border-slate-800 mt-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-orange-600/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Logo Description block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-slate-950 text-base">
                S
              </div>
              <span className="text-lg font-black tracking-tight text-white leading-none">
                Safar<span className="text-orange-500">Setu</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Providing premium regional ticketing buses, IRCTC reservations assistance, luxury checks, and hot home food deliveries with certified safety metrics across India.
            </p>

            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-2.5 rounded-xl text-[10px] text-slate-300">
              <ShieldCheck className="text-orange-500 w-4.5 h-4.5 flex-shrink-0" />
              <span>Certified UPI Authorized Merchant Portals.</span>
            </div>
          </div>

          {/* Core Menu quick Links (4 columns) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-orange-450 uppercase tracking-widest pl-0.5">Services</h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li><button onClick={() => handlePageSelect('travel')} className="hover:text-white transition">🚌 Roadways</button></li>
                <li><button onClick={() => handlePageSelect('travel')} className="hover:text-white transition">🚂 Railway Runs</button></li>
                <li><button onClick={() => handlePageSelect('travel')} className="hover:text-white transition">✈️ Airlines Search</button></li>
                <li><button onClick={() => handlePageSelect('hotels')} className="hover:text-white transition">🏨 Reserve Stays</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-orange-450 uppercase tracking-widest pl-0.5">Navigation</h4>
              <ul className="text-xs text-slate-400 space-y-2">
                <li><button onClick={() => handlePageSelect('about')} className="hover:text-white transition">About SafarSetu</button></li>
                <li><button onClick={() => handlePageSelect('help')} className="hover:text-white transition">Help &amp; FAQs</button></li>
                <li><button onClick={() => handlePageSelect('contact')} className="hover:text-white transition">Contact Us</button></li>
                <li><button onClick={() => handlePageSelect('admin')} className="hover:text-white transition">Admin System</button></li>
              </ul>
            </div>
          </div>

          {/* Corporate owner coordinates (4 columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Corporate Coordinates</h4>
            
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex gap-2.5 items-start">
                <MapPin className="text-orange-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="leading-snug">
                  Lalganj, Vaishali District,<br />
                  Bihar - 844121, India
                </p>
              </div>

              <div className="flex gap-2.5 items-center">
                <Phone className="text-orange-500 w-4 h-4 flex-shrink-0" />
                <a href="tel:9835474866" className="hover:text-white transition">
                  +91 9835474866
                </a>
              </div>

              <div className="flex gap-2.5 items-center">
                <Mail className="text-orange-500 w-4 h-4 flex-shrink-0" />
                <a href="mailto:satyamyaduvansi2004@gmail.com" className="hover:text-white transition break-all">
                  satyamyaduvansi2004@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
              <span>Owner: <b>Satyam Kumar</b></span>
              <span className="text-emerald-500">Active</span>
            </div>
          </div>

        </div>

        {/* Legal copyrights */}
        <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
          <p>© 2026 SafarSetu. All rights reserved. Secure Indian Commerce aggregations.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <button onClick={() => handlePageSelect('admin')} className="hover:underline text-slate-400">Admin Control</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
