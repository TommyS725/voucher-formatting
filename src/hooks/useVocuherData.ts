import { useMemo } from "react";
import { Channel, ChannelToSymbol, DATA_HEADINGS, DATA_TABLE, OfferType, OfferTypeToSymbol, VoucherType, Weekday } from "../types";
import useLocalStorage from "./useLocalStorage";
import { weekdayShort } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";


function useVoucherData() {
    const year = useMemo(() => new Date().getFullYear(), [])
    const {toast} = useToast()
    const [tester, setTester] = useLocalStorage<string>('tester',)
    const [testId, setTestId] = useLocalStorage<number>('testId', 1)
    const [channel, setChannel] = useLocalStorage<Channel>('channel', 'Brand voucher')

    const [offerType, setOfferType] = useLocalStorage<OfferType>('OfferType', 'Free item')
    const [tokenPrice, setTokenPrice] = useLocalStorage<number>('tokenPrice', 10)
    const [voucherType, setVoucherType] = useLocalStorage<VoucherType>('voucherType', 'Token Reemption')
    const [discount, setDiscount] = useLocalStorage<number>('discount', 10)
    const [startDate, setStartDate] = useLocalStorage<string>('startDate', `${year}-01-01`)
    const [endDate, setEndDate] = useLocalStorage<string>('endDate', `${year}-12-31`)
    const [unlimitQuota, setUnlimitQuota] = useLocalStorage<boolean>('unlimitQuota', false)
    const [quota, setQuota] = useLocalStorage<number>('quota', 1)

    //eligibilty
    const [minspendOn, setMinspendOn] = useLocalStorage<boolean>('minspendOn', false)
    const [weekdayOn, setWeekdayOn] = useLocalStorage<boolean>('weekdayOn', false)
    const [timeOn, setTimeOn] = useLocalStorage<boolean>('timeOn', false)

    const [minspend, setMinspend] = useLocalStorage<number>('minspend', 10)
    const [weekdays, setWeekdays] = useLocalStorage<Weekday[]>('weekday', ['Monday'])
    const [startTime, setStartTime] = useLocalStorage<string>('startTime', '00:00')
    const [endTime, setEndTime] = useLocalStorage<string>('endTime', '23:59')

    const havePrice = channel === 'Brand voucher' && voucherType === 'Token Reemption'
    const isForceUnlimitQuota = channel === 'Airdrop'
    const isForceLimitedQuota = channel === 'Brand voucher' && voucherType === 'Free Reemption'
    const isUnlimitQuota = isForceLimitedQuota ? false : isForceUnlimitQuota ? true : unlimitQuota
    const resolveVoucherType: VoucherType = channel === 'Airdrop' ? 'Free Reemption' : channel === 'The Club' ? 'Token Reemption' : voucherType

    const weekdayTitle =
        !weekdayOn || weekdays.length == 7 ? "Everyday" :
            weekdays.length === 0 ? "None" :
                weekdays.map(weekdayShort).join('/')


    const title = `${tester}${testId}_${ChannelToSymbol[channel]}_${OfferTypeToSymbol[offerType]}`
        + `_m${minspendOn ? minspend : "0"}_${weekdayTitle}`
        + `_${timeOn ? startTime + "-" + endTime : "00:00-23:59"}`
        + `_${isUnlimitQuota? "Un" : "q" + quota}`


    const description = `Tester: ${tester}         Test ID: ${testId}\n\n`
        + `Channel: ${channel}\nVoucher Type: ${resolveVoucherType}\n`
        + (havePrice ? `Token Price: ${tokenPrice}\n` : '')
        + `Offer Type: ${offerType}\n`
        + (offerType === 'Discount voucher' ? `Discount value: $${discount}\n` : "")
        + `Offer period: ${startDate} to ${endDate}\n`
        + `Quota: ${unlimitQuota ? 'Unlimited' : quota}\n`
        + "\nEligibility:\n"
        + (!minspendOn && !weekdayOn && !timeOn ? 'None\n' :
            ([
                minspendOn ? `Minimum Spend: ${minspend}\n` : '',
                weekdayOn ? `Weekdays: ${weekdays.length?weekdays.join(', '):"None"}\n` : '',
                timeOn ? `Time of day: ${startTime} - ${endTime}\n` : ''
            ].join('')))

    const tc_title = "[CN] " + title
    const tc_description = "[CN]\n" + description
    
    const createVoucherData= async ()=>{
        const table = document.createElement('table')
        const tabe_data:DATA_TABLE = {
            title,tc_title,description,tc_description,
            start_date:startDate,
            end_date:endDate,
            quota:isUnlimitQuota?null:quota,
            is_unlimited_quota:isUnlimitQuota,
            time_on:timeOn,
            start_time:timeOn?startTime:"00::00",
            end_time:timeOn?endTime:"23:59",
            min_spend_on:minspendOn,
            min_spend:minspendOn?minspend:null,
            discount_value:offerType==='Discount voucher'?discount:null
        }
        const headerRow  = document.createElement('tr')
        const valueRow = document.createElement('tr')
        for(const heading of DATA_HEADINGS){
            const header = document.createElement('th')
            const value = document.createElement('td')
            header.innerText=heading
            value.innerText = String(tabe_data[heading])
            headerRow.appendChild(header)
            valueRow.appendChild(value)
        }

        table.appendChild(headerRow)
        table.appendChild(valueRow)

        await navigator.clipboard.writeText(table.outerHTML)
        setTestId(testId+1)
        toast({
            title: `Copied voucher data to clipboard in table format`,
        })
    }


    const data = {
        tester,
        testId,
        channel,
        voucherType,
        tokenPrice,
        offerType,
        discount,
        startDate,
        endDate,
        unlimitQuota,
        quota,
        minspendOn,
        weekdayOn,
        timeOn,
        minspend,
        weekdays,
        startTime,
        endTime,
        havePrice,
        isForceLimitedQuota,
        isForceUnlimitQuota,
        isUnlimitQuota,
        resolveVoucherType,
        weekdayTitle,
        title,
        description,
        tc_title,
        tc_description
    }

    const action = {
        setTester,
        setTestId,
        setChannel,
        setVoucherType,
        setTokenPrice,
        setOfferType,
        setDiscount,
        setStartDate,
        setEndDate,
        setUnlimitQuota,
        setQuota,
        setMinspendOn,
        setWeekdayOn,
        setTimeOn,
        setMinspend,
        setWeekdays,
        setStartTime,
        setEndTime,
        createVoucherData
    }

    return [data,action] as const
}

export default useVoucherData