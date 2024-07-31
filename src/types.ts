



export const ChannelToSymbol = {
   'Brand voucher':'Br',
   'The Club':'Club',
   'Airdrop':'Airdrop',
} as const 
export const Channels = Object.keys(ChannelToSymbol) as Channel[]
export type Channel = keyof typeof ChannelToSymbol
export type ChannelSymbol = typeof ChannelToSymbol[Channel]

export const OfferTypeToSymbol = {
    'Free item':'Item',
    'Discount voucher':'Discount',
}
export const OfferTypes = Object.keys(OfferTypeToSymbol) as OfferType[]
export type OfferType = keyof typeof OfferTypeToSymbol
export type OfferTypeSymbol = typeof OfferTypeToSymbol[OfferType]

export const VoucherTypes =['Token Reemption', 'Free Reemption'] as const
export type VoucherType = typeof VoucherTypes[number]

export const Weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
export type Weekday = typeof Weekdays[number]