import { Hotel, Restaurant, BusRoute, TrainRoute, FlightRoute, TouristPlace } from './types';

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'The Taj Mahal Palace',
    city: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 12500,
    rating: 4.9,
    reviewsCount: 1840,
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Luxury Dining', 'A/C', '24h Room Service'],
    description: 'Overlooking the majestic Gateway of India, this luxury hotel blends rich history with modern luxury, promising an unforgettable royal experiences in Mumbai.',
    featured: true
  },
  {
    id: 'h2',
    name: 'Chandra Mahal Haveli',
    city: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 4800,
    rating: 4.7,
    reviewsCount: 520,
    amenities: ['Heritage Architecture', 'Rooftop Restaurant', 'Free WiFi', 'A/C', 'Bar & Lounge', 'Local Guides'],
    description: 'Experience true Rajasthani hospitality in this beautifully restored heritage mansion, featuring grand courtyards and exquisite traditional decor.',
    featured: true
  },
  {
    id: 'h3',
    name: 'Kumarakom Backwater Resort',
    city: 'Kumarakom',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 7200,
    rating: 4.8,
    reviewsCount: 940,
    amenities: ['Backwater View', 'Ayurveda Spa', 'Infinity Pool', 'Houseboat Cruises', 'Organic Tea Garden', 'A/C'],
    description: 'Nestled on the serene banks of Vembanad Lake, this tranquil resort offers traditional Keralite cottages, therapeutic massages, and scenic boat tours.',
    featured: true
  },
  {
    id: 'h4',
    name: 'The Himalayan Retreat',
    city: 'Manali',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1549294413-26f195afcbaf?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 3500,
    rating: 4.5,
    reviewsCount: 410,
    amenities: ['Mountain View', 'Fireplace Room', 'Hiking Trails', 'In-house Cafe', 'Heaters', 'Free Parking'],
    description: 'Surround yourself with snow-capped peaks and apple orchards in our cozy wooden chalets, featuring gorgeous views of the Solang Valley.',
    featured: false
  },
  {
    id: 'h5',
    name: 'Lichchhavi Royal Residency',
    city: 'Lalganj',
    state: 'Bihar',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 2800,
    rating: 4.6,
    reviewsCount: 180,
    amenities: ['Free High-Speed WiFi', 'Multi-cuisine Restaurant', 'Modern Gym', 'Banquet Hall', '24h Front Desk', 'A/C'],
    description: 'SafarSetu top choice in historic Vaishali region. This premium, modern business hotel offers world-class amenities for travelers exploring Lalganj and nearby Buddhist monuments.',
    featured: true
  },
  {
    id: 'h6',
    name: 'Ganges Grand Heritage',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80',
    pricePerNight: 4200,
    rating: 4.6,
    reviewsCount: 612,
    amenities: ['Ghat view', 'Vegetarian Dining', 'Yoga & Meditation Deck', 'Free WiFi', 'Rooftop Cafe', 'Ganga Aarti Ticket Assistance'],
    description: 'Located steps away from the sacred ghats of Varanasi, enjoy the magical morning vibes and sunset standard views from our beautiful viewing lounges.',
    featured: false
  }
];

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Sardarji Da Dhaba & Restaurant',
    cuisine: 'North Indian, Punjabi, tandoor',
    rating: 4.7,
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    featured: true,
    menu: [
      {
        id: 'r1_m1',
        name: 'Dal Makhani Multi-Layered',
        category: 'Veg',
        price: 240,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
        description: 'Black lentils slow cooked overnight on clay oven with cream and butter.',
        rating: 4.8
      },
      {
        id: 'r1_m2',
        name: 'Butter Chicken Masala',
        category: 'Non-Veg',
        price: 380,
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80',
        description: 'Tender chicken pieces simmered in rich creamy tomato cashew gravy.',
        rating: 4.9
      },
      {
        id: 'r1_m3',
        name: 'Paneer Lababdar',
        category: 'Veg',
        price: 290,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80',
        description: 'Fresh cottage cheese cubes in spiced onions, bell peppers and tomato cream.',
        rating: 4.6
      },
      {
        id: 'r1_m4',
        name: 'Butter Naan (2 pcs)',
        category: 'Fast Food',
        price: 90,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80',
        description: 'Leavened clay-oven baked bread loaded with rich churned butter.',
        rating: 4.7
      }
    ]
  },
  {
    id: 'r2',
    name: 'Annapoorna South Indian Express',
    cuisine: 'Traditional South Indian, Idli, Dosa, Meals',
    rating: 4.6,
    deliveryTime: '15-20 min',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80',
    featured: true,
    menu: [
      {
        id: 'r2_m1',
        name: 'Ghee Podi Masala Dosa',
        category: 'Veg',
        price: 150,
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80',
        description: 'Crispy rice crêpe spiced with gun-powder (podi), filled with potato bhaji, cooked in pure ghee.',
        rating: 4.8
      },
      {
        id: 'r2_m2',
        name: 'Butter Idli Sambar (2 Pcs)',
        category: 'Veg',
        price: 95,
        image: 'https://images.unsplash.com/photo-1541014741259-df5290db5785?auto=format&fit=crop&w=500&q=80',
        description: 'Soft steamed rice cakes served with aromatic hot lentil soup and fresh coconut chutneys.',
        rating: 4.7
      },
      {
        id: 'r2_m3',
        name: 'Filter Coffee Premium',
        category: 'Beverages',
        price: 60,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
        description: 'Authentic South Indian chicory-infused filter coffee frothed with hot milk.',
        rating: 4.9
      }
    ]
  },
  {
    id: 'r3',
    name: 'Lalganj Sweets & Bakers',
    cuisine: 'Traditional Indian Sweets, Chaat & Street Food',
    rating: 4.8,
    deliveryTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    featured: true,
    menu: [
      {
        id: 'r3_m1',
        name: 'Kesariya Rasgulla (4 Pcs)',
        category: 'Sweets',
        price: 120,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80',
        description: 'Sponge cottage cheese balls soaked in divine saffron sugar syrup. Classic Bihar favorite!',
        rating: 4.9
      },
      {
        id: 'r3_m2',
        name: 'Samosa Chaat Special',
        category: 'Fast Food',
        price: 80,
        image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=500&q=80',
        description: 'Crushed crispy potato samosa topped with spice chickpeas gravy, tangy tamarind, mint chutneys and sev.',
        rating: 4.7
      },
      {
        id: 'r3_m3',
        name: 'Mango Lassi Thick',
        category: 'Beverages',
        price: 90,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80',
        description: 'Creamy yogurt drink flavored with fresh Alphonso mango pulp and pistachios.',
        rating: 4.8
      }
    ]
  },
  {
    id: 'r4',
    name: 'The Burger Club',
    cuisine: 'Fast Food, Burgers, Wraps and Shakes',
    rating: 4.4,
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    featured: false,
    menu: [
      {
        id: 'r4_m1',
        name: 'Aloo Tikki Supreme Burger',
        category: 'Fast Food',
        price: 110,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
        description: 'Crispy vegetable patty topped with mayonnaise, lettuce, and onions on soft toasted sesame buns.',
        rating: 4.5
      },
      {
        id: 'r4_m2',
        name: 'Spicy Chicken Zinger Burger',
        category: 'Non-Veg',
        price: 180,
        image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80',
        description: 'Signature crispy double-breaded chicken breast fillet topped with spicy burger sauce.',
        rating: 4.6
      },
      {
        id: 'r4_m3',
        name: 'Cheesy Masala Fries',
        category: 'Fast Food',
        price: 130,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80',
        description: 'French fries dusted with spicy peri peri masala, loaded with molten cheese sauce.',
        rating: 4.3
      }
    ]
  }
];

