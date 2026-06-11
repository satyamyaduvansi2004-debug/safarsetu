import React, { useState } from 'react';
import { 
  getSavedHotels, saveHotels, 
  getSavedRestaurants, saveRestaurants, 
  getSavedBookings, saveBookings, 
  getSavedOrders, saveOrders, 
  getSavedEnquiries, saveEnquiries, 
  getSavedSettings, saveSettings 
} from '../state';
import { Hotel, Restaurant, Booking, FoodOrder, Enquiry, AdminSettings, MenuItem } from '../types';
import { 
  Hotel as HotelIcon, Utensils, CreditCard, Compass, Briefcase, 
  Trash2, Plus, Edit2, Check, X, ClipboardList, ShoppingBag, 
  HelpCircle, CheckCircle, Save, Undo
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'restaurants' | 'bookings' | 'orders' | 'enquiries' | 'settings'>('hotels');

  // Load States directly from local state managers
  const [hotels, setHotels] = useState<Hotel[]>(() => getSavedHotels());
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => getSavedRestaurants());
  const [bookings, setBookings] = useState<Booking[]>(() => getSavedBookings());
  const [orders, setOrders] = useState<FoodOrder[]>(() => getSavedOrders());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => getSavedEnquiries());
  const [settings, setSettings] = useState<AdminSettings>(() => getSavedSettings());

  // Editing Forms / Modal States
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Hotel form state
  const [hotelName, setHotelName] = useState('');
  const [hotelCity, setHotelCity] = useState('');
  const [hotelState, setHotelState] = useState('');
  const [hotelImage, setHotelImage] = useState('');
  const [hotelPrice, setHotelPrice] = useState(2500);
  const [hotelRating, setHotelRating] = useState(4.5);
  const [hotelAmenities, setHotelAmenities] = useState('Free WiFi, A/C, Restaurant');
  const [hotelDesc, setHotelDesc] = useState('');
  const [hotelFeatured, setHotelFeatured] = useState(false);

  // Restaurant form modal
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  // Restaurant fields
  const [restName, setRestName] = useState('');
  const [restCuisine, setRestCuisine] = useState('');
  const [restRating, setRestRating] = useState(4.5);
  const [restTime, setRestTime] = useState('20-30 min');
  const [restImage, setRestImage] = useState('');
  const [restFeatured, setRestFeatured] = useState(false);

  // UPI Merchant Settings Fields
  const [upiName, setUpiName] = useState(settings.upiName);
  const [upiPhone, setUpiPhone] = useState(settings.upiPhonePeNumber);

  // ----------------- HOTEL ADMIN ACTIONS -----------------
  const handleOpenAddHotel = () => {
    setSelectedHotel(null);
    setHotelName('');
    setHotelCity('');
    setHotelState('');
    setHotelImage('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80');
    setHotelPrice(3000);
    setHotelRating(4.5);
    setHotelAmenities('Free WiFi, Free Parking, A/C, Multi-cuisine Restaurant');
    setHotelDesc('');
    setHotelFeatured(false);
    setShowHotelModal(true);
  };

  const handleOpenEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setHotelName(hotel.name);
    setHotelCity(hotel.city);
    setHotelState(hotel.state);
    setHotelImage(hotel.image);
    setHotelPrice(hotel.pricePerNight);
    setHotelRating(hotel.rating);
    setHotelAmenities(hotel.amenities.join(', '));
    setHotelDesc(hotel.description);
    setHotelFeatured(!!hotel.featured);
    setShowHotelModal(true);
  };

  const handleSaveHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName || !hotelCity || !hotelState) {
      alert('Please fill out Name, City and State.');
      return;
    }

    const compiledAmenities = hotelAmenities.split(',').map(a => a.trim()).filter(Boolean);

    let updatedHotels: Hotel[] = [];

    if (selectedHotel) {
      // Edit
      updatedHotels = hotels.map(h => {
        if (h.id === selectedHotel.id) {
          return {
            ...h,
            name: hotelName,
            city: hotelCity,
            state: hotelState,
            image: hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            pricePerNight: Number(hotelPrice),
            rating: Number(hotelRating),
            amenities: compiledAmenities,
            description: hotelDesc,
            featured: hotelFeatured
          };
        }
        return h;
      });
    } else {
      // Create new
      const newHotel: Hotel = {
        id: `h-${Date.now()}`,
        name: hotelName,
        city: hotelCity,
        state: hotelState,
        image: hotelImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        pricePerNight: Number(hotelPrice),
        rating: Number(hotelRating),
        reviewsCount: 1,
        amenities: compiledAmenities,
        description: hotelDesc || 'Modern premium hotel room curated by SafarSetu.',
        featured: hotelFeatured
      };
      updatedHotels = [newHotel, ...hotels];
    }

    setHotels(updatedHotels);
    saveHotels(updatedHotels);
    setShowHotelModal(false);
  };

  const handleDeleteHotel = (hotelId: string) => {
    if (!confirm('Are you sure you want to delete this hotel? This is irreversible.')) return;
    const updated = hotels.filter(h => h.id !== hotelId);
    setHotels(updated);
    saveHotels(updated);
  };

  // ----------------- RESTAURANT ADMIN ACTIONS -----------------
  const handleOpenAddRest = () => {
    setSelectedRestaurant(null);
    setRestName('');
    setRestCuisine('');
    setRestRating(4.5);
    setRestTime('15-20 min');
    setRestImage('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80');
    setRestFeatured(false);
    setShowRestaurantModal(true);
  };

  const handleOpenEditRest = (rest: Restaurant) => {
    setSelectedRestaurant(rest);
    setRestName(rest.name);
    setRestCuisine(rest.cuisine);
    setRestRating(rest.rating);
    setRestTime(rest.deliveryTime);
    setRestImage(rest.image);
    setRestFeatured(!!rest.featured);
    setShowRestaurantModal(true);
  };

  const handleSaveRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restName || !restCuisine) {
      alert('Please fill out Name and Cuisines.');
      return;
    }

    let updated: Restaurant[] = [];

    if (selectedRestaurant) {
      updated = restaurants.map(r => {
        if (r.id === selectedRestaurant.id) {
          return {
            ...r,
            name: restName,
            cuisine: restCuisine,
            rating: Number(restRating),
            deliveryTime: restTime,
            image: restImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            featured: restFeatured
          };
        }
        return r;
      });
    } else {
      const newRest: Restaurant = {
        id: `r-${Date.now()}`,
        name: restName,
        cuisine: restCuisine,
        rating: Number(restRating),
        deliveryTime: restTime,
        image: restImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        featured: restFeatured,
        menu: [
          // Give new restaurants a default delicious starter menu
          { id: `m-${Date.now()}-1`, name: 'Authentic Masala Dosa', category: 'Veg', price: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80', description: 'Classic crispy rice crepe served with sambar.' },
          { id: `m-${Date.now()}-2`, name: 'Indian Saffron Rabri', category: 'Sweets', price: 90, rating: 4.9, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80', description: 'Rich sweet caramelized milk dessert.' }
        ]
      };
      updated = [newRest, ...restaurants];
    }

    setRestaurants(updated);
    saveRestaurants(updated);
    setShowRestaurantModal(false);
  };

  const handleDeleteRestaurant = (restId: string) => {
    if (!confirm('Are you sure you want to delete this restaurant and all associated menu items?')) return;
    const updated = restaurants.filter(r => r.id !== restId);
    setRestaurants(updated);
    saveRestaurants(updated);
  };

  // ----------------- BOOKINGS ACTIONS -----------------
  const handleUpdateBookingStatus = (id: string, newStatus: any) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    saveBookings(updated);
  };

  const handleDeleteBooking = (id: string) => {
    if (!confirm('Cancel/Delete this booking transaction row?')) return;
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    saveBookings(updated);
  };

  // ----------------- ORDERS ACTIONS -----------------
  const handleUpdateOrderStatus = (id: string, newStatus: any) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    saveOrders(updated);
  };

  const handleDeleteOrder = (id: string) => {
    if (!confirm('Delete this food order?')) return;
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    saveOrders(updated);
  };

  // ----------------- ENQUIRIES ACTIONS -----------------
  const handleUpdateEnquiryStatus = (id: string, newStatus: any) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e);
    setEnquiries(updated);
    saveEnquiries(updated);
  };

  const handleDeleteEnquiry = (id: string) => {
    if (!confirm('Remove this enquiry row?')) return;
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    saveEnquiries(updated);
  };

  // ----------------- UPI PAYMENT SETTINGS ACTIONS -----------------
  const handleSaveUpiSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiName || !upiPhone) {
      alert('Please fill out holder name and PhonePe number.');
      return;
    }

    const updatedSettings: AdminSettings = {
      upiName,
      upiPhonePeNumber: upiPhone,
      qrCodeUrl: ''
    };

    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    alert('SafarSetu UPI Merchant settings updated successfully!');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative overflow-hidden shadow-lg border border-slate-850">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-450 bg-orange-450/10 px-2.5 py-1 rounded">
              Secure Admin Console
            </span>
            <h1 className="text-2xl md:text-3xl font-black mt-2 font-sans">
              Control Panel &amp; Inventory Manager
            </h1>
            <p className="text-slate-400 text-xs mt-1.5">
              Proprietor: <span className="text-white font-bold">Satyam Kumar</span> | Lalganj Office, Vaishali, Bihar.
            </p>
          </div>
          
          <div className="flex gap-2 relative z-10">
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-1.5 px-3 rounded-xl font-bold flex items-center gap-1.5">
              ● Server Online
            </span>
          </div>
        </div>

        {/* Dashboard Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left menu Sidebar list (1 column) */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-201 p-4 shadow-sm space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider pl-2 block mb-2 select-none">
              Console Modules
            </span>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${activeTab === 'hotels' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <HotelIcon className="w-4.5 h-4.5" />
              <span>🏨 Manage Hotels</span>
            </button>

            <button
              onClick={() => setActiveTab('restaurants')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${activeTab === 'restaurants' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <Utensils className="w-4.5 h-4.5" />
              <span>🍔 Manage Dining</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${activeTab === 'bookings' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <ClipboardList className="w-4.5 h-4.5" />
              <span>📝 Manage Bookings</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${activeTab === 'orders' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>🍕 Manage Food Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${activeTab === 'enquiries' ? 'bg-blue-700 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <HelpCircle className="w-4.5 h-4.5" />
              <span>💬 Enquiries ({enquiries.filter(e => e.status === 'New').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${activeTab === 'settings' ? 'bg-blue-750 text-white shadow' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <CreditCard className="w-4.5 h-4.5" />
              <span>💳 UPI Merchant Config</span>
            </button>
          </div>

          {/* Right main workspace (3 columns) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm min-h-[500px]">
            
            {/* TAB 1: HOTELS WORKSPACE */}
            {activeTab === 'hotels' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Registered Properties &amp; Hotels</h2>
                    <p className="text-slate-500 text-xs">Total properties: {hotels.length}</p>
                  </div>
                  <button
                    onClick={handleOpenAddHotel}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition uppercase tracking-wide"
                  >
                    <Plus className="w-4 h-4" /> Add New Hotel
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse grid-cols-1">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black">
                        <th className="py-2.5">Hotel / Location</th>
                        <th className="py-2.5">Price</th>
                        <th className="py-2.5 text-center">Rating</th>
                        <th className="py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs">
                      {hotels.map(h => (
                        <tr key={h.id} className="hover:bg-slate-50/50">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={h.image} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                              <div>
                                <h4 className="font-bold text-slate-900">{h.name}</h4>
                                <span className="text-[10px] text-slate-400">{h.city}, {h.state}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 font-semibold font-sans">₹{h.pricePerNight}/night</td>
                          <td className="py-3 text-center">★ {h.rating}</td>
                          <td className="py-3 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditHotel(h)}
                              className="text-blue-750 hover:bg-blue-50 p-2 rounded-lg transition inline-flex items-center"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteHotel(h.id)}
                              className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition inline-flex items-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: DINING / REST DELIVERIES WORKSPACE */}
            {activeTab === 'restaurants' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Restaurants Directory</h2>
                    <p className="text-slate-500 text-xs">Live restaurants: {restaurants.length}</p>
                  </div>
                  <button
                    onClick={handleOpenAddRest}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition uppercase"
                  >
                    <Plus className="w-4 h-4" /> Add Restaurant
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black">
                        <th className="py-2.5">Restaurant Details</th>
                        <th className="py-2.5">Cuisine Specialties</th>
                        <th className="py-2.5">Time</th>
                        <th className="py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs">
                      {restaurants.map(r => (
                        <tr key={r.id} className="hover:bg-slate-50/50">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={r.image} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                              <h4 className="font-bold text-slate-900">{r.name}</h4>
                            </div>
                          </td>
                          <td className="py-3 text-slate-600">{r.cuisine}</td>
                          <td className="py-3 text-slate-505 font-medium">⏱ {r.deliveryTime}</td>
                          <td className="py-3 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditRest(r)}
                              className="text-blue-750 hover:bg-blue-50 p-2 rounded-lg transition inline-flex"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRestaurant(r.id)}
                              className="text-red-500 hover:bg-red-55 p-2 rounded-lg transition inline-flex"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: MANAGE BOOKINGS WORKSPACE */}
            {activeTab === 'bookings' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-sans">Manage Transport &amp; Hotel Bookings</h2>
                  <p className="text-slate-500 text-xs">Approve physical UPI tickets received via Satyam Kumar PhonePe accounts.</p>
                </div>

                <div className="overflow-x-auto">
                  {bookings.length === 0 ? (
                    <p className="text-center py-6 text-slate-400">No active travel/hotel bookings recorded yet.</p>
                  ) : (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black">
                          <th className="py-2.5">ID / Date</th>
                          <th className="py-2.5">Passenger Details</th>
                          <th className="py-2.5">Trip Details</th>
                          <th className="py-2.5">Settled</th>
                          <th className="py-2.5">State</th>
                          <th className="py-2.5 text-right">Toggle</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs">
                        {bookings.map(b => (
                          <tr key={b.id} className="hover:bg-slate-50">
                            <td className="py-3">
                              <span className="font-extrabold font-mono block text-blue-700">{b.id}</span>
                              <span className="text-[10px] text-slate-400">{b.bookingDate}</span>
                            </td>
                            <td className="py-3 font-semibold text-slate-900">
                              <p className="font-bold">{b.customerName}</p>
                              <p className="text-[10px] text-slate-400 font-normal">{b.customerPhone}</p>
                            </td>
                            <td className="py-3">
                              <span className="font-bold text-slate-800">{b.title}</span>
                              <span className="text-[10px] text-slate-400 block">{b.passengerDetails || b.roomType}</span>
                            </td>
                            <td className="py-3 font-bold font-sans">₹{b.amount}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === 'Confirmed' || b.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-50 text-orange-850'}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3 text-right space-x-1 whitespace-nowrap">
                              {b.status === 'Pending Payment' ? (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                                  className="bg-green-600 hover:bg-green-700 text-white font-bold p-1 rounded-lg text-[10px]"
                                  title="Mark as Confirmed"
                                >
                                  ✔ Clear
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'Pending Payment')}
                                  className="border hover:bg-slate-100 p-1 rounded text-[10px]"
                                  title="Revoke Clear"
                                >
                                  ↩ Revoke
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="text-red-500 hover:bg-red-50 p-1 rounded"
                              >
                                🗑
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: MANAGE FOOD ORDERS WORKSPACE */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Kitchen & Meal Delivers Queue</h2>
                  <p className="text-slate-500 text-xs">Review food dishes ordered by diners.</p>
                </div>

                <div className="overflow-x-auto">
                  {orders.length === 0 ? (
                    <p className="text-center py-6 text-slate-400">0 active food orders today.</p>
                  ) : (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black">
                          <th className="py-2.5">Order Info</th>
                          <th className="py-2.5">Items / Menu</th>
                          <th className="py-2.5">Address</th>
                          <th className="py-2.5">Total due</th>
                          <th className="py-2.5">Status Flow</th>
                          <th className="py-2.5 text-right">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-xs">
                        {orders.map(o => (
                          <tr key={o.id} className="hover:bg-slate-50">
                            <td className="py-3">
                              <span className="font-extrabold font-mono text-orange-600 block">ORD #{o.id}</span>
                              <span className="text-[10px] text-slate-450">{o.restaurantName}</span>
                            </td>
                            <td className="py-3 font-semibold text-slate-800">
                              <div className="space-y-0.5">
                                {o.items.map(item => (
                                  <p key={item.id} className="text-xs">
                                    {item.name} <span className="text-slate-400">x{item.quantity}</span>
                                  </p>
                                ))}
                              </div>
                            </td>
                            <td className="py-3">
                              <p className="font-bold">{o.customerName}</p>
                              <span className="text-[10px] text-slate-400 block line-clamp-1">{o.customerAddress} (📞{o.customerPhone})</span>
                            </td>
                            <td className="py-3 font-bold font-sans">₹{o.grandTotal}</td>
                            <td className="py-3">
                              <select
                                value={o.status}
                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                                className={`p-1.5 rounded font-bold border-none text-[10px] outline-none ${o.status === 'Delivered' ? 'bg-green-150 text-green-800' : o.status === 'Cooking' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}
                              >
                                <option value="Pending Payment">Pending Payment</option>
                                <option value="Cooking">Cooking Cooking</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered Done</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 text-right">
                              <button onClick={() => handleDeleteOrder(o.id)} className="text-red-500 hover:bg-slate-100 p-2 rounded">
                                🗑
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: MANAGE CUSTOMER ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Support Enquiries received</h2>
                  <p className="text-slate-500 text-xs">Direct messages sent to the support desk.</p>
                </div>

                <div className="space-y-4">
                  {enquiries.length === 0 ? (
                    <p className="text-center py-6 text-slate-400">Zero pending customer tickets.</p>
                  ) : (
                    enquiries.map(enq => (
                      <div key={enq.id} className={`p-4 rounded-2xl border ${enq.status === 'New' ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200 bg-white'}`}>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-[10px] font-black uppercase text-blue-750 bg-blue-105 py-0.5 px-2 rounded">
                              {enq.subject}
                            </span>
                            <h4 className="font-bold text-slate-950 mt-1">{enq.name}</h4>
                            <span className="text-[10px] text-slate-400">{enq.email} | 📞{enq.phone} | Date: {enq.date}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {enq.status === 'New' ? (
                              <button
                                onClick={() => handleUpdateEnquiryStatus(enq.id, 'Resolved')}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2.5 rounded text-[10px] uppercase cursor-pointer"
                              >
                                Mark Resolved ✔
                              </button>
                            ) : (
                              <span className="text-xs bg-green-150 text-green-800 py-1 px-2.5 rounded-full font-bold">
                                Resolved
                              </span>
                            )}
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="text-red-505 hover:bg-red-50 p-1.5 rounded"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-650 leading-relaxed mt-3 bg-white p-3 rounded-xl border border-slate-105">
                          {enq.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 6: UPI MERCHANT SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveUpiSettings} className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">UPI Merchant Account Settings</h2>
                  <p className="text-slate-550 text-xs">Modify the default merchant details rendering on payment views and checkout fields throughout SafarSetu.</p>
                </div>

                <div className="space-y-4 max-w-sm">
                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">UPI Account Holder Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Satyam Kumar"
                      value={upiName}
                      onChange={(e) => setUpiName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 pb-1.5 pt-5 text-sm font-semibold outline-none focus:bg-white focus:border-blue-700"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[9px] font-bold text-slate-500 uppercase absolute left-3 top-1">PhonePe Merchant Mobile Contact *</label>
                    <input
                      type="text"
                      required
                      placeholder="9835474866"
                      value={upiPhone}
                      onChange={(e) => setUpiPhone(e.target.value.replace(/\D/gs, ''))}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 pb-1.5 pt-5 text-sm font-semibold outline-none focus:bg-white focus:border-blue-700"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1.5">
                    <p className="font-bold text-slate-700">📌 Verification Note:</p>
                    <p>Updating these values adapts the visual checkout automatically, ensuring funds always transfer under your primary UPI identity safely.</p>
                  </div>

                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wide transition shadow-md w-full"
                  >
                    Save UPI Configurations
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Modal form for Adding/Editing Hotels */}
        {showHotelModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-150 relative">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3">
                {selectedHotel ? `Editing Hotel: ${selectedHotel.name}` : 'Add New Property Inventory'}
              </h3>
              
              <form onSubmit={handleSaveHotel} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Hotel Title *</label>
                    <input type="text" required value={hotelName} onChange={e => setHotelName(e.target.value)} className="w-full text-xs font-bold border rounded-lg px-2 pb-1 pt-4" />
                  </div>
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Price Per Night (₹) *</label>
                    <input type="number" required value={hotelPrice} onChange={e => setHotelPrice(Number(e.target.value))} className="w-full text-xs font-bold border rounded-lg px-2 pb-1 pt-4" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-2 top-1">City *</label>
                    <input type="text" required value={hotelCity} onChange={e => setHotelCity(e.target.value)} className="w-full text-xs font-bold border rounded px-2 pb-1 pt-4" />
                  </div>
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-2 top-1">State *</label>
                    <input type="text" required value={hotelState} onChange={e => setHotelState(e.target.value)} className="w-full text-xs font-bold border rounded px-2 pb-1 pt-4" />
                  </div>
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-2 top-1">Rating *</label>
                    <input type="number" step="0.1" max="5" required value={hotelRating} onChange={e => setHotelRating(Number(e.target.value))} className="w-full text-xs font-bold border rounded px-2 pb-1 pt-4" />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Photo Image URL</label>
                  <input type="text" value={hotelImage} onChange={e => setHotelImage(e.target.value)} className="w-full text-xs border rounded-lg px-2 pb-1 pt-4" />
                </div>

                <div className="relative">
                  <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Amenities (comma-separated)</label>
                  <input type="text" value={hotelAmenities} onChange={e => setHotelAmenities(e.target.value)} className="w-full text-xs border rounded-lg px-2 pb-1 pt-4" />
                </div>

                <div className="relative">
                  <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Description</label>
                  <textarea rows={3} value={hotelDesc} onChange={e => setHotelDesc(e.target.value)} className="w-full text-xs border rounded-lg px-3 py-2 resize-none" placeholder="Enter brief overview..."></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="fet" checked={hotelFeatured} onChange={e => setHotelFeatured(e.target.checked)} />
                  <label htmlFor="fet" className="text-xs font-bold text-slate-705">Feature on Home Carousel</label>
                </div>

                <div className="flex gap-2 pt-2 justify-end">
                  <button type="button" onClick={() => setShowHotelModal(false)} className="border px-4 py-2 rounded-lg text-xs font-bold text-slate-500">
                    Cancel
                  </button>
                  <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-5 rounded-lg text-xs">
                    Confirm Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal form for Adding/Editing Restaurants */}
        {showRestaurantModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-150">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3">
                {selectedRestaurant ? `Edit Restaurant: ${selectedRestaurant.name}` : 'Register New Dining Outlet'}
              </h3>

              <form onSubmit={handleSaveRestaurant} className="space-y-4 mt-4">
                <div className="relative">
                  <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Restaurant Business Name *</label>
                  <input type="text" required value={restName} onChange={e => setRestName(e.target.value)} className="w-full text-xs font-bold border rounded-lg px-2 pb-1 pt-4" />
                </div>

                <div className="relative">
                  <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Cuisines / Food styles *</label>
                  <input type="text" required value={restCuisine} onChange={e => setRestCuisine(e.target.value)} placeholder="e.g. Traditional sweets, Fast food" className="w-full text-xs font-bold border rounded-lg px-2 pb-1 pt-4" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-2 top-1">Estimated delivery time *</label>
                    <input type="text" required value={restTime} onChange={e => setRestTime(e.target.value)} className="w-full text-xs font-bold border rounded px-2 pb-1 pt-4" />
                  </div>
                  <div className="relative">
                    <label className="text-[8px] font-bold text-slate-400 absolute left-2 top-1">Rating *</label>
                    <input type="number" step="0.1" max="5" required value={restRating} onChange={e => setRestRating(Number(e.target.value))} className="w-full text-xs font-bold border rounded px-2 pb-1 pt-4" />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[8px] font-bold text-slate-400 absolute left-3 top-1">Cover Image URL</label>
                  <input type="text" value={restImage} onChange={e => setRestImage(e.target.value)} className="w-full text-xs border rounded-lg px-2 pb-1 pt-4" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rest_fet" checked={restFeatured} onChange={e => setRestFeatured(e.target.checked)} />
                  <label htmlFor="rest_fet" className="text-xs font-bold text-slate-705">Feature on Food Landing page</label>
                </div>

                <div className="flex gap-2 pt-2 justify-end">
                  <button type="button" onClick={() => setShowRestaurantModal(false)} className="border px-4 py-2 rounded-lg text-xs font-bold text-slate-500">
                    Cancel
                  </button>
                  <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-5 rounded-lg text-xs">
                    Confirm Restaurant
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
