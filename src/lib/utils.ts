import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Healthcare-specific utility functions
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format as +X (XXX) XXX-XXXX for international numbers
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if can't format
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(dateTime: string): string {
  return new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function calculateBMI(weight: number, height: number): number {
  // Weight in kg, height in meters
  return Number((weight / (height * height)).toFixed(1));
}

export function getBMICategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) {
    return { category: 'Underweight', color: 'text-blue-600' };
  } else if (bmi < 25) {
    return { category: 'Normal weight', color: 'text-green-600' };
  } else if (bmi < 30) {
    return { category: 'Overweight', color: 'text-yellow-600' };
  } else {
    return { category: 'Obese', color: 'text-red-600' };
  }
}

export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'confirmed':
    case 'available':
      return 'text-green-600 bg-green-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'inactive':
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    case 'completed':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'text-gray-600 bg-gray-100';
    case 'normal':
      return 'text-blue-600 bg-blue-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'urgent':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function sortByDate<T extends { date?: string; timestamp?: string }>(
  items: T[],
  ascending: boolean = true
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date || a.timestamp || '');
    const dateB = new Date(b.date || b.timestamp || '');
    
    if (ascending) {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });
}

export function filterBySearch<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      return false;
    })
  );
}

export function groupBy<T, K extends string | number>(
  items: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return items.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function getRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date);
  }
}

export function getTimeUntil(date: string): string {
  const now = new Date();
  const future = new Date(date);
  const diffInSeconds = Math.floor((future.getTime() - now.getTime()) / 1000);
  
  if (diffInSeconds < 0) {
    return 'Overdue';
  } else if (diffInSeconds < 60) {
    return 'In less than a minute';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `In ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `In ${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `In ${days} day${days > 1 ? 's' : ''}`;
  }
}
