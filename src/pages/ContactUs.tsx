import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Enquiry } from '../types';
import { getSavedEnquiries, saveEnquiries } from '../state';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const enquiries = getSavedEnquiries();
    const newEnq: Enquiry = {
      id: `enq-${Date.now()}`,
      name,
      email,
      phone,
      subject: 'Direct Contact Form',
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    enquiries.unshift(newEnq);
    saveEnquiries(enquiries);

    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-orange-600 bg-orange-50 border border-orange-150 text-xs font-bold uppercase tracking-widest px-4.5 py-1.5 rounded-full shadow-sm">
            Direct Comm line
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-3 font-sans uppercase">
            Contact <span className="text-blue-905 underline decoration-orange-500 decoration-3">SafarSetu</span>
            <span className="border-b-4 border-orange-500 w-16 block mt-2.5 mx-auto"></span>
          </h1>
          <p className="text-slate-655 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Have any commercial proposals or urgent trip questions? Connect with our proprietor Satyam Kumar directly via call, email, or physical visit.
          </p>
        </div>

        {/* Info & Form Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card left side: Info (5 columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden h-full">
            {/* Background design glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">Connect instanly</span>
                <h3 className="text-2xl font-bold mt-1 font-sans">Corporate Identity</h3>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                  We are deeply integrated into the local transport hubs in standard Bihar towns, providing round-the-clock booking verifications.
                </p>
              </div>

              {/* Contacts */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone Support (Director)</p>
                    <a href="tel:9835474866" className="text-base font-bold hover:text-orange-400 transition">
                      +91 9835474866
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Official Email Address</p>
                    <a href="mailto:satyamyaduvansi2004@gmail.com" className="text-sm font-bold hover:text-orange-400 transition break-all">
                      satyamyaduvansi2004@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Corporate Office Location</p>
                    <p className="text-xs text-slate-300 leading-relaxed font-bold">
                      Lalganj, Vaishali District,<br />
                      Bihar, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Footer Call To Action */}
            <div className="relative z-10 border-t border-white/10 pt-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-slate-900 text-sm">
                  SK
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Satyam Kumar</h4>
                  <p className="text-[11px] text-slate-400">Owner & Chief Administrator</p>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={`https://wa.me/919835474866?text=Hello%20Satyam%20Kumar,%20I%20visited%20SafarSetu%20and%20would%20like%20to%20discuss%20a%20booking/partnership.`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-3 px-4 text-xs font-bold text-center flex items-center justify-center gap-2 transition shadow-md border-none cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Direct via WhatsApp
              </a>
            </div>
          </div>

          {/* Form right side (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-sans text-blue-900 uppercase">Send Us a Quick Message</h3>
            <p className="text-slate-500 text-xs mb-6">We will review your inquiry immediately and respond over phone or email.</p>

            {success ? (
              <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200 px-4">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Message Sent Successfully!</h4>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Your message has reached Satyam Kumar. We usually review and respond within 30 minutes!
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs py-2.5 px-6 rounded-full cursor-pointer transition border-none"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satyam Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-750 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="e.g. 9835474866"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/gs, ''))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-750 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-750 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">How can we assist you? *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide detailed passenger names, bus routes or food requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-750 focus:bg-white transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 px-6 rounded-full transition flex items-center justify-center gap-2 text-sm shadow-md border-none cursor-pointer uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  Send to SafarSetu Core
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Map Section - Placeholder Visual Map */}
        <div className="mt-12 bg-white rounded-3xl p-4 border border-slate-200 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 border-b border-slate-100 mb-4 gap-2">
            <div>
              <h4 className="font-bold text-slate-900 text-sm md:text-base">Headquarters: Lalganj, Vaishali (Bihar)</h4>
              <p className="text-xs text-slate-500">Located with quick accessibility to NH-22 and Hajipur junctions.</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-full font-bold">● Operations Active</span>
          </div>
          
          {/* Custom Styled Map Graphic */}
          <div className="bg-slate-100 h-64 rounded-2xl flex flex-col items-center justify-center border border-slate-200 relative overflow-hidden p-6 text-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            
            <MapPin className="text-orange-600 w-12 h-12 animate-bounce relative z-10" />
            <h5 className="font-extrabold text-slate-800 text-base mt-3 relative z-10">Lalganj, Vaishali District, Bihar, India</h5>
            <p className="text-xs text-slate-500 max-w-md mt-1 relative z-10">
              Cradle of standard Licchavi republic civilization. Visit SafarSetu Corporate for partnership, bulk travel booking contracts, or regional food franchising.
            </p>
            <div className="mt-4 flex gap-2 relative z-10">
              <span className="bg-white text-xs border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-bold">25 km from Patna</span>
              <span className="bg-white text-xs border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg font-bold">18 km from Hajipur</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
