import { Channel,  VoucherType, Weekday } from "@/types"
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

export function weekdayTitle(weekdayOn:boolean,selected:Weekday[]){
  if(!weekdayOn || selected.length == 7) return 'Everyday'
  if(selected.length === 0) return 'None'
  return selected.map(weekdayShort).join('/')
}


export const havePrice = (channel:Channel,voucherType:VoucherType)=>channel === 'Brand voucher' && voucherType === 'Token Reemption'
export const isForceUnlimitQuota = (channel:Channel)=>channel === 'Airdrop'
export const isForceLimitedQuota =  (channel:Channel,voucherType:VoucherType)=>channel === 'Brand voucher' && voucherType === 'Free Reemption'
export const isUnlimitQuota =(channel:Channel,voucherType:VoucherType,unlimitQuota:boolean)=> 
  isForceLimitedQuota(channel,voucherType) ? false : isForceUnlimitQuota(channel) ? true : unlimitQuota
export const resolveVoucherType = (channel:Channel,voucherType:VoucherType):VoucherType=>
  channel === 'Airdrop'?'Free Reemption':channel==='The Club'?'Token Reemption':voucherType