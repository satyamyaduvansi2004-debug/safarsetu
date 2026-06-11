import React, { useState } from 'react';
import { Search, MapPin, Star, Sparkles, AlertCircle, ArrowRight, BedDouble, Calendar, Users, Coffee } from 'lucide-react';
import { getSavedHotels } from '../state';
import { Hotel, Booking } from '../types';

interface HotelsProps {
  onNavigateToPayment: () => void;
}

export default function Hotels({ onNavigateToPayment }: HotelsProps) {
  const [hotels, setHotels] = useState<Hotel[]>(() => getSavedHotels());
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityChip, setSelectedCityChip] = useState<string | null>(null);
  
  // Hotel Booking Modal
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  
  // Form Reservation fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [roomType, setRoomType] = useState('Standard A/C Room');

  // Filter Hotels
  const filteredHotels = hotels.filter(h => {
    const searchLower = searchQuery.toLowerCase();
    const cityStateName = `${h.name} ${h.city} ${h.state}`.toLowerCase();
    const matchesSearch = cityStateName.includes(searchLower);
    
    if (selectedCityChip) {
      const matchesChip = h.city.toLowerCase() === selectedCityChip.toLowerCase() || h.state.toLowerCase() === selectedCityChip.toLowerCase();
      return matchesSearch && matchesChip;
    }
    return matchesSearch;
  });

  const popularCities = ['Lalganj', 'Kumarakom', 'Jaipur', 'Mumbai', 'Manali', 'Varanasi'];

  const handleStartBooking = (hotel: Hotel) => {
    setBookingHotel(hotel);
  };

  const handleConfirmHotelStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingHotel) return;

    if (!customerName || !customerPhone || !customerEmail) {
      alert('Please fill out all required passenger details.');
      return;
    }

    const pricePerNight = bookingHotel.pricePerNight;
    const finalAmount = pricePerNight * numberOfNights;

    const pendingBooking: Booking = {
      id: `hotel-bkg-${Date.now()}`,
      type: 'Hotel',
      itemId: bookingHotel.id,
      title: `${bookingHotel.name} - ${bookingHotel.city}`,
      customerName,
      customerPhone,
      customerEmail,
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate: checkInDate,
      amount: finalAmount,
      status: 'Pending Payment',
      numberOfGuests,
      roomType: `${roomType} (${numberOfNights} Nights)`
    };

    localStorage.setItem('safarsetu_pending_booking', JSON.stringify(pendingBooking));
    setBookingHotel(null);

    // Go to secure payment page directly
    onNavigateToPayment();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-orange-600 bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest px-4.5 py-1.5 rounded-full shadow-sm">
            Premium Indian Hospitality
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-3 font-sans animate-fade-in uppercase">
            Reserve Your Comfort Stay <span className="border-b-4 border-orange-500 w-16 block mt-2 mx-auto"></span>
          </h1>
          <p className="text-slate-550 text-xs md:text-sm mt-3 max-w-xl mx-auto">
            Book verified homestays, royal palaces, or Modern business residences (including Vaishali Lalganj&apos;s premium properties) with direct UPI reservation support.
          </p>
        </div>

        {/* Search Bar / Filters */}
        <div className="bg-white rounded-3xl shadow-sm p-4 border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by hotel name, city (e.g. Lalganj, Mumbai) or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:bg-white focus:border-blue-900 transition"
            />
          </div>

          <div className="md:col-span-6 flex flex-wrap gap-1.5 items-center justify-start md:justify-end">
            <span className="text-xs text-slate-400 font-bold uppercase mr-1">Popular Quick-Select:</span>
            <button
              onClick={() => setSelectedCityChip(null)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition cursor-pointer border-none ${!selectedCityChip ? 'bg-orange-500 text-white shadow-sm' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'}`}
            >
              All States
            </button>
            {popularCities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCityChip(city)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition cursor-pointer border-none ${selectedCityChip === city ? 'bg-orange-500 text-white shadow-sm' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Hotel Listings Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-900 uppercase tracking-tight">
              {filteredHotels.length} Luxury Stays Registered across India
            </h3>
            {selectedCityChip && (
              <span className="text-xs text-blue-900 font-bold bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase">
                Filter: {selectedCityChip}
              </span>
            )}
          </div>

          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-slate-250 text-center shadow-inner">
              <AlertCircle className="w-12 h-12 text-slate-350 mx-auto mb-3" />
              <h4 className="text-slate-800 font-bold text-lg">No properties match your current filters</h4>
              <p className="text-slate-500 text-xs mt-1.5">Try searching with a clean keyword or click &apos;All States&apos; to view full listings.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCityChip(null);
                }}
                className="mt-4 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-5 py-2 rounded-full cursor-pointer border-none"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between group">
                  
                  {/* Photo area with pricing/ratings tags */}
                  <div className="relative overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
                    />
                    
                    {/* Featured label overlay */}
                    {hotel.featured && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-wider py-1 px-2.5 rounded-full shadow flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> SafarSetu Core Choice
                      </span>
                    )}

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur text-white px-3 py-1.5 rounded-xl font-bold font-sans text-xs">
                      <span className="text-[10px] text-slate-300 font-normal">Starting </span>
                      <span className="text-orange-400 text-sm font-black">₹{hotel.pricePerNight}</span>
                      <span className="text-[9px] text-slate-300"> / night</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-550 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span>{hotel.city}, {hotel.state}</span>
                      </div>

                      <h4 className="font-extrabold text-slate-950 text-base mt-2 line-clamp-1 group-hover:text-blue-750 transition">
                        {hotel.name}
                      </h4>

                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-slate-800 font-extrabold">{hotel.rating}</span>
                        <span className="text-slate-400">({hotel.reviewsCount} local reviews)</span>
                      </div>

                      <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3">
                        {hotel.description}
                      </p>

                      {/* Amenities Grid */}
                      <div className="flex flex-wrap gap-1 mt-4">
                        {hotel.amenities.map(am => (
                          <span 
                            key={am} 
                            className="bg-slate-50 border border-slate-100 text-[10px] text-slate-600 px-2 py-0.5 rounded-full font-semibold"
                          >
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartBooking(hotel)}
                      className="mt-6 w-full bg-blue-900 hover:bg-orange-600 text-white rounded-full py-3 text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 shadow-sm border-none cursor-pointer"
                    >
                      <span>Book Stay Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hotel Booking Modal */}
        {bookingHotel && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-150 flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-800 to-slate-900 text-white p-5 flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-black text-orange-450 tracking-wider">
                    Secure Room Reservation
                  </span>
                  <h3 className="text-lg font-bold mt-1 text-white">{bookingHotel.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>{bookingHotel.city}, {bookingHotel.state}</span>
                  </div>
                </div>
                <button
                  onClick={() => setBookingHotel(null)}
                  className="text-slate-400 hover:text-white font-extrabold text-sm p-1.5"
                >
                  ✕
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleConfirmHotelStore} className="p-6 overflow-y-auto space-y-4">
                
                {/* Cost calc banner */}
                <div className="bg-slate-55 shadow-inner border border-slate-200 rounded-2xl p-4 flex flex-wrap justify-between items-center text-xs text-slate-800">
                  <div>
                    <span className="text-slate-500 font-bold">Price per Night</span>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">₹{bookingHotel.pricePerNight}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div>
                      <span className="text-slate-500 font-bold">Stay Duration</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setNumberOfNights(Math.max(1, numberOfNights - 1))}
                          className="bg-white border text-center font-black w-6 h-6 rounded"
                        >
                          -
                        </button>
                        <span className="font-bold">{numberOfNights} Night(s)</span>
                        <button
                          type="button"
                          onClick={() => setNumberOfNights(Math.min(30, numberOfNights + 1))}
                          className="bg-white border text-center font-black w-6 h-6 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-3.5">
                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1.5">Primary Guest Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satyam Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm outline-none focus:bg-white focus:border-blue-750"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-35">
                    <div className="relative col-span-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1.5">Mobile Contact *</label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="e.g. 9835474866"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/gs, ''))}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm outline-none focus:bg-white focus:border-blue-750"
                      />
                    </div>
                    
                    <div className="relative col-span-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="guest@mailserver.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm outline-none focus:bg-white focus:border-blue-750"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1.5">In Date *</label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm outline-none focus:bg-white focus:border-blue-750"
                      />
                    </div>

                    <div className="relative">
                      <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1.5">Prefer Room Configuration</label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm outline-none focus:bg-white focus:border-blue-750"
                      >
                        <option value="Standard A/C Room">Standard A/C Room</option>
                        <option value="Deluxe Couple Stay">Deluxe Couple Stay</option>
                        <option value="Executive Club Suite">Executive Club Suite (King Bed)</option>
                        <option value="Royal Heritage Family Villa">Royal Heritage Family Villa</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-400 uppercase absolute left-3 top-1.5">Number of Guests</label>
                    <select
                      value={numberOfGuests}
                      onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 pb-2 pt-6 text-sm outline-none"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Family Guests</option>
                    </select>
                  </div>
                </div>

                {/* Sub Total */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Estimated Total Cost</span>
                    <p className="text-xl font-black text-orange-400 font-sans mt-0.5">₹{bookingHotel.pricePerNight * numberOfNights}</p>
                  </div>
                  <span className="text-[11px] bg-slate-800 text-slate-300 py-1 px-2 rounded border border-slate-700">
                    Pay on Scan to Satyam Kumar
                  </span>
                </div>

                {/* Action CTA */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setBookingHotel(null)}
                    className="w-1/2 border border-slate-250 hover:bg-slate-100 py-3 rounded-xl text-xs font-bold transition text-slate-705"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-xs font-bold transition shadow-md"
                  >
                    Complete Registration & Pay
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
