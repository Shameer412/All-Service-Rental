import { Vehicle } from './FleetTable';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'TRK-001',
    type: 'Semi-Truck',
    makeModel: 'Peterbilt 579',
    year: '2023',
    location: 'Dallas, TX',
    coordinates: { x: 460, y: 130, lat: '32.7767° N', lng: '96.7970° W' },
    mileage: '45,000 mi',
    status: 'Available',
  },
  {
    id: 'TRK-002',
    type: 'Box Truck',
    makeModel: 'Freightliner M2',
    year: '2023',
    location: 'Houston, TX',
    coordinates: { x: 510, y: 260, lat: '29.7604° N', lng: '95.3698° W' },
    mileage: '67,000 mi',
    status: 'Rented',
  },
  {
    id: 'TRK-003',
    type: 'Flatbed',
    makeModel: 'Kenworth T680',
    year: '2023',
    location: 'Austin, TX',
    coordinates: { x: 430, y: 240, lat: '30.2672° N', lng: '97.7431° W' },
    mileage: '12,000 mi',
    status: 'Available',
  },
  {
    id: 'TRK-004',
    type: 'Refrigerated',
    makeModel: 'Volvo VNL',
    year: '2023',
    location: 'San Antonio, TX',
    coordinates: { x: 390, y: 280, lat: '29.4241° N', lng: '98.4936° W' },
    mileage: '12,000 mi',
    status: 'Maintenance',
  },
];