export const TOURIST_PLACES: TouristPlace[] = [
  {
    id: 'tp1',
    name: 'Taj Mahal',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favorite wife.',
    famousFor: 'Love Symbol, Mughal Architecture, World Wonder',
    bestTimeToVisit: 'October to March'
  },
  {
    id: 'tp2',
    name: 'Ashoka Pillar & Relic Stupa',
    state: 'Bihar (Vaishali / Lalganj)',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the highly historic city of Vaishali near Lalganj where Lord Buddha preached his last sermon. It features a completely intact single-lion Ashoka Pillar and the ancient Buddhist remains.',
    famousFor: 'Buddhist Pilgrimage, Ancient Democracy, Emperor Ashoka Pillar',
    bestTimeToVisit: 'November to February'
  },
  {
    id: 'tp3',
    name: 'Wayanad Backwaters & Hills',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Dotted with stunning lakes, backwaters, and misty mountains. Famous for organic spices plantations and wildlife sanctuaries.',
    famousFor: 'Spices, Western Ghats Trails, Cozy Houseboats',
    bestTimeToVisit: 'September to May'
  },
  {
    id: 'tp4',
    name: 'The Pink City (Amer Fort)',
    state: 'Rajasthan (Jaipur)',
    image: 'https://images.unsplash.com/photo-1477584322904-4872723f283b?auto=format&fit=crop&w=800&q=80',
    description: 'A grand hilltop fortress featuring magnificent courtyards, detailed mirror mosaics, and breathtaking views of Maota Lake.',
    famousFor: 'Royal Heritage, Palaces, Forts and Textiles',
    bestTimeToVisit: 'October to March'
  }
];

