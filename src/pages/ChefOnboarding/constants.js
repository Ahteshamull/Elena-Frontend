import * as z from 'zod';
import { 
  Ship, Home, PartyPopper, User, Coffee, Utensils, Star 
} from 'lucide-react';

// --- Validation Schemas ---
export const step1Schema = z.object({
  fullName: z.string().min(2, 'Required'),
  displayName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Required'),
  city: z.string().min(2, 'Required'),
  country: z.string().min(2, 'Required'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  experience: z.string().min(1, 'Required'),
  position: z.string().min(2, 'Required'),
  cuisines: z.array(z.string()).min(1, 'Select at least one specialty'),
  category: z.string().min(1, 'Required'),
  bio: z.string().min(50, 'Bio should be at least 50 characters').max(500, 'Max 500 characters'),
});

export const step2Schema = z.object({
  pricePerPerson: z.string().min(1, 'Required'),
  minBooking: z.string().min(1, 'Required'),
  menuTitle: z.string().min(2, 'Required'),
  menuDescription: z.string().min(10, 'Required'),
  selectedMenuTier: z.string().min(1, 'Required'),
  instagram: z.string().optional(),
  website: z.string().optional(),
});

export const step3Schema = z.object({
  instantBooking: z.boolean(),
  serviceWindows: z.array(z.string()).min(1, 'Select at least one service window'),
  travelRadius: z.number().min(5).max(100),
  taxId: z.string().optional(),
  currency: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val === true, 'You must agree to the terms'),
  legalName: z.string().min(2, 'Required'),
  digitalSignature: z.string().min(2, 'Required'),
});

export const languagesList = ['ENGLISH', 'FRENCH', 'ITALIAN', 'JAPANESE', 'SPANISH'];

export const cuisinesList = [
  'Asian', 'Seafood chef', 'Pastry chef', 'FRENCH', 'Grill & Bbq', 'Kosher',
  'Vegan', 'Vegetarian', 'Gluten-free', 'Keto', 'Paleo', 'Halal',
  'Farm-to-Table', 'Organic', 'Mediterranean', 'Indian',
  'Peruvian', 'Interfusion', 'Mexican', 'Italian', 'Morocan', 'Testing menu',
  'Spanish & tapas', 'Dairy free', 'Middle eastern', 'Healthy meal prep'
];

export const categories = [
  { id: 'YACHT', label: 'YACHT', icon: Ship },
  { id: 'VILLA', label: 'VILLA', icon: Home },
  { id: 'EVENT', label: 'EVENT', icon: PartyPopper },
  { id: 'PERSONAL', label: 'PERSONAL', icon: User },
];

export const menuTiers = [
  { id: 'BISTRO', title: 'Bistro Selection', courses: '3 Courses', price: '$120+', icon: Coffee },
  { id: 'GOURMET', title: 'Gourmet Experience', courses: '5 Courses', price: '$250+', icon: Utensils, recommended: true },
  { id: 'CHEFS_TABLE', title: 'Chef\'s Table', courses: '8 Courses', price: '$450+', icon: Star },
];
