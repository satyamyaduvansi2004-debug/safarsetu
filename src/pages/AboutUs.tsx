import React from 'react';
import { ShieldCheck, MapPin, Award, Users, HeartHandshake, PhoneCall } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-orange-655 font-bold tracking-widest text-xs uppercase bg-orange-50 border border-orange-105 px-4.5 py-1.5 rounded-full shadow-sm">
            Our Story & Trust
          </span>
          <h1 className="text-4xl font-extrabold text-blue-900 mt-3 font-sans uppercase">
            About <span className="text-blue-900 underline decoration-orange-500 decoration-3">SafarSetu</span>
            <span className="border-b-4 border-orange-500 w-16 block mt-2.5 mx-auto"></span>
          </h1>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Connecting heartlands, historic cities and thousands of travel, hotel, and dining destinations across India from Vaishali with premier excellence.
          </p>
        </div>

        {/* Hero Section of About Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 bg-white p-6 md:p-10 rounded-3xl shadow-md border border-slate-100">
          <div>
            <span className="text-blue-700 font-semibold text-sm">Founded on Pride & Hospitality</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Building India&apos;s Most Trusted Multi-Service Travel Gateway
            </h2>
            <p className="text-slate-600 mt-4 text-sm leading-relaxed">
              SafarSetu was founded with a singular, powerful vision: to construct a secure digital bridge (&quot;Setu&quot;) linking travelers with premium buses, trains, regional flights, traditional Indian hotels, and culinary delights in every corner of India.
            </p>
            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
              Nestled close to the historic <b>Lalganj in Vaishali, Bihar</b>—the cradle of ancient democracy and non-violence—our heritage drives our duty. We treat every passenger as a divine guest, ensuring they enjoy safe transportation, warm local stay, and authentic hot meals with 100% secure payment interfaces.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-orange-600 w-5 h-5 flex-shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-800">100% Secured UPI</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="text-blue-700 w-5 h-5 flex-shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-800">24/7 Premium Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-orange-600 w-5 h-5 flex-shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-800">Govt Authorized Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-blue-700 w-5 h-5 flex-shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-slate-800">Happy Indian Travelers</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80" 
              alt="Vaishali Ashokan Pillar Historic Site" 
              className="rounded-2xl shadow-xl object-cover w-full h-[320px] border-4 border-white"
            />
            <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 rounded-2xl shadow-lg max-w-[240px]">
              <p className="text-xs uppercase opacity-85 tracking-widest font-bold">Hailing From</p>
              <p className="text-sm font-bold mt-1">Vaishali, Bihar</p>
              <p className="text-[11px] opacity-90 mt-1 leading-snug">The birthplace of traditional hospitality & democratic culture.</p>
            </div>
          </div>
        </div>

        {/* Executive Profile Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl -mr-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700/15 rounded-full blur-3xl -ml-10"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 text-center md:text-left">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-blue-700 rounded-2xl mx-auto md:mx-0 flex items-center justify-center font-extrabold text-4xl text-white shadow-lg mb-4">
                SK
              </div>
              <h3 className="text-xl font-bold text-white">Satyam Kumar</h3>
              <p className="text-orange-400 text-xs mt-1 uppercase tracking-widest font-bold">Founder, Proprietor & Director</p>
              
              <div className="mt-4 flex flex-col gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                  <span>+91 9835474866</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lalganj, Vaishali, Bihar</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
              <span className="text-xs uppercase bg-orange-600/30 text-orange-300 px-2.5 py-1 rounded font-semibold">Founder&apos;s message</span>
              <h4 className="text-lg md:text-xl font-semibold text-white">
                &quot;To integrate local travel services with reliable technology and fair pricing.&quot;
              </h4>
              <p className="text-xs md:text-sm">
                At SafarSetu, our mission is to simplify India-wide travels for every common man, family, and religious tourist. By launching transparent pricing for direct bus reservations to Lalganj & Hajipur, train route inquiries, real-time airline search, and hot food deliveries from reliable local kitchens, we ensure stress-free trips. 
              </p>
              <p className="text-xs md:text-sm">
                We have linked our direct official <b>PhonePe Merchant QR Code</b> scanner—authorized under Satyam Kumar—throughout the system to prevent fake gateway charges and maintain trust. Scan securely, pay with pride, and set off on your next journey.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Address & Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Corporate Office</h4>
              <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                SafarSetu Headquarters<br />
                Lalganj, Vaishali District,<br />
                Bihar - 844121, India
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50">
              <span className="text-[11px] text-slate-400 font-mono">PIN CODE: 844121</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Direct Contact</h4>
              <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                <b>Owner:</b> Satyam Kumar<br />
                <b>Phone:</b> +91 9835474866<br />
                <b>Email:</b> satyamyaduvansi2004@gmail.com
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50">
              <span className="text-[11px] text-slate-400 font-mono">SUPPORT: 24h Responsive</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-full">
            <div>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Legal Trust</h4>
              <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                All transactions are tied to verified merchant portals. Travel tickets are regulated by standard IRCTC (trains), Indian State Transport Boards (buses), and DGCA (flights).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-50">
              <span className="text-[11px] text-slate-400 font-mono">COMPLIANCE: Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
