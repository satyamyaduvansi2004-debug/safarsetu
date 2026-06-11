import React, { useState, useEffect } from 'react';
import { CreditCard, Landmark, CheckCircle, Smartphone, AlertTriangle, ShieldCheck, Download, ExternalLink, RefreshCw, Copy, Check } from 'lucide-react';
import { getSavedBookings, saveBookings, getSavedSettings, getSavedOrders, saveOrders } from '../state';
import { Booking, FoodOrder } from '../types';

export default function Payment() {
  const [activeMethod, setActiveMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [pendingBooking, setPendingBooking] = useState<any | null>(null);
  const [settings, setSettings] = useState(() => getSavedSettings());
  const [copied, setCopied] = useState(false);

  // Form confirmation fields
  const [utrNumber, setUtrNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // Card form fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');

  // State transitions: 'input' | 'success' | 'failure'
  const [paymentStatus, setPaymentStatus] = useState<'input' | 'success' | 'failure'>('input');
  const [finalInvoice, setFinalInvoice] = useState<any | null>(null);

  useEffect(() => {
    // Detect any booking payload registered during travel or hotel selection
    const raw = localStorage.getItem('safarsetu_pending_booking');
    if (raw) {
      setPendingBooking(JSON.parse(raw));
    }
  }, []);

  const handleMethodTab = (method: 'upi' | 'card' | 'netbanking') => {
    setActiveMethod(method);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('satyamyaduvansi2004@okicici');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handlePayNowDeepLink = () => {
    const finalAmount = pendingBooking ? pendingBooking.amount : 500;
    const paymentLink = `upi://pay?pa=satyamyaduvansi2004@okicici&pn=Satyam%20Kumar&am=${finalAmount}&cu=INR&tn=SafarSetu%20Reservation`;
    window.location.href = paymentLink;
  };

  const handleConfirmUpiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 8) {
      setPaymentStatus('failure');
      return;
    }

    processSuccessPayment('PhonePe UPI', utrNumber);
  };

  const handleConfirmCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
      alert('Please fill out all Credit/Debit Card fields.');
      return;
    }
    processSuccessPayment('Credit/Debit Card', `CRD-${Date.now().toString().slice(-6)}`);
  };

  const handleConfirmNetBankSubmit = (bankName: string) => {
    if (!bankName) return;
    processSuccessPayment(`Net Banking (${bankName})`, `NTB-${Date.now().toString().slice(-6)}`);
  };

  const processSuccessPayment = (methodUsed: string, txnRef: string) => {
    const isFood = pendingBooking?.type === 'FoodOrder';
    const finalAmount = pendingBooking ? pendingBooking.amount : 500; // fallback default custom pay
    const title = pendingBooking ? pendingBooking.title : 'Custom SafarSetu Core Reservation';
    const customerName = pendingBooking ? pendingBooking.customerName : 'Direct Guest Pay';
    const customerPhone = pendingBooking ? pendingBooking.customerPhone : '9835474866';
    const customerEmail = pendingBooking ? pendingBooking.customerEmail : 'satyamyaduvansi2004@gmail.com';

    const verifiedId = `SST-${Date.now().toString().slice(-6)}`;

    if (isFood) {
      // Find food order in localStorage and mark as paid
      const savedOrders: FoodOrder[] = getSavedOrders();
      const updated: FoodOrder[] = savedOrders.map(o => {
        if (o.id === pendingBooking.id) {
          return { ...o, status: 'Paid' as const, paymentMethod: `${methodUsed} (${txnRef})` };
        }
        return o;
      });
      saveOrders(updated);

      setFinalInvoice({
        id: pendingBooking.id,
        verifiedId,
        type: 'FoodOrder',
        title,
        amount: finalAmount,
        customerName,
        customerPhone,
        customerEmail,
        txnRef,
        method: methodUsed,
        details: 'Hot Indian food order is dispatched to preparation. Fast delivery guaranteed in 25 mins.'
      });
    } else {
      // Create and save valid Booking
      const savedBkgs = getSavedBookings();
      const newBkg: Booking = {
        id: verifiedId,
        type: pendingBooking?.type || 'Hotel',
        itemId: pendingBooking?.itemId || 'custom',
        title,
        customerName,
        customerPhone,
        customerEmail,
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: pendingBooking?.travelDate || new Date().toISOString().split('T')[0],
        amount: finalAmount,
        status: 'Confirmed',
        paymentMethod: `${methodUsed} (Ref: ${txnRef})`,
        numberOfGuests: pendingBooking?.numberOfGuests || 1,
        roomType: pendingBooking?.roomType || 'Standard Class'
      };

      savedBkgs.unshift(newBkg);
      saveBookings(savedBkgs);

      setFinalInvoice({
        id: verifiedId,
        verifiedId,
        type: pendingBooking?.type || 'Hotel',
        title,
        amount: finalAmount,
        customerName,
        customerPhone,
        customerEmail,
        txnRef,
        method: methodUsed,
        details: pendingBooking?.passengerDetails || `Package: ${pendingBooking?.roomType || 'Standard Service'}`
      });
    }

    // Clear pending cache
    localStorage.removeItem('safarsetu_pending_booking');
    setPaymentStatus('success');
  };

  const handleRetry = () => {
    setPaymentStatus('input');
    setUtrNumber('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* State 1: Input / Payment Screen */}
        {paymentStatus === 'input' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            
            {/* Payment Header */}
            <div className="bg-gradient-to-r from-blue-700 to-slate-900 text-white p-6 md:p-8">
              <span className="bg-orange-600/30 text-orange-250 border border-orange-500/20 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                SafarSetu Official Gateway
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-3 font-sans">
                Secure checkout
              </h1>
              <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed">
                Secure Payment Powered by UPI. Pay directly via our official UPI ID or choose your preferred payment method to complete your booking or food order.
              </p>
            </div>

            {/* Main Checkout Split */}
            <div className="grid grid-cols-1 lg:grid-cols-11 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* Billing Item Details (4 columns) */}
              <div className="lg:col-span-5 p-6 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Billing Information</h3>
                  {pendingBooking ? (
                    <div className="space-y-4">
                      <div className="bg-blue-100/40 border border-blue-200 p-4 rounded-2xl">
                        <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 py-0.5 px-2 rounded">
                          {pendingBooking.type} Setup
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-2">{pendingBooking.title}</h4>
                        <p className="text-[11px] text-slate-500 italic mt-1">{pendingBooking.roomType || pendingBooking.passengerDetails}</p>
                      </div>

                      <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
                        <p>👤 <b>Primary Customer:</b> {pendingBooking.customerName}</p>
                        <p>📞 <b>Contact phone:</b> {pendingBooking.customerPhone}</p>
                        <p>✉️ <b>Email address:</b> {pendingBooking.customerEmail}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center text-xs text-amber-850">
                      <p className="font-bold">No active travel or hotel selected</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        Navigate to our Bus/Train/Hotel tabs, register check-in credentials, and you will be routed back here automatically. Alternatively, process custom support payments directly below.
                      </p>
                    </div>
                  )}
                </div>

                {/* Sub amount total panel */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 mt-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 uppercase font-extrabold tracking-wider">Amount Due:</span>
                    <span className="bg-emerald-600 font-bold px-2.5 py-0.5 rounded text-[10px]">VERIFIED MERCHANT</span>
                  </div>
                  <p className="text-3xl font-black text-orange-450 font-sans mt-1.5">
                    ₹{pendingBooking ? pendingBooking.amount : 'Custom'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Authorized under Satyam Kumar merchant account.</p>
                </div>
              </div>

              {/* Secure Payment Methods Area (6 columns) */}
              <div className="lg:col-span-6 p-6">
                
                {/* Method selector Tabs */}
                <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3 mb-6">
                  <button
                    onClick={() => handleMethodTab('upi')}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 focus:outline-none cursor-pointer border-none ${activeMethod === 'upi' ? 'bg-indigo-50 text-indigo-750 font-extrabold ring-1 ring-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <Smartphone className="w-4 h-4 text-orange-500" />
                    <span>UPI Transfer</span>
                  </button>
                  <button
                    onClick={() => handleMethodTab('card')}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 focus:outline-none cursor-pointer border-none ${activeMethod === 'card' ? 'bg-indigo-50 text-indigo-750 font-extrabold ring-1 ring-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-700" />
                    <span>Cards (Debit/CC)</span>
                  </button>
                  <button
                    onClick={() => handleMethodTab('netbanking')}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 focus:outline-none cursor-pointer border-none ${activeMethod === 'netbanking' ? 'bg-indigo-50 text-indigo-750 font-extrabold ring-1 ring-indigo-200' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <Landmark className="w-4 h-4 text-emerald-600" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* TAB 1: PROFESSIONAL UPI PAYMENT */}
                {activeMethod === 'upi' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-900 border border-blue-200">
                          <Smartphone className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verify Merchant</h4>
                          <p className="text-sm font-extrabold text-blue-900">SafarSetu Official UPI Terminal</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-1">
                        {/* Account Holder Name */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-2 border-b border-slate-150/60">
                          <span className="text-xs font-semibold text-slate-500">Account Holder Name</span>
                          <span className="text-xs font-extrabold text-slate-800">Satyam Kumar</span>
                        </div>

                        {/* UPI ID Info Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-500">UPI ID</span>
                            <span className="text-sm font-mono font-bold text-blue-900 select-all">
                              satyamyaduvansi2004@okicici
                            </span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border-none ${
                              copied 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale-up" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copied ? 'Copied' : 'Copy UPI ID'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Pay Now Button */}
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={handlePayNowDeepLink}
                          className="w-full bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-xs py-3.5 rounded-full shadow-sm flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-150 cursor-pointer border-none"
                        >
                          <Smartphone className="w-4 h-4 text-orange-500" />
                          <span>Pay Now (UPI App)</span>
                        </button>
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="rounded-2xl bg-orange-50/50 border border-orange-100 p-4 space-y-2 font-sans">
                      <h4 className="text-[11px] font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                        <span>ℹ️</span> Payment Instructions
                      </h4>
                      <ol className="list-decimal list-inside text-[11px] text-orange-900 space-y-1 leading-relaxed pl-1">
                        <li><b>Copy the UPI ID</b> above (or click <b>Pay Now</b> directly on mobile)</li>
                        <li>Open any modern UPI application (such as <b>PhonePe, GPay, Paytm, BHIM</b>)</li>
                        <li>Initiate a transfer to <b>satyamyaduvansi2004@okicici</b> of the precise payable amount</li>
                        <li>Confirm the receiver name displays as <b>Satyam Kumar</b></li>
                        <li>After transferring, retrieve the <b>12-digit UPI UTR No.</b> from transaction history</li>
                        <li>Enter that 12-digit number below to verify and complete your booking</li>
                      </ol>
                    </div>

                    {/* Step-by-step transaction confirmation input */}
                    <form onSubmit={handleConfirmUpiSubmit} className="border-t border-slate-100 pt-5 space-y-3">
                      <div className="relative">
                        <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1.5">Enter 12-digit UPI Ref / UTR No. *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 612457890124"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value.replace(/\s/g, ''))}
                          className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm font-semibold outline-none focus:bg-white focus:border-blue-900"
                        />
                      </div>

                      <div className="relative">
                        <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">Payment Remarks (Optional)</label>
                        <input
                          type="text"
                          placeholder="Special requests or traveler names"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 rounded-lg px-3 pb-1 pt-4 text-xs outline-none focus:border-blue-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-full text-xs transition uppercase tracking-widest shadow-md cursor-pointer border-none"
                      >
                        Verify and Confirm Booking
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 2: CREDIT / DEBIT CARDS */}
                {activeMethod === 'card' && (
                  <form onSubmit={handleConfirmCardSubmit} className="space-y-4 animate-fade-in pt-2">
                    <span className="text-[10px] uppercase font-black text-slate-400 select-none">Enter Card Metrics</span>
                    
                    <div className="relative">
                      <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">16-Digit Card Number *</label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        placeholder="4512 8904 2314 9081"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/gs, ''))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm font-semibold outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm font-semibold outline-none"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">CVV / Security Code *</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="***"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/gs, ''))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm font-semibold outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">Card Holder Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe / Satyam Kumar"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm font-semibold outline-none"
                      />
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-[11px] leading-relaxed text-slate-500 border border-slate-100 flex gap-2 items-start">
                      <ShieldCheck className="text-emerald-600 w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                      <span>SafarSetu uses standard end-to-end 256-bit encryption. Card credentials are never stored on corporate workspace.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow"
                    >
                      Process Payment (₹{pendingBooking ? pendingBooking.amount : 'Custom'})
                    </button>
                  </form>
                )}

                {/* TAB 3: NET BANKING */}
                {activeMethod === 'netbanking' && (
                  <div className="space-y-4 animate-fade-in pt-2">
                    <span className="text-[10px] uppercase font-black text-slate-400 select-none">Supported Banks</span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Canara Bank'].map(bank => (
                        <button
                          type="button"
                          key={bank}
                          onClick={() => handleConfirmNetBankSubmit(bank)}
                          className="bg-white border hover:border-blue-700 rounded-xl p-3 text-left text-xs font-bold text-slate-800 transition flex items-center justify-between"
                        >
                          <span>{bank}</span>
                          <span className="text-[10px] text-blue-700">Pay →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* State 2: SUCCESS RECEIPT SCREEN */}
        {paymentStatus === 'success' && finalInvoice && (
          <div className="bg-white rounded-3xl border border-green-250 shadow-2xl p-6 md:p-10 text-center relative max-w-xl mx-auto overflow-hidden animate-scale-up">
            
            {/* Top design green slash bar */}
            <div className="absolute top-0 inset-x-0 h-4 bg-emerald-600"></div>

            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase bg-green-150 text-emerald-800 font-extrabold px-3 py-1 rounded">
              Payment Verified &amp; Confirmed!
            </span>

            <h2 className="text-2xl font-black text-slate-900 mt-4 leading-tight">
              Booking Receipt Generated
            </h2>
            <p className="text-xs text-slate-400 mt-1">Transaction Ref: {finalInvoice.txnRef}</p>

            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 mt-6 text-left text-xs text-slate-700 space-y-2.5 font-sans">
              <div className="flex justify-between items-center border-b border-slate-205 pb-3 mb-1">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Authorized Agency</p>
                  <p className="text-sm font-black text-blue-700">SafarSetu Travels India</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Invoice Code</p>
                  <p className="text-xs font-bold font-mono">{finalInvoice.verifiedId}</p>
                </div>
              </div>

              <p>👤 <b>Passenger / Customer Name:</b> {finalInvoice.customerName}</p>
              <p>📞 <b>Contact phone:</b> {finalInvoice.customerPhone}</p>
              <p>✉️ <b>Email Address:</b> {finalInvoice.customerEmail}</p>
              <p>📅 <b>Item Reserved:</b> <span className="font-extrabold text-slate-900">{finalInvoice.title}</span></p>
              <p>📍 <b>Inclusions:</b> {finalInvoice.details}</p>
              <p>💵 <b>Method Paid:</b> {finalInvoice.method}</p>
              
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center bg-slate-100 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl font-bold">
                <span className="text-slate-900 text-sm">Grand Amount Settled:</span>
                <span className="text-lg font-black text-emerald-700 font-sans">₹{finalInvoice.amount}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    alert('Digital boarding pass and commercial invoice downloaded successfully to localized vault (PDF).');
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs uppercase transition flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" /> Download Pass (PDF)
                </button>
                <a
                  href={`https://wa.me/919835474866?text=Hi%20Satyam%20Kumar,%20I%2520just%20completed%20the%20payment%20on%20SafarSetu.%20Verified%20Reference%20Code:%20${finalInvoice.verifiedId}.%20Please%20verify%20my%20boarding%20pass.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase transition flex items-center justify-center gap-1.5"
                >
                  WhatsApp Ticket
                </a>
              </div>

              <button
                onClick={handleRetry}
                className="text-xs text-blue-700 font-bold hover:underline"
              >
                ← Back to payment methods
              </button>
            </div>
          </div>
        )}

        {/* State 3: FAILURE SCREEN */}
        {paymentStatus === 'failure' && (
          <div className="bg-white rounded-3xl border border-red-200 shadow-2xl p-8 max-w-md mx-auto text-center animate-scale-up">
            <div className="w-16 h-16 bg-red-105 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-9 h-9" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">Upi Verification Unsuccessful</h3>
            <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
              We could not authenticate your UPI Ref or UTR transaction number. Please ensure you have completed the transfer of the exact price before confirming.
            </p>

            <div className="bg-red-50/50 p-4 rounded-xl border border-red-100 text-left text-xs text-red-800 space-y-1.5 mt-5">
              <p>• UTR Code must be a 12-digit numeric sequence (e.g. 612489012356).</p>
              <p>• Retries can be requested with no payment loss.</p>
              <p>• If funds were debited, contact chief operator Satyam Kumar at +91 9835474866.</p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleRetry}
                className="w-full bg-slate-900 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase"
              >
                Re-enter UTR Transaction ID
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
