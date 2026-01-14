import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDayOfWeekExcludingSunday = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return null;
  return date.getDay() === 0 ? null :
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
};