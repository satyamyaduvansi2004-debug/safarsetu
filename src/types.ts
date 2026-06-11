export interface Hotel {
  id: string;
  name: string;
  city: string;
  state: string;
  image: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  description: string;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Veg' | 'Non-Veg' | 'Fast Food' | 'Sweets' | 'Beverages';
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  featured?: boolean;
  menu: MenuItem[];
}

export interface BusRoute {
  id: string;
  from: string;
  to: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  type: 'AC Sleeper' | 'Non-AC Sleeper' | 'AC Seater' | 'Luxury Coach';
  availableSeats: number;
}

export interface TrainRoute {
  id: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  classes: string[];
  runsOn: string[];
  price: number;
}

export interface FlightRoute {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

export interface TouristPlace {
  id: string;
  name: string;
  state: string;
  image: string;
  description: string;
  famousFor: string;
  bestTimeToVisit: string;
}

export interface Booking {
  id: string;
  type: 'Hotel' | 'Bus' | 'Train' | 'Flight';
  itemId: string; // Hotel ID, Bus ID, Train ID or Flight ID
  title: string; // e.g., "Hotel Taj Palace" / "Delhi to Mumbai (Indigo)"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  bookingDate: string;
  travelDate: string;
  amount: number;
  status: 'Pending Payment' | 'Paid' | 'Confirmed' | 'Cancelled';
  paymentMethod?: string;
  passengerDetails?: string; // Optional passenger details
  numberOfGuests?: number;
  roomType?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface FoodOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryCharge: number;
  grandTotal: number;
  status: 'Pending Payment' | 'Paid' | 'Cooking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  orderDate: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Resolved';
}

export interface AdminSettings {
  upiName: string;
  upiPhonePeNumber: string;
  qrCodeUrl: string; // Can be a local Base64 string or image reference
}
