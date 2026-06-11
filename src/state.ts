import { Hotel, Restaurant, BusRoute, TrainRoute, FlightRoute, TouristPlace, Booking, FoodOrder, Enquiry, AdminSettings } from './types';
import { INITIAL_HOTELS, INITIAL_RESTAURANTS, DEFAULT_REVIEWS } from './data';

// LocalStorage Keys
const KEYS = {
  HOTELS: 'safarsetu_hotels',
  RESTAURANTS: 'safarsetu_restaurants',
  BOOKINGS: 'safarsetu_bookings',
  ORDERS: 'safarsetu_orders',
  ENQUIRIES: 'safarsetu_enquiries',
  SETTINGS: 'safarsetu_settings'
};

export function getSavedHotels(): Hotel[] {
  const data = localStorage.getItem(KEYS.HOTELS);
  if (!data) {
    localStorage.setItem(KEYS.HOTELS, JSON.stringify(INITIAL_HOTELS));
    return INITIAL_HOTELS;
  }
  return JSON.parse(data);
}

export function saveHotels(hotels: Hotel[]) {
  localStorage.setItem(KEYS.HOTELS, JSON.stringify(hotels));
}

export function getSavedRestaurants(): Restaurant[] {
  const data = localStorage.getItem(KEYS.RESTAURANTS);
  if (!data) {
    localStorage.setItem(KEYS.RESTAURANTS, JSON.stringify(INITIAL_RESTAURANTS));
    return INITIAL_RESTAURANTS;
  }
  return JSON.parse(data);
}

export function saveRestaurants(restaurants: Restaurant[]) {
  localStorage.setItem(KEYS.RESTAURANTS, JSON.stringify(restaurants));
}

export function getSavedBookings(): Booking[] {
  const data = localStorage.getItem(KEYS.BOOKINGS);
  if (!data) {
    // Seed with a few mock bookings to make Admin Dashboard feel alive and professional
    const seedBookings: Booking[] = [
      {
        id: 'bkg-1',
        type: 'Hotel',
        itemId: 'h1',
        title: 'The Taj Mahal Palace',
        customerName: 'Aarav Mehta',
        customerPhone: '9876543210',
        customerEmail: 'aarav.mehta@gmail.com',
        bookingDate: '2026-06-10',
        travelDate: '2026-06-15',
        amount: 37500,
        status: 'Confirmed',
        paymentMethod: 'PhonePe UPI',
        numberOfGuests: 2,
        roomType: 'Club Sea View Room'
      },
      {
        id: 'bkg-2',
        type: 'Bus',
        itemId: 'b1',
        title: 'Patna to Lalganj (Vaishali)',
        customerName: 'Yuvraj Singh',
        customerPhone: '9835474866',
        customerEmail: 'yuvraj.safar@gmail.com',
        bookingDate: '2026-06-11',
        travelDate: '2026-06-12',
        amount: 150,
        status: 'Paid',
        paymentMethod: 'Google Pay UPI',
        passengerDetails: 'Seat No: 12 (AC Seater)'
      }
    ];
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(seedBookings));
    return seedBookings;
  }
  return JSON.parse(data);
}

export function saveBookings(bookings: Booking[]) {
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
}

export function getSavedOrders(): FoodOrder[] {
  const data = localStorage.getItem(KEYS.ORDERS);
  if (!data) {
    const seedOrders: FoodOrder[] = [
      {
        id: 'ord-101',
        customerName: 'Nisha Kumari',
        customerPhone: '9123456789',
        customerEmail: 'nisha.kumari@yahoo.com',
        customerAddress: 'Ward No 4, Lalganj, Vaishali, Bihar',
        restaurantId: 'r3',
        restaurantName: 'Lalganj Sweets & Bakers',
        items: [
          { id: 'r3_m1', name: 'Kesariya Rasgulla (4 Pcs)', price: 120, quantity: 2, category: 'Sweets' },
          { id: 'r3_m2', name: 'Samosa Chaat Special', price: 80, quantity: 1, category: 'Fast Food' }
        ],
        totalAmount: 320,
        deliveryCharge: 30,
        grandTotal: 350,
        status: 'Delivered',
        paymentMethod: 'Cash on Delivery',
        orderDate: '2026-06-11'
      }
    ];
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(seedOrders));
    return seedOrders;
  }
  return JSON.parse(data);
}

export function saveOrders(orders: FoodOrder[]) {
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
}

export function getSavedEnquiries(): Enquiry[] {
  const data = localStorage.getItem(KEYS.ENQUIRIES);
  if (!data) {
    const seedEnquiries: Enquiry[] = [
      {
        id: 'enq-1',
        name: 'Rohan Deshmukh',
        email: 'rohan.d@gmail.com',
        phone: '9812739123',
        subject: 'Corporate Tour Inquiry for Lalganj Vaishali ruins',
        message: 'Hello SafarSetu Team, we are planning a historic pilgrimage tour of 25 people from Hajipur/Lalganj to Vaishali ruins. Can you arrange a luxury sleeper coach bus and lunch booking at Lichchhavi Royal Residency?',
        date: '2026-06-11',
        status: 'New'
      }
    ];
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(seedEnquiries));
    return seedEnquiries;
  }
  return JSON.parse(data);
}

export function saveEnquiries(enquiries: Enquiry[]) {
  localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(enquiries));
}

export function getSavedSettings(): AdminSettings {
  const data = localStorage.getItem(KEYS.SETTINGS);
  if (!data) {
    const defaultSettings: AdminSettings = {
      upiName: 'Satyam Kumar',
      upiPhonePeNumber: '9835474866',
      qrCodeUrl: '' // Empty means default custom high fidelity vector UI
    };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
  return JSON.parse(data);
}

export function saveSettings(settings: AdminSettings) {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}
