/* eslint-disable react/prop-types */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
