import { ReactNode } from "react";

export interface EquipmentHeroProps {
  title: string;
  subTitle: string;
  image: string;
}

export interface EquipmentHeaderProps {
  title: string;
  type: string;
  modelYear: string;
  rating: string;
  reviewsCount: string;
  location: string;
}

export interface SpecCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface TableItemProps {
  label: string;
  value: string;
}

export interface BookingSidebarProps {
  price: string;
}

export interface FormCardProps {
  title: string;
  children: ReactNode;
}

export interface InputGroupProps {
  label: string;
  placeholder: string;
  icon?: ReactNode;
}

export interface OrderSummaryProps {
  itemTitle: string;
  price: string;
  location: string;
  rating: string;
  reviewsCount: string;
}
