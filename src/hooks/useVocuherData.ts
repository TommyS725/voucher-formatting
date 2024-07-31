import { useMemo } from "react";
import { Channel, OfferType, VoucherType, Weekday } from "../types";
import useLocalStorage from "./useLocalStorage";



function useVoucherData(){
    const  year = useMemo(() => new Date().getFullYear(), [])
    const [tester, setTester] = useLocalStorage<string>('tester', )
    const [testId, setTestId] = useLocalStorage<number>('testId', 1)
    const [channel,setChannel] = useLocalStorage<Channel>('channel', 'Brand voucher')
    
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
        endTime
    }

    const update = {
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
        setEndTime
    }
    
    return [data, update] as const
}

export default useVoucherData