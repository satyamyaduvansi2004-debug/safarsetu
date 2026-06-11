import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, Compass, Utensils, CreditCard, Send, CheckCircle2 } from 'lucide-react';
import { Enquiry } from '../types';
import { getSavedEnquiries, saveEnquiries } from '../state';

export default function HelpSupport() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Booking Issue');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      category: 'Travel & Booking',
      icon: <Compass className="w-5 h-5 text-blue-700" />,
      q: 'How do I obtain the confirmed Bus, Train, or Flight tickets?',
      a: 'Once you choose your routes, register details and pay securely using the UPI Transfer or Credit Card on our Payment Page, our representative will verify the transaction within 15 minutes and email/WhatsApp your official tickets.'
    },
    {
      category: 'Travel & Booking',
      icon: <Compass className="w-5 h-5 text-blue-700" />,
      q: 'Can I book a bus directly to Lalganj or Vaishali?',
      a: 'Yes, SafarSetu operates premium direct AC & Non-AC seating buses from Patna and Muzaffarpur straight to Corporate Headquarters in Lalganj (Vaishali), accessible via the Travel section.'
    },
    {
      category: 'Food Delivery',
      icon: <Utensils className="w-5 h-5 text-orange-600" />,
      q: 'Is Cash on Delivery (COD) supported for food ordering?',
      a: 'Absolutely! SafarSetu supports Cash on Delivery (COD) on all local food deliveries from Lalganj, Hajipur and nearby locations, beside pre-paid UPI transaction option.'
    },
    {
      category: 'Payments & Scanner',
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      q: 'Is the UPI Payment system secure?',
      a: 'Yes! SafarSetu features a transparent and verified UPI transfer portal mapped directly to our proprietor Satyam Kumar. There are zero hidden gateway surcharges. Simply copy our UPI ID or pay directly from any UPI app (PhonePe, GPay, Paytm, BHIM).'
    },
    {
      category: 'Refunds & Cancellations',
      icon: <HelpCircle className="w-5 h-5 text-red-500" />,
      q: 'How do I process a refund or ticket cancellation?',
      a: 'Simply call us directly at 9835474866 or raise an Enquiry form on this support page. Approved refunds are credited directly back to your initiating UPI ID or bank account within 24-48 working hours.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const enquiries = getSavedEnquiries();
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    enquiries.unshift(newEnquiry);
    saveEnquiries(enquiries);

    setSubmitted(true);
    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-900 font-bold tracking-widest text-xs uppercase bg-blue-50 border border-blue-200 px-4.5 py-1.5 rounded-full shadow-sm">
            Customer Care Desk
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-3 font-sans uppercase">
            How Can We <span className="text-blue-905 underline decoration-orange-500 decoration-3">Help You</span> Today?
            <span className="border-b-4 border-orange-500 w-16 block mt-2.5 mx-auto"></span>
          </h1>
          <p className="text-slate-655 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            Find immediate answers regarding travel ticketing, food ordering, and UPI transactions, or forward your queries directly to Satyam Kumar.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion - left side (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <FileText className="text-blue-700 w-5 h-5" />
              Frequently Asked Questions (FAQs)
            </h3>

            {faqs.map((faq, index) => {
              const isOpen = selectedFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-200"
                >
                  <button
                    className="w-full text-left p-4 md:p-5 flex justify-between items-center gap-4 focus:outline-none"
                    onClick={() => setSelectedFaq(isOpen ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{faq.icon}</div>
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block mb-0.5">{faq.category}</span>
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">{faq.q}</h4>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 pl-12 border-t border-slate-50">
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Contact Box */}
            <div className="bg-gradient-to-r from-orange-500/10 to-blue-700/10 rounded-2xl p-6 border border-orange-200 mt-8">
              <h4 className="font-bold text-slate-800 text-base">Direct Toll-Free Line</h4>
              <p className="text-xs text-slate-600 mt-1">Chat directly with the director Satyam Kumar on emergency trip queries:</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <a 
                  href="tel:9835474866" 
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2"
                >
                  Call +91 9835474866
                </a>
                <a 
                  href={`https://wa.me/919835474866?text=Hi%20SafarSetu,%20I%20have%20an%20urgent%20ticketing/support%20request.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-2"
                >
                  WhatsApp Helpdesk
                </a>
              </div>
            </div>
          </div>

          {/* Enquiry Submission Form - right side (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
            <h3 className="text-lg font-bold text-slate-950 mb-1 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Send className="text-orange-600 w-5 h-5" />
              Write to Owner / Enquiry Desk
            </h3>

            {submitted ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Enquiry Submitted!</h4>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Thank you for placing your inquiry. Satyam Kumar and your ticket managers will evaluate and call your contact number shortly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/gs, ''))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Inquiry Category *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                  >
                    <option value="Bus / Train Booking Issue">Bus / Train Booking Issue</option>
                    <option value="Hotel Reservation Query">Hotel Reservation Query</option>
                    <option value="Online Food Delivery Issue">Online Food Delivery Issue</option>
                    <option value="UPI Payment Verification">UPI Payment Verification</option>
                    <option value="Become a Partner (Hotel/Restaurant)">Become a Partner (Hotel/Restaurant)</option>
                    <option value="Other Feedback">Other Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Message & Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry (trip locations, date, boarding points, etc.)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-700 focus:bg-white transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 px-6 rounded-full transition flex items-center justify-center gap-2 text-sm shadow-md mt-2 border-none cursor-pointer uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry Securely
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
