import { Channel, OfferType, VoucherType, Weekday } from "@/lib/types";


export type Language = 'en'|'tc'
export type Pair = {[key in Language]:string}
export const  pair= (en:string,tc:string):Pair=>({en,tc})

export const Dict = {
    tester:pair('Tester','測試員'),
    testId:pair('Test ID','測試ID'),
    channel:pair('Distribution Channel','分發渠道'),
    voucherType:pair('Voucher Type','優惠券類型'),
    discount:pair('Offer Value','優惠價值'),
    tokenPrice:pair('Redeem Token','兌換積分'),
    offerType:pair('Offer Type','優惠類型'),
    offerPeriod:pair('Offer Valid Period','優惠有效期限'),
    to:pair('To','至'),
    Quota:pair('Offer Quota','優惠配額'),
    unlimited:pair("Unlimited",'無限配額​'),
    eligibility:pair('Eligibility','使用資格'),
    none:pair("None",'沒有'),
    minspend:pair('Minimum spending','最低消費金額'),
    weekdays:pair('Weekdays','每週可用日子'),
    time:pair('Specific time of day','特定時間段')
} satisfies {
    [key:string]:Pair
}

export const channelDict = {
    "Airdrop":pair("Send to Brand Subscriber (Airdrop)",'發送給會員'),
    "Brand voucher":pair("My Brand Page",'我的品牌頁面'),
    "The Club":pair('The Club Brand Page','The Club 品牌頁面'),
} satisfies {
    [key in Channel]:Pair
}

export const voucherTypeDict = {
    'Free Redemption':pair('Free Redemption','免費兌換'),
    'Token Redemption':pair('Token Redemption','積分兌換')
} satisfies {[key in VoucherType]:Pair}

export const offerTypeDict = {
    'Discount voucher':pair('Discount Voucher','折扣優惠券'),
    'Free item':pair('Free Item','免費物品')
}  satisfies {[key in OfferType]:Pair}


export const weekdayDict = {
    'Monday':pair('Monday','星期一'),
    'Tuesday':pair('Tuesday','星期二'),
    'Wednesday':pair('Wednesday','星期三'),
    'Thursday':pair('Thursday','星期四'),
    'Friday':pair('Friday','星期五'),
    "Saturday":pair("Saturday",'星期六'),
    'Sunday':pair('Sunday','星期日'),
    'Everyday':pair('Everday','每天'),
    none:pair("None",'沒有'),
} satisfies {[key in Weekday|'none'|'Everyday']:Pair}


    // const eng = `Tester: ${tester}         Test ID: ${testId}\n\n`
    //     + `Channel: ${channel}\nVoucher Type: ${resolveVoucherType}\n`
    //     + (havePrice ? `Token Price: ${tokenPrice}\n` : '')
    //     + `Offer Type: ${offerType}\n`
    //     + (offerType === 'Discount voucher' ? `Discount value: $${discount}\n` : "")
    //     + `Offer period: ${startDate} to ${endDate}\n`
    //     + `Quota: ${unlimitQuota ? 'Unlimited' : quota}\n`
    //     + "\nEligibility:\n"
    //     + (!minspendOn && !weekdayOn && !timeOn ? 'None\n' :
    //         ([
    //             minspendOn ? `Minimum Spend: ${minspend}\n` : '',
    //             weekdayOn ? `Weekdays: ${weekdays.length ? weekdays.join(', ') : "None"}\n` : '',
    //             timeOn ? `Time of day: ${startTime} - ${endTime}\n` : ''
    //         ].join('')))