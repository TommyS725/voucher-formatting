



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



export const DATA_HEADINGS = [
    'title',
    'tc_title',
    "description",
    "tc_description",
    'start_date',
    "end_date",
    'min_spend_on',
    'min_spend',
    'time_on',
    'start_time',
    'end_time',
    'discount_value',
    'quota',
    'is_unlimited_quota'
] as const 


export type DATA_HEADING = typeof DATA_HEADINGS[number]

export type  DATA_TABLE = {
    'title':string,
    'tc_title':string,
    "description":string,
    "tc_description":string,
    'start_date':string,
    "end_date":string,
    'min_spend_on':boolean,
    'min_spend':number|null,
    'time_on':boolean,
    'start_time':string,
    'end_time':string,
    'discount_value':number|null,
    'quota':number|null,
    'is_unlimited_quota':boolean
}