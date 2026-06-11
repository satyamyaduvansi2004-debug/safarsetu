import React, { useState } from 'react';
import { getSavedRestaurants } from '../state';
import { Restaurant, MenuItem, FoodOrder, OrderItem } from '../types';
import { Utensils, Clock, Star, Plus, Minus, Trash2, ShoppingCart, User, Phone, MapPin, CheckCircle, Mail } from 'lucide-react';

interface FoodDeliveryProps {
  onNavigateToPayment: () => void;
}

export default function FoodDelivery({ onNavigateToPayment }: FoodDeliveryProps) {
  const [restaurants] = useState<Restaurant[]>(() => getSavedRestaurants());
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(restaurants[0] || null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Cart State
  const [cart, setCart] = useState<OrderItem[]>([]);
  
  // Checkout State
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState<'COD' | 'UPI'>('COD');
  
  // Order Success Screen State
  const [placedOrder, setPlacedOrder] = useState<FoodOrder | null>(null);

  // Food Category choices
  const categories = ['All', 'Veg', 'Non-Veg', 'Fast Food', 'Sweets', 'Beverages'];

  const handleSelectItem = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, category: item.category }];
    });
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.quantity + change;
          if (newQty <= 0) return null;
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(Boolean) as OrderItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  // Math Calculations
  const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subTotal > 0 ? 30 : 0;
  const grandTotal = subTotal + deliveryCharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty. Tap any menu item to add foods first.');
      return;
    }

    if (!customerName || !customerPhone || !customerEmail || !customerAddress) {
      alert('Please fill out all delivery and contact details.');
      return;
    }

    if (!selectedRestaurant) return;

    const newOrder: FoodOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name,
      items: cart,
      totalAmount: subTotal,
      deliveryCharge,
      grandTotal,
      status: paymentOption === 'UPI' ? 'Pending Payment' : 'Cooking',
      paymentMethod: paymentOption === 'UPI' ? 'Direct UPI Transfer' : 'Cash on Delivery',
      orderDate: new Date().toISOString().split('T')[0]
    };

    // Save order in orders queue
    const currentOrders = JSON.parse(localStorage.getItem('safarsetu_orders') || '[]');
    currentOrders.unshift(newOrder);
    localStorage.setItem('safarsetu_orders', JSON.stringify(currentOrders));

    if (paymentOption === 'UPI') {
      // Setup pending booking payload for payment page to pick up automatically
      const pendingBooking = {
        id: newOrder.id,
        type: 'FoodOrder',
        title: `Food Order from ${selectedRestaurant.name}`,
        customerName,
        customerPhone,
        customerEmail,
        amount: grandTotal,
        paymentMethod: 'Direct UPI Transfer'
      };
      localStorage.setItem('safarsetu_pending_booking', JSON.stringify(pendingBooking));
      setCart([]);
      setShowCheckout(false);
      onNavigateToPayment();
    } else {
      // Cash on Delivery - instantly success modal
      setPlacedOrder(newOrder);
      setCart([]);
      setShowCheckout(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-blue-900 bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-widest px-4.5 py-1.5 rounded-full shadow-sm">
            Fast Local Food Deliveries
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mt-3 font-sans uppercase">
            Hot Food Delivered To Your Doorstep <span className="border-b-4 border-orange-500 w-16 block mt-2 mx-auto"></span>
          </h1>
          <p className="text-slate-650 text-xs md:text-sm mt-3 max-w-xl mx-auto">
            Order delicious regional Punjabi tandoor, authentic South Indian Dosas, fresh Bihar sweets (Kesariya Rasgullas) and fast snacks. Cash on Delivery is fully supported!
          </p>
        </div>

        {placedOrder ? (
          /* Placed Order Success Splash Screen */
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 border border-green-250 shadow-xl text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
            <span className="text-xs uppercase tracking-widest bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded">
              Order Placed Successfully!
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3">Order ID: #{placedOrder.id}</h2>
            <p className="text-xs text-slate-500 mt-1">Restaurant: <b className="text-slate-800">{placedOrder.restaurantName}</b></p>
            
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 mt-6 text-left space-y-2 text-xs text-slate-700">
              <p>👤 <b>Customer Name:</b> {placedOrder.customerName}</p>
              <p>📞 <b>Delivery Mobile:</b> {placedOrder.customerPhone}</p>
              <p>📍 <b>Address:</b> {placedOrder.customerAddress}</p>
              <p>💵 <b>Payment Method:</b> <span className="bg-orange-100 text-orange-850 px-2 py-0.5 rounded font-bold font-mono">{placedOrder.paymentMethod}</span></p>
              <p className="border-t border-slate-200 pt-2 font-extrabold text-sm text-slate-900">📦 Total Amount due: ₹{placedOrder.grandTotal}</p>
            </div>

            <p className="text-xs text-slate-500 mt-6 leading-relaxed">
              Our partner kitchen has received your ticket and is starting preparation. Our delivery agent will arrive in approximately <span className="text-blue-700 font-bold">25-30 minutes</span>. Please keep the exact amount ready in cash.
            </p>

            <button
              onClick={() => setPlacedOrder(null)}
              className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition text-xs uppercase cursor-pointer"
            >
              Order More Delicacies
            </button>
          </div>
        ) : (
          /* Regular Food Delivery Page split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Restaurant List Rail (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Select Diner</h3>
              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
                {restaurants.map(rest => {
                  const isSelected = selectedRestaurant?.id === rest.id;
                  return (
                    <button
                      key={rest.id}
                      onClick={() => {
                        setSelectedRestaurant(rest);
                        setActiveCategory('All');
                      }}
                      className={`text-left shrink-0 w-64 lg:w-full rounded-2xl overflow-hidden border transition ${isSelected ? 'border-blue-700 bg-white ring-2 ring-blue-700/10 shadow-md' : 'border-slate-205 bg-slate-100/50 hover:bg-white hover:border-slate-300'}`}
                    >
                      <img
                        src={rest.image}
                        alt={rest.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-extrabold text-slate-900 text-sm truncate">{rest.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{rest.cuisine}</p>
                        <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500 font-bold border-t border-slate-100 pt-2">
                          <span className="flex items-center gap-0.5 text-amber-500">
                            ★ <span className="text-slate-850 font-extrabold">{rest.rating}</span>
                          </span>
                          <span className="text-slate-400 font-normal">⏱️ {rest.deliveryTime}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Menu Items (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {selectedRestaurant && (
                <>
                  {/* Selected Diner Hero Banner */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-5">
                    <img
                      src={selectedRestaurant.image}
                      alt={selectedRestaurant.name}
                      referrerPolicy="no-referrer"
                      className="w-full md:w-32 h-24 rounded-2xl object-cover"
                    />
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-extrabold text-slate-950">{selectedRestaurant.name}</h2>
                      <p className="text-xs text-slate-500 mt-1">{selectedRestaurant.cuisine}</p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-xs text-slate-800 font-bold">
                        <span className="bg-amber-100 text-amber-850 px-2 py-0.5 rounded flex items-center gap-1">
                          ★ {selectedRestaurant.rating} (Rating)
                        </span>
                        <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                          🛵 Fast Delivery in {selectedRestaurant.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Food Category Selector Slider */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs px-4 py-2 rounded-xl font-bold transition flex-shrink-0 ${activeCategory === cat ? 'bg-orange-600 text-white shadow-sm' : 'bg-white text-slate-705 border border-slate-201 hover:bg-slate-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Filtered Menu Items list */}
                  <div className="space-y-4">
                    {selectedRestaurant.menu
                      .filter(item => activeCategory === 'All' || item.category === activeCategory)
                      .map(item => (
                        <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between gap-4 hover:shadow-sm transition">
                          <div className="flex-1">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${item.category === 'Veg' ? 'bg-green-100 text-green-800 border border-green-200' : item.category === 'Non-Veg' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-slate-100 text-slate-600'}`}>
                              {item.category}
                            </span>
                            <h4 className="font-extrabold text-slate-950 text-sm md:text-base mt-2">{item.name}</h4>
                            <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                            <p className="text-sm font-black text-blue-700 font-sans mt-3">₹{item.price}</p>
                          </div>

                          <div className="flex flex-col items-center justify-between w-24">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-20 col-span-1 h-20 rounded-xl object-cover border shadow-sm"
                            />
                            
                            {/* Quantity Controls in the menu directly */}
                            {cart.some(c => c.id === item.id) ? (
                              <div className="flex items-center gap-2 bg-blue-700 text-white rounded-lg py-1 px-2.5 text-xs font-bold mt-2 shadow">
                                <button onClick={() => handleUpdateQuantity(item.id, -1)} className="hover:opacity-80 font-black">
                                  -
                                </button>
                                <span>{cart.find(c => c.id === item.id)?.quantity}</span>
                                <button onClick={() => handleSelectItem(item)} className="hover:opacity-80 font-black">
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSelectItem(item)}
                                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart & Checkout Panel (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm sticky top-6">
                <h3 className="text-sm font-bold text-slate-950 mb-3 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <ShoppingCart className="text-blue-700 w-5 h-5" />
                  Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-slate-400 text-xs">Your meal cart is empty.</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">Tap the (+) buttons on restaurant menu items to order!</p>
                  </div>
                ) : !showCheckout ? (
                  /* Standard Cart Itemized View */
                  <div className="space-y-4">
                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2 text-xs">
                          <div className="flex-1">
                            <h5 className="font-bold text-slate-850 line-clamp-1">{item.name}</h5>
                            <span className="text-slate-400 text-[10px]">₹{item.price} each</span>
                          </div>

                          <div className="flex items-center gap-2 bg-slate-50 border rounded-lg py-1 px-1.5 font-bold">
                            <button onClick={() => handleUpdateQuantity(item.id, -1)} className="text-slate-500 hover:text-slate-900 w-3 text-center">
                              -
                            </button>
                            <span className="w-3 text-center text-slate-800">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.id, 1)} className="text-slate-550 hover:text-slate-900 w-3 text-center">
                              +
                            </button>
                          </div>

                          <button onClick={() => handleRemoveItem(item.id)} className="text-red-400 hover:text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Fees Breakdown */}
                    <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600 font-medium">
                      <div className="flex justify-between">
                        <span>Meals Subtotal:</span>
                        <span className="font-bold text-slate-900 font-sans">₹{subTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SafarSetu Delivery Fee:</span>
                        <span className="font-bold text-slate-900 font-sans">₹{deliveryCharge}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-900 font-black border-t border-dashed border-slate-200 pt-2 font-sans">
                        <span>Grand Total:</span>
                        <span className="text-blue-750">₹{grandTotal}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wide transition shadow-sm mt-3"
                    >
                      Process Order Checkout
                    </button>
                  </div>
                ) : (
                  /* Immediate Inline Checkout form */
                  <form onSubmit={handlePlaceOrder} className="space-y-3.5">
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="text-xs text-slate-500 hover:text-slate-900 font-bold block mb-2"
                    >
                      ← Back to edit meals
                    </button>

                    <div className="space-y-2.5">
                      <div className="relative">
                        <label className="text-[9px] font-bold text-slate-405 uppercase absolute left-2 top-1">Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Satyam Kumar"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 pb-1.5 pt-5 text-sm outline-none focus:border-blue-700"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div className="relative">
                          <label className="text-[9px] font-bold text-slate-405 uppercase absolute left-2 top-1">Mobile Contact *</label>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="10-digit phone"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/gs, ''))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 pb-1.5 pt-5 text-sm outline-none focus:border-blue-700"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[9px] font-bold text-slate-405 uppercase absolute left-2 top-1">Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 pb-1.5 pt-5 text-sm outline-none focus:border-blue-700"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="text-[9px] font-bold text-slate-405 uppercase absolute left-2 top-1">Full Delivery Address *</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="e.g. Lalganj near Corporate Office, Vaishali (Bihar)"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 pb-1.5 pt-4 text-xs outline-none focus:border-blue-700 resize-none text-slate-800"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-450 uppercase mb-1">Choose Payment Method:</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentOption('COD')}
                            className={`py-2 px-1 rounded-lg text-[11px] font-bold border transition ${paymentOption === 'COD' ? 'bg-orange-50 border-orange-500 text-orange-850' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                          >
                            💵 Cash On Delivery
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentOption('UPI')}
                            className={`py-2 px-1 rounded-lg text-[11px] font-bold border transition ${paymentOption === 'UPI' ? 'bg-blue-50 border-blue-600 text-blue-800' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                          >
                            पे PhonePe UPI Scan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-white rounded-xl p-3 text-xs flex justify-between items-center font-sans">
                      <span>Total Due:</span>
                      <span className="font-extrabold text-orange-400 font-sans">₹{grandTotal}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wide transition shadow-md"
                    >
                      {paymentOption === 'COD' ? 'Place COD Order' : 'Complete Registration'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
