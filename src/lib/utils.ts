import {Weekday } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function weekdayShort(weekday:Weekday){
  switch(weekday){
    case 'Sunday': return 'sun'
    case 'Monday': return 'mon'
    case 'Tuesday': return 'tue'
    case 'Wednesday': return 'wed'
    case 'Thursday': return 'thur'
    case 'Friday': return 'fri'
    case 'Saturday': return 'sat'
  }
}


export function dateStringFormat(s:string):string{
  const vals = s.split('-')
  vals.reverse()
  return vals.join('/')
}

export function arrayrify<T>(value:T|T[]):T[]{
    return Array.isArray(value)?value:[value]
}


