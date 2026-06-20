
export interface Truck {
  id: string;
  name: string;
  category: 'Box Trucks' | 'Flatbed' | 'Excavators' | 'Loaders' | 'Trailers';
  image: string;
  rating: number;
  location: string;
  specs: string;
  price: number;
}

export const trucks: Truck[] = [
  {
    id: '1',
    name: 'Enclosed Cargo Trailer',
    category: 'Trailers',
    image: '/truck-types/Trailer.png',
    rating: 4.5,
    location: 'Milwaukie, OR',
    specs: '18ft • Tandem Axle',
    price: 85,
  },
  {
    id: '2',
    name: 'Utility Flatbed Trailer',
    category: 'Flatbed',
    image: '/truck-types/Flatbed.png',
    rating: 4.8,
    location: 'Lynnwood, WA',
    specs: '53ft • Aluminum • Air Ride',
    price: 120,
  },
  {
    id: '3',
    name: 'Ford F-650 Box Truck',
    category: 'Box Trucks',
    image: '/truck-types/BoxTrucks (1).png',
    rating: 4.8,
    location: 'Portland, OR',
    specs: '26ft • Diesel • Auto',
    price: 189,
  },
  {
    id: '4',
    name: 'Freightliner M2 106',
    category: 'Box Trucks',
    image: '/truck-types/BoxTrucks (2).png',
    rating: 4.7,
    location: 'Los Angeles, CA',
    specs: '24ft • Liftgate • GPS',
    price: 210,
  },
  {
    id: '5',
    name: 'Ford F-650 Box Truck',
    category: 'Box Trucks',
    image: '/truck-types/BoxTrucks (3).png',
    rating: 4.8,
    location: 'Portland, OR',
    specs: '26ft • Diesel • Auto',
    price: 189,
  },
  {
    id: '6',
    name: 'Kenworth T680 Semi',
    category: 'Box Trucks',
    image: '/truck-types/BoxTrucks (1).png',
    rating: 4.9,
    location: 'Phoenix, AZ',
    specs: 'Sleeper • 500HP',
    price: 320,
  },
  {
    id: '7',
    name: 'Caterpillar 320 Excavator',
    category: 'Excavators',
    image: '/truck-types/Excavators (1).png',
    rating: 4.9,
    location: 'Denver, CO',
    specs: '20-ton • Diesel',
    price: 450,
  },
  {
    id: '8',
    name: 'John Deere 624 P-Tier',
    category: 'Loaders',
    image: '/truck-types/Loaders.png',
    rating: 4.7,
    location: 'Houston, TX',
    specs: 'Wheel Loader • High Lift',
    price: 380,
  }
];
