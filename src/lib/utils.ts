import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const displayFormatDate = (date: Date | string | null) => {
  if (!date) return "No Upcoming Meetings";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
  };

  const timePart = dateObj.toLocaleTimeString("en-IN", timeOptions);
  const datePart = dateObj.toLocaleDateString("en-IN", dateOptions);

  return `${timePart} - ${datePart}`;
};