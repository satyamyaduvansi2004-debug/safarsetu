import React, { useState } from 'react';
import { Bus, Train, Plane, MapPin, Calendar, Clock, ArrowRight, Compass, Search, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { BUS_ROUTES, TRAIN_ROUTES, FLIGHT_ROUTES, TOURIST_PLACES } from '../data';
import { BusRoute, TrainRoute, FlightRoute, TouristPlace, Booking } from '../types';

interface TravelProps {
  onNavigateToPayment: () => void;
}

export default function Travel({ onNavigateToPayment }: TravelProps) {
  const [activeTab, setActiveTab] = useState<'bus' | 'train' | 'flight' | 'places'>('bus');

  // Search Fields
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal State
  const [selectedRoute, setSelectedRoute] = useState<{
    id: string;
    type: 'Bus' | 'Train' | 'Flight';
    title: string;
    price: number;
    details: string;
  } | null>(null);

  // Form State for Booking Modal
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [passengerDetails, setPassengerDetails] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // Filtered lists
  const filteredBuses = BUS_ROUTES.filter(b => {
    if (!fromCity && !toCity) return true;
    const matchFrom = b.from.toLowerCase().includes(fromCity.toLowerCase());
    const matchTo = b.to.toLowerCase().includes(toCity.toLowerCase());
    return matchFrom && matchTo;
  });

  const filteredTrains = TRAIN_ROUTES.filter(t => {
    if (!fromCity && !toCity) return true;
    const matchFrom = t.from.toLowerCase().includes(fromCity.toLowerCase());
    const matchTo = t.to.toLowerCase().includes(toCity.toLowerCase());
    return matchFrom && matchTo;
  });

  const filteredFlights = FLIGHT_ROUTES.filter(f => {
    if (!fromCity && !toCity) return true;
    const matchFrom = f.from.toLowerCase().includes(fromCity.toLowerCase());
    const matchTo = f.to.toLowerCase().includes(toCity.toLowerCase());
    return matchFrom && matchTo;
  });

  const handleOpenBooking = (item: BusRoute | TrainRoute | FlightRoute, type: 'Bus' | 'Train' | 'Flight') => {
    let title = '';
    let price = 0;
    let details = '';

    if (type === 'Bus') {
      const bus = item as BusRoute;
      title = `Bus: ${bus.operator} (${bus.type})`;
      price = bus.price;
      details = `Leaving from ${bus.from} to ${bus.to} at ${bus.departureTime}. Seats Available: ${bus.availableSeats}.`;
    } else if (type === 'Train') {
      const train = item as TrainRoute;
      title = `Train: ${train.trainName} (#${train.trainNumber})`;
      price = train.price;
      details = `Route: ${train.from} ➔ ${train.to}. Runs on: ${train.runsOn.join(', ')}. Class Selection available on payment.`;
    } else {
      const flight = item as FlightRoute;
      title = `Flight: ${flight.airline} (${flight.flightNumber})`;
      price = flight.price;
      details = `Direct flight from ${flight.from} to ${flight.to}. Duration: ${flight.duration}. ${flight.stops === 0 ? 'Non-stop' : flight.stops + ' Stop'}`;
    }

    setSelectedRoute({ id: item.id, type, title, price, details });
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute) return;

    if (!customerName || !customerPhone || !customerEmail) {
      alert('Please fill in Name, Phone, and Email to book.');
      return;
    }

    const calculatedTotal = selectedRoute.price * numberOfGuests;

    // Create a temporary registration in localStorage to be retrieved by checkout
    const pendingBooking: Booking = {
      id: `bkg-${Date.now()}`,
      type: selectedRoute.type as any,
      itemId: selectedRoute.id,
      title: selectedRoute.title,
      customerName,
      customerPhone,
      customerEmail,
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate,
      amount: calculatedTotal,
      status: 'Pending Payment',
      passengerDetails: passengerDetails || `Qty: ${numberOfGuests} passengers`,
      numberOfGuests
    };

    localStorage.setItem('safarsetu_pending_booking', JSON.stringify(pendingBooking));
    setSelectedRoute(null);
    
    // Redirect direct to payment page
    onNavigateToPayment();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Banner */}
        <div className="text-center mb-8">
          <span className="text-blue-900 bg-blue-105/10 text-xs font-bold uppercase tracking-wider px-4.5 py-1.5 rounded-full border border-blue-200">
            India-wide Transport Services Only
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-3 font-sans uppercase">
            Explore India with <span className="text-orange-500 underline decoration-orange-500 decoration-3">SafarSetu</span>
          </h1>
          <p className="text-slate-600 text-xs md:text-sm mt-3 max-w-xl mx-auto">
            Direct high-speed bus links to Vaishali/Lalganj, premium AC express trains on Indian Railways, and direct domestic airline options.
          </p>
        </div>

        {/* Global Search Travel Bar */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-6 border border-slate-200 mb-8">
          <h2 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
            <Search className="w-4 h-4 text-orange-500" />
            Find Direct Connections (Agra, Lalganj, Patna, Delhi, Mumbai, Bengaluru, Goa, Kumarakom)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="text-[10px] uppercase font-extrabold text-slate-400 absolute left-3 top-2">From</label>
              <input
                type="text"
                placeholder="Departure station/City"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-2 pt-6 text-sm font-semibold outline-none focus:border-blue-900 focus:bg-white transition"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase font-extrabold text-slate-400 absolute left-3 top-2">To Destination</label>
              <input
                type="text"
                placeholder="Arrival city (e.g. Lalganj)"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-2 pt-6 text-sm font-semibold outline-none focus:border-blue-900 focus:bg-white transition"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase font-extrabold text-slate-400 absolute left-3 top-2">Departure Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-2 pt-6 text-sm font-semibold outline-none focus:border-blue-900 focus:bg-white transition"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFromCity('');
                  setToCity('');
                }}
                className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-705 rounded-xl font-bold text-xs transition uppercase tracking-wider cursor-pointer border-none"
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('bus')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition cursor-pointer border-none ${activeTab === 'bus' ? 'bg-blue-900 text-white shadow-sm font-extrabold' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            <Bus className="w-4 h-4 text-orange-500" />
            <span>🚌 Bus Booking</span>
          </button>
          <button
            onClick={() => setActiveTab('train')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition cursor-pointer border-none ${activeTab === 'train' ? 'bg-blue-900 text-white shadow-sm font-extrabold' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            <Train className="w-4 h-4 text-orange-500" />
            <span>🚂 Train Reservation</span>
          </button>
          <button
            onClick={() => setActiveTab('flight')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition cursor-pointer border-none ${activeTab === 'flight' ? 'bg-blue-900 text-white shadow-sm font-extrabold' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            <Plane className="w-4 h-4 text-orange-500" />
            <span>✈️ Flight Search</span>
          </button>
          <button
            onClick={() => setActiveTab('places')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition cursor-pointer border-none ${activeTab === 'places' ? 'bg-blue-900 text-white shadow-sm font-extrabold' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
          >
            <Compass className="w-4 h-4 text-orange-500" />
            <span>🗺️ India Tourist Places</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'bus' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Direct Bus Routes Available ({filteredBuses.length})</h3>
              <span className="text-xs bg-orange-100 text-orange-800 py-1 px-2 rounded-full font-bold">24x7 Customer Verification</span>
            </div>

            {filteredBuses.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-sm">
                No direct buses found matching your search. Try leaving cities blank to view all standard routes.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBuses.map((bus) => (
                  <div key={bus.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div>
                          <span className="text-[11px] font-extrabold uppercase bg-orange-50 text-orange-700 px-2 py-0.5 rounded">
                            {bus.type}
                          </span>
                          <h4 className="font-extrabold text-slate-950 text-base mt-1.5">{bus.operator}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-blue-700 font-sans">₹{bus.price}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">per seat</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 mb-4 text-slate-800 text-xs font-semibold">
                        <div className="flex flex-col">
                          <span className="text-slate-400 font-bold uppercase text-[9px] mb-1">Departure</span>
                          <span className="font-bold">{bus.from}</span>
                          <span className="text-slate-500 font-normal mt-0.5">{bus.departureTime}</span>
                        </div>
                        <ArrowRight className="text-slate-300 w-4 h-4" />
                        <div className="flex flex-col text-right">
                          <span className="text-slate-400 font-bold uppercase text-[9px] mb-1">Arrival</span>
                          <span className="font-bold">{bus.to}</span>
                          <span className="text-slate-500 font-normal mt-0.5">{bus.arrivalTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-50 pt-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-450" />
                          Duration: {bus.duration}
                        </span>
                        <span className="text-orange-600 font-bold">
                          {bus.availableSeats} Seats Left!
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(bus, 'Bus')}
                      className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-2.5 font-bold text-xs uppercase tracking-wide transition flex items-center justify-center gap-2"
                    >
                      <span>Book Seats & Proceed</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'train' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Trains on Indian Railways ({filteredTrains.length})</h3>
              <span className="text-xs bg-orange-100 text-orange-850 py-1 px-2.5 rounded-full font-bold">IRCTC Partner Inquiries</span>
            </div>

            {filteredTrains.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-sm">
                No major trains found matching your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTrains.map((train) => (
                  <div key={train.id} className="bg-white border border-slate-250 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-blue-300 transition">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                          Train {train.trainNumber}
                        </span>
                        <h4 className="font-extrabold text-slate-950 text-base">{train.trainName}</h4>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-800 font-semibold">
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[9px]">Route departure</p>
                          <p className="font-bold text-slate-800 mt-0.5">{train.from}</p>
                          <p className="text-slate-500 font-normal">{train.departureTime}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[9px]">Arrival point</p>
                          <p className="font-bold text-slate-800 mt-0.5">{train.to}</p>
                          <p className="text-slate-500 font-normal">{train.arrivalTime}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[9px]">Duration</p>
                          <p className="font-bold text-slate-800 mt-0.5">{train.duration}</p>
                          <p className="text-slate-500 font-normal">Express run</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-bold uppercase text-[9px]">Classes</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {train.classes.map(cl => (
                              <span key={cl} className="bg-white border border-slate-200 text-[10px] px-1.5 rounded font-mono font-bold">
                                {cl}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        <span>Runs on: <b className="text-slate-700">{train.runsOn.join(', ')}</b></span>
                      </div>
                    </div>

                    <div className="text-left md:text-right flex md:flex-col justify-between items-center md:items-end border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Fare starting from</span>
                        <p className="text-xl font-black text-orange-600 font-sans mt-0.5">₹{train.price}</p>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(train, 'Train')}
                        className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-2 px-4 font-bold text-xs uppercase tracking-wide transition flex items-center gap-2"
                      >
                        Book Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'flight' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-slate-900">Domestic Flights Search ({filteredFlights.length})</h3>
              <span className="text-xs bg-orange-100 text-orange-800 py-1 px-2 rounded-full font-bold">Secure Airline Bilaterals</span>
            </div>

            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-sm">
                No flights found matching your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredFlights.map((flight) => (
                  <div key={flight.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center font-bold text-orange-600">
                        ✈️
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">{flight.airline}</h4>
                        <span className="text-xs text-slate-400 font-mono">Flight {flight.flightNumber}</span>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-2 text-center max-w-md mx-auto w-full">
                      <div className="text-left">
                        <p className="text-lg font-bold text-slate-800 font-sans">{flight.departureTime}</p>
                        <p className="text-slate-500 font-bold uppercase text-[11px]">{flight.from.split(' ')[0]}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center text-slate-700">
                        <p className="text-xs text-slate-400 font-medium">{flight.duration}</p>
                        <div className="h-0.5 bg-slate-200 w-20 relative my-1">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold">{flight.stops === 0 ? 'Non-Stop' : flight.stops + ' Stop'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-800 font-sans">{flight.arrivalTime}</p>
                        <p className="text-slate-500 font-bold uppercase text-[11px]">{flight.to.split(' ')[0]}</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto border-t md:border-t-0 p-3 md:p-0 border-slate-50 gap-4 mt-2 md:mt-0">
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold text-right hidden md:block">Price including GST</p>
                        <p className="text-xl font-extrabold text-blue-700 font-sans">₹{flight.price}</p>
                      </div>
                      <button
                        onClick={() => handleOpenBooking(flight, 'Flight')}
                        className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-2 px-4 text-xs font-bold uppercase transition"
                      >
                        Select Flight
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'places' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Popular Destinations in India</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOURIST_PLACES.map((place) => (
                <div key={place.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                  <div className="relative">
                    <img
                      src={place.image}
                      alt={place.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-44 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-blue-700/95 backdrop-blur text-white text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider">
                      {place.state}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-950 text-base">{place.name}</h4>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-3">
                        {place.description}
                      </p>
                      <div className="bg-slate-50 rounded-xl p-2.5 mt-3 text-[11px] space-y-1.5 border border-slate-100">
                        <p className="text-slate-600">🏛️ <b>Famous For:</b> {place.famousFor}</p>
                        <p className="text-slate-600">📅 <b>Best Time:</b> {place.bestTimeToVisit}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Autofill Search Cities
                        setFromCity('Patna');
                        if (place.name.includes('Pillar') || place.name.includes('Vaishali')) {
                          setToCity('Lalganj');
                        } else if (place.name.includes('Taj Mahal')) {
                          setToCity('Agra');
                        } else if (place.name.includes('Wayanad')) {
                          setToCity('Kerala');
                        } else if (place.name.includes('Pink')) {
                          setToCity('Jaipur');
                        }
                        // Focus on Bus tab to search bookings
                        setActiveTab('bus');
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="mt-4 w-full border border-blue-200 hover:border-blue-700 text-blue-700 hover:bg-blue-50 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wide text-center"
                    >
                      Plan & Book Travel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Booking Form */}
        {selectedRoute && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-850 text-white p-5">
                <span className="text-[10px] uppercase font-black text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
                  Confirm Ticket Reservation
                </span>
                <h3 className="text-lg font-bold mt-1 max-w-[90%]">{selectedRoute.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedRoute.details}</p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleConfirmReservation} className="p-6 overflow-y-auto space-y-4">
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex justify-between items-center text-xs text-slate-800">
                  <div>
                    <span className="text-slate-500 font-medium">Ticket Price (per person)</span>
                    <p className="text-lg font-black text-blue-700 font-sans mt-0.5">₹{selectedRoute.price}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 font-medium">Passenger Count</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setNumberOfGuests(Math.max(1, numberOfGuests - 1))}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 w-7 h-7 rounded-lg font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm w-5 text-center">{numberOfGuests}</span>
                      <button
                        type="button"
                        onClick={() => setNumberOfGuests(Math.min(10, numberOfGuests + 1))}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 w-7 h-7 rounded-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-extrabold uppercase text-slate-400 mb-2">Passenger Information Required</p>
                  <div className="space-y-3">
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-550 absolute left-3 top-1.5 uppercase">Primary Traveler Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe / Jane Doe"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <label className="text-[10px] font-bold text-slate-550 absolute left-3 top-1.5 uppercase">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="e.g. 9835474866"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/gs, ''))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                        />
                      </div>
                      <div className="relative">
                        <label className="text-[10px] font-bold text-slate-550 absolute left-3 top-1.5 uppercase">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="primary@traveler.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-sm outline-none focus:border-blue-700 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-550 absolute left-3 top-1.5 uppercase">Other Passenger Details (Age / Gender / Seat)</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Passenger 2: Emily Watson (Age 32), Preferred window seat if possible."
                        value={passengerDetails}
                        onChange={(e) => setPassengerDetails(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 pb-1.5 pt-5 text-xs outline-none focus:border-blue-700 focus:bg-white transition resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Total Calculations */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold">Grand Total</span>
                    <p className="text-xl font-black text-orange-400 font-sans">₹{selectedRoute.price * numberOfGuests}</p>
                  </div>
                  <span className="text-[11px] text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    Includes GST & Levies
                  </span>
                </div>

                {/* Controls */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRoute(null)}
                    className="w-1/2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-xs transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Proceed to UPI Pay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
