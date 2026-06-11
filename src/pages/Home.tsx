import React, { useState } from 'react';
import { 
  getSavedHotels, 
  getSavedRestaurants 
} from '../state';
import { DEFAULT_REVIEWS, TOURIST_PLACES } from '../data';
import { 
  Search, Bus, Hotel as HotelIcon, Compass, Star, MapPin, 
  ShieldCheck, Smartphone, Phone, ArrowRight, Sparkles, AlertCircle, PlayCircle 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'travel' | 'hotels' | 'food' | 'payment') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [hotels] = useState(() => getSavedHotels());
  const [restaurants] = useState(() => getSavedRestaurants());

  // Search local inputs
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0]);

  // Featured lists filter
  const featuredHotels = hotels.filter(h => h.featured);
  const featuredRestaurants = restaurants.filter(r => r.featured);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-populate input states in user local storage to be picked up by Travel tab
    // Quick helper simulation
    onNavigate('travel');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. PREMIUM HERO SECTION with background graphics */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        {/* Abstract background blobs to represent Blue, Orange atmosphere */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl -mr-16"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl -ml-16"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero text Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs bg-orange-600/30 border border-orange-500/30 text-orange-350 px-3.5 py-1.5 rounded-full font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" /> India&apos;s Premium Travel Bridge
            </span>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight font-sans">
              Travel, Dine &amp; <br />
              <span className="text-orange-400">Discover</span> India Effortlessly.
            </h1>
            
            <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed mx-auto lg:mx-0">
              SafarSetu connects major city junctions, cozy hotel rooms, and local delicacies seamlessly. Powered entirely with secure, instant UPI payments verified by proprietor Satyam Kumar.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('travel')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs md:text-sm py-3.5 px-7 rounded-full transition shadow-sm hover:shadow-md flex items-center gap-2 uppercase tracking-wider cursor-pointer border-none"
              >
                <span>Book Travel Ticket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('hotels')}
                className="bg-transparent hover:bg-white/10 text-white font-bold text-xs md:text-sm py-3.5 px-6 rounded-full transition border border-white/40 hover:border-white flex items-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                <span>Find Premium Hotels</span>
              </button>
            </div>
          </div>

          {/* Hero Form Right - Widget (5 columns) */}
          <div className="lg:col-span-5 bg-white text-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl border border-slate-100">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="text-blue-700 w-4.5 h-4.5" />
              Quick Travel Route Inquiry
            </h2>
            
            <form onSubmit={handleHeroSearchSubmit} className="space-y-4">
              <div className="relative">
                <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1">Departure Junction</label>
                <input
                  type="text"
                  placeholder="e.g. Patna, Delhi"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-xs font-semibold outline-none focus:border-blue-750"
                />
              </div>

              <div className="relative">
                <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1">Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Lalganj (Vaishali), Jaipur"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-xs font-semibold outline-none focus:border-blue-750"
                />
              </div>

              <div className="relative">
                <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1">Departure Date</label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-xs font-semibold outline-none focus:border-blue-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none"
              >
                <Search className="w-4 h-4 text-orange-500" /> Search Available Buses
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 2. SECURITY BRAND BAR */}
      <div className="bg-slate-900 text-white py-4 overflow-hidden shadow-inner">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-orange-400 w-5 h-5 flex-shrink-0 animate-pulse" />
            <span className="font-semibold text-slate-200">Secure Payment Powered by UPI. Scan &amp; Pay directly.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>• PhonePe Support</span>
            <span>• Paytm / Google Pay</span>
            <span>• Direct Settlement under Satyam Kumar</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16">

        {/* 3. POPULAR TOURIST PLACES SECTION */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase text-orange-655 bg-orange-100 tracking-widest px-3 py-1 rounded-full">
              Wonders of India
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mt-2.5 font-sans tracking-tight">
              Popular Landmarks To See <span className="border-b-4 border-orange-500 w-16 block mt-2 mx-auto md:mx-0"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOURIST_PLACES.slice(0, 4).map(place => (
              <div 
                key={place.id} 
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => onNavigate('travel')}
              >
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-505" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[9px] uppercase tracking-wider text-orange-400 font-bold block mb-0.5">{place.state}</span>
                  <p className="font-black text-sm">{place.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. FEATURED HOTELS SECTION */}
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-end gap-3">
            <div>
              <span className="text-xs font-bold uppercase text-blue-900 bg-blue-50 tracking-widest px-3 py-1 rounded-full border border-blue-105">
                Exquisite Hospitality
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mt-2.5 font-sans tracking-tight">
                Featured SafarSetu Hotels <span className="border-b-4 border-orange-500 w-16 block mt-2"></span>
              </h2>
            </div>
            
            <button 
              onClick={() => onNavigate('hotels')}
              className="text-blue-900 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer border-none bg-transparent"
            >
              View all hotels ({hotels.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.slice(0, 3).map(hotel => (
              <div 
                key={hotel.id} 
                onClick={() => onNavigate('hotels')}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div className="relative">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-44 object-cover" />
                  <span className="absolute top-3 left-3 bg-blue-700 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    ★ {hotel.rating}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold">{hotel.city}, {hotel.state}</span>
                    <h4 className="font-bold text-slate-900 mt-1 line-clamp-1">{hotel.name}</h4>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">{hotel.description}</p>
                  </div>
                  <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center">
                    <span className="text-xs font-extrabold text-blue-700">₹{hotel.pricePerNight}/night</span>
                    <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wide">Secure Booking →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 5. SECURE UPI GATEWAY BANNER */}
        <div className="bg-gradient-to-r from-neutral-950 to-neutral-900 text-white rounded-3xl p-6 md:p-10 border border-neutral-800 shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="space-y-4 max-w-lg text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center gap-2">
              <span className="px-3 py-1 bg-orange-950/40 text-orange-400 border border-orange-800 text-[10px] uppercase font-black tracking-widest rounded-full">
                SafarSetu Billing
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black font-sans text-neutral-100 uppercase">
              Secure Direct Payments via UPI
            </h3>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              Pay using our official UPI ID <span className="font-mono text-orange-400 font-bold">satyamyaduvansi2004@okicici</span>. Fast, verified, and direct transfers to proprietor Satyam Kumar with instant reservation unlocks.
            </p>

            <button
              onClick={() => onNavigate('payment')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 px-6 rounded-full transition shadow-sm border-none cursor-pointer uppercase tracking-wider"
            >
              VISIT DEDICATED PAYMENT PAGE →
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center flex-shrink-0 w-68 md:w-72">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1.5">Verified Payee</span>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full text-center space-y-1">
              <p className="text-sm font-black text-white">Satyam Kumar</p>
              <p className="text-xs font-mono text-slate-400">satyamyaduvansi2004@okicici</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 font-semibold font-sans">SafarSetu Official Merchant Terminal</p>
          </div>
        </div>
        </div>

        {/* 6. FEATURED RESTAURANTS */}
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-end gap-3">
            <div>
              <span className="text-xs font-bold uppercase text-orange-600 bg-orange-100 tracking-widest px-3 py-1 rounded-full border border-orange-200">
                Dine &amp; Feast
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mt-2.5 font-sans tracking-tight">
                Order Meals From Certified Diners <span className="border-b-4 border-orange-500 w-16 block mt-2"></span>
              </h2>
            </div>
            
            <button 
              onClick={() => onNavigate('food')}
              className="text-orange-500 hover:text-orange-600 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer border-none bg-transparent"
            >
              Order Hot Food Delivery ({restaurants.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.slice(0, 3).map(rest => (
              <div 
                key={rest.id} 
                onClick={() => onNavigate('food')}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div className="relative">
                  <img src={rest.image} alt={rest.name} className="w-full h-40 object-cover" />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold py-1 px-2.5 rounded-full">
                    ⏱ Ready in {rest.deliveryTime}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm md:text-base">{rest.name}</h4>
                    <p className="text-slate-500 text-xs mt-1 truncate">{rest.cuisine}</p>
                  </div>
                  <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-500">★ {rest.rating}</span>
                    <span className="text-blue-750 font-extrabold font-sans">Order Meal →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. CUSTOMER REVIEWS */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase text-blue-900 bg-blue-50 tracking-widest px-3 py-1 rounded-full border border-blue-100">
              Traveler Feedback
            </span>
            <h3 className="text-2xl font-extrabold text-blue-900 mt-2.5 font-sans tracking-tight">
              What Customers Say About Satyam Kumar&apos;s SafarSetu <span className="border-b-4 border-orange-500 w-16 block mt-2 mx-auto md:mx-0"></span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_REVIEWS.map((rev, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <p className="text-slate-600 text-xs md:text-sm italic leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>
                <div className="flex items-center gap-3 border-t border-slate-50 pt-4 mt-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">{rev.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{rev.city} | {rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. DOWNLOAD APP SECTION */}
        <div className="bg-gradient-to-br from-blue-750 to-blue-900 text-white rounded-3xl p-6 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-600/20 rounded-full blur-2xl"></div>
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Coming Soon to Stores</span>
            <h4 className="text-xl md:text-2xl font-black text-white">Download SafarSetu Android Lite App</h4>
            <p className="text-slate-300 text-xs max-w-md">
              Secure travel ticketing, offline tourist route assistance, and direct owner WhatsApp notifications in a lightweight mobile utility under 10MB.
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={() => alert('SafarSetu Mobile Android application package (.apk) compiles on local play store soon.')}
              className="bg-slate-900 hover:bg-black text-white font-bold py-3 px-5 rounded-2xl text-xs flex items-center gap-2 border border-slate-800"
            >
              Google Play (APK)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
