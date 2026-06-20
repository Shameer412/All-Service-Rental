import {
  LayoutDashboard,
  Users,
  Truck,
  Calendar,
  Settings,
  UserCircle,
  Store,
  CreditCard,
  HelpCircle,
  ClipboardList,
  PlusCircle,
  History,
  DollarSign,
  Car,
  Wrench,
  BarChart3,
  Search,
  MapPin,
  Bell
} from 'lucide-react';
import { UserRole } from '../types/user';

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  badge?: string | number;
}

export const NAVIGATION_CONFIG: Record<UserRole, NavItem[]> = {
  admin: [
    { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'Users', href: '/admin/users', icon: Users },
    { title: 'Vendors', href: '/admin/vendors', icon: Store },
    { title: 'Active Rentals', href: '/admin/rentals', icon: Car },
    { title: 'Payments', href: '/admin/payments', icon: CreditCard },
    { title: 'Maintenance', href: '/admin/maintenance', icon: Wrench },
    { title: 'Reports', href: '/admin/reports', icon: BarChart3 },
  ],
  vendor: [
    { title: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { title: 'Fleet Overview', href: '/vendor/fleet', icon: Truck },
    { title: 'Add Vehicle', href: '/vendor/fleet/add', icon: PlusCircle },
    { title: 'Incoming Rentals', href: '/vendor/bookings', icon: ClipboardList, badge: 3 },
    { title: 'Rental History', href: '/vendor/history', icon: History },
    { title: 'Payments', href: '/vendor/payments', icon: DollarSign },
  ],
  customer: [
    { title: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
    { title: 'Search Equipment', href: '/equipment', icon: Search },
    { title: 'My Rental', href: '/customer/bookings', icon: ClipboardList },
    { title: 'Tracking', href: '/customer/tracking', icon: MapPin },
    { title: 'Payments', href: '/customer/payments', icon: CreditCard },
  ],
};
