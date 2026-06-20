export interface Vendor {
  id: string;
  name: string;
  contactName: string;
  email: string;
  fleetSize: number;
  rentalsCount: number;
  rating?: number;
  joinedDate: string;
  status: 'verified' | 'pending' | 'rejected';
  earnings?: number;
}
