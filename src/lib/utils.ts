import {Weekday } from "@/lib/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { channelDict, Dict, Language, offerTypeDict, Pair, voucherTypeDict, weekdayDict } from "./languages"

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



export function createLanguageIni(prefix = 'TEXT',deli='_'){
  const dicts = [Dict,channelDict,voucherTypeDict,
    offerTypeDict,weekdayDict] satisfies Record<string,Pair>[]
  
  const languages = ['en','tc'] satisfies Language[]
  const lines = [] as string[]

  languages.forEach(lang=>{
    const enumeratedKeys = new Set()
    lines.push(`[${prefix}.${lang.toLocaleUpperCase()}]`)
    dicts.forEach(dict=>{
      Object.entries(dict).forEach((e,)=>{
        const [key, pair ]= e
        if(enumeratedKeys.has(key)) return 
        lines.push(`${key.split(' ').join(deli)} = ${pair[lang]}`)
        enumeratedKeys.add(key)
      })
    })
    lines.push('')
  })
  return lines.join('\n')
}


// console.log(createLanguageIni())