export const BUS_ROUTES: BusRoute[] = [
  {
    id: 'b1',
    from: 'Patna',
    to: 'Lalganj (Vaishali)',
    operator: 'SafarSetu Royal Travels',
    departureTime: '08:30 AM',
    arrivalTime: '10:00 AM',
    duration: '1h 30m',
    price: 150,
    type: 'AC Seater',
    availableSeats: 24
  },
  {
    id: 'b2',
    from: 'Delhi',
    to: 'Jaipur',
    operator: 'Rathore Travels & Luxury Cargo',
    departureTime: '11:00 PM',
    arrivalTime: '05:30 AM',
    duration: '6h 30m',
    price: 650,
    type: 'AC Sleeper',
    availableSeats: 12
  },
  {
    id: 'b3',
    from: 'Mumbai',
    to: 'Pune',
    operator: 'Shivneri MSRTC AC Coach',
    departureTime: '02:00 PM',
    arrivalTime: '05:45 PM',
    duration: '3h 45m',
    price: 450,
    type: 'AC Seater',
    availableSeats: 32
  },
  {
    id: 'b4',
    from: 'Bengaluru',
    to: 'Kochi',
    operator: 'Kallada Premium Bus Liners',
    departureTime: '09:15 PM',
    arrivalTime: '07:30 AM',
    duration: '10h 15m',
    price: 1200,
    type: 'AC Sleeper',
    availableSeats: 8
  },
  {
    id: 'b5',
    from: 'Muzaffarpur',
    to: 'Hajipur',
    operator: 'Vaishali Regional Transport',
    departureTime: '01:15 PM',
    arrivalTime: '02:30 PM',
    duration: '1h 15m',
    price: 100,
    type: 'Non-AC Sleeper',
    availableSeats: 40
  }
];

export const TRAIN_ROUTES: TrainRoute[] = [
  {
    id: 't1',
    trainNumber: '12393',
    trainName: 'Sampoorna Kranti Express',
    from: 'Patna (PNBE)',
    to: 'New Delhi (NDLS)',
    departureTime: '05:25 PM',
    arrivalTime: '07:55 AM',
    duration: '14h 30m',
    classes: ['1A', '2A', '3A', 'SL'],
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    price: 550 // Base Sleeper
  },
  {
    id: 't2',
    trainNumber: '12952',
    trainName: 'Mumbai Rajdhani Express',
    from: 'New Delhi (NDLS)',
    to: 'Mumbai Central (MMCT)',
    departureTime: '04:55 PM',
    arrivalTime: '08:35 AM',
    duration: '15h 40m',
    classes: ['1A', '2A', '3A'],
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    price: 2150 // AC 3 Tier
  },
  {
    id: 't3',
    trainNumber: '12245',
    trainName: 'Howrah Duronto Express',
    from: 'Bengaluru (SMVB)',
    to: 'Howrah (HWH)',
    departureTime: '11:00 AM',
    arrivalTime: '04:15 PM',
    duration: '29h 15m',
    classes: ['1A', '2A', '3A', '2S'],
    runsOn: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    price: 1840
  },
  {
    id: 't4',
    trainNumber: '15549',
    trainName: 'Vaishali Express Intercity',
    from: 'Sonepur (SEE)',
    to: 'Muzaffarpur (MFP)',
    departureTime: '06:15 AM',
    arrivalTime: '08:10 AM',
    duration: '1h 55m',
    classes: ['CC', '2S'],
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    price: 85
  }
];

export const FLIGHT_ROUTES: FlightRoute[] = [
  {
    id: 'f1',
    airline: 'IndiGo',
    flightNumber: '6E-2124',
    from: 'Patna (PAT)',
    to: 'Delhi (DEL)',
    departureTime: '09:00 AM',
    arrivalTime: '10:45 AM',
    duration: '1h 45m',
    price: 4200,
    stops: 0
  },
  {
    id: 'f2',
    airline: 'Air India',
    flightNumber: 'AI-803',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departureTime: '02:30 PM',
    arrivalTime: '04:45 PM',
    duration: '2h 15m',
    price: 5600,
    stops: 0
  },
  {
    id: 'f3',
    airline: 'SpiceJet',
    flightNumber: 'SG-298',
    from: 'Bengaluru (BLR)',
    to: 'Kolkata (CCU)',
    departureTime: '06:00 AM',
    arrivalTime: '08:40 AM',
    duration: '2h 40m',
    price: 6100,
    stops: 0
  },
  {
    id: 'f4',
    airline: 'Vistara',
    flightNumber: 'UK-854',
    from: 'Mumbai (BOM)',
    to: 'Goa (GOI)',
    departureTime: '10:15 AM',
    arrivalTime: '11:30 AM',
    duration: '1h 15m',
    price: 3400,
    stops: 0
  }
];

export const DEFAULT_REVIEWS = [
  {
    name: 'Yuvraj Singh',
    city: 'Patna, Bihar',
    rating: 5,
    comment: 'Booked a luxury sleeper bus from Patna to Hajipur-Lalganj. Exceptional support from Satyam Kumar and SafarSetu team. Prompt assistance and accurate billing!',
    date: '3 weeks ago'
  },
  {
    name: 'Anjali Sharma',
    city: 'Mumbai, Maharashtra',
    rating: 5,
    comment: 'I booked a 3-night stay atKumarakom Backwater Resort through SafarSetu. The payment via PhonePe QR scanner was fluid. Highly professional travel aggregator for India!',
    date: '1 month ago'
  },
  {
    name: 'Vikramaditya Roy',
    city: 'Jaipur, Rajasthan',
    rating: 4.8,
    comment: 'Delicious Rasgullas delivered in Lalganj from Lalganj Sweets & Bakers app. Food was hot, and cash on delivery is a life-saver. Will order food again!',
    date: '2 months ago'
  }
];
