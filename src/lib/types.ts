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

export const VoucherTypes =['Token Redemption', 'Free Redemption'] as const
export type VoucherType = typeof VoucherTypes[number]

export const Weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const
export type Weekday = typeof Weekdays[number]



export const DATA_HEADINGS = [
    'title',
    'tc_title',
    // "description",
    // "tc_description",
    'start_date',
    "end_date",
    'min_spend_on',
    'min_spend',
    'time_on',
    'start_time',
    'end_time',
    'weekday_on',
    'mon_on',
    'tue_on',
    'wed_on',
    'thur_on',
    'fri_on',
    'sat_on',
    'sun_on',
    'discount_value',
    'quota',
    'is_unlimited_quota',
    'token_price',
] as const 


export type DATA_HEADING = typeof DATA_HEADINGS[number]

export type  DATA_TABLE = {
    'title':string,
    'tc_title':string,
    // "description":string,
    // "tc_description":string,
    'start_date':string,
    "end_date":string,
    'min_spend_on':boolean,
    'min_spend':number|null,
    'time_on':boolean,
    'start_time':string,
    'end_time':string,
    'weekday_on':boolean
    'mon_on':boolean,
    'tue_on':boolean,
    'wed_on':boolean,
    'thur_on':boolean
    'fri_on':boolean,
    'sat_on':boolean,
    'sun_on':boolean,
    'discount_value':number|null,
    'quota':number|null,
    'is_unlimited_quota':boolean,
    'token_price':number
}


export type VoucherJSON = {
    title: string;
    tc_title: string;
    channel: Channel;
    voucherType: VoucherType;
    description: string;
    tc_description: string;
    startDate: string;
    endDate: string;
    minspendOn: boolean;
    minspend: number | null;
    timeOn: boolean;
    startTime: string;
    endTime: string;
    weekdayOn: boolean;
    weekdays: Weekday[];
    offerType: OfferType;
    discount: number | null;
    quota: number | null;
    isUnlimitQuota: boolean;
    tokenPrice: number;
  };
  