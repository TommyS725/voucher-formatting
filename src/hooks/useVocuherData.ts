import { useMemo } from "react";
import { Channel, ChannelToSymbol, DATA_HEADING, DATA_HEADINGS, DATA_TABLE, OfferType, OfferTypeToSymbol, VoucherJSON, VoucherType, Weekday } from "../lib/types";
import useLocalStorage from "./useLocalStorage";
import { dateStringFormat, weekdayShort } from "@/lib/utils";
import { channelDict, Dict, Language, offerTypeDict, pair, voucherTypeDict, weekdayDict } from "@/lib/languages";
import useCopy from "./useCopy";
import { useSettingContext } from "@/contexts/setting-provider";


function useVoucherData() {
    const {autoIncrement} = useSettingContext()
    const year = useMemo(() => new Date().getFullYear(), [])
    const {copy} = useCopy()
    const [tester, setTester] = useLocalStorage<string>('tester',)
    const [testId, setTestId] = useLocalStorage<number>('testId', 1)
    const [channel, setChannel] = useLocalStorage<Channel>('channel', 'Brand voucher')

    const [offerType, setOfferType] = useLocalStorage<OfferType>('OfferType', 'Free item')
    const [tokenPrice, setTokenPrice] = useLocalStorage<number>('tokenPrice', 10)
    const [voucherType, setVoucherType] = useLocalStorage<VoucherType>('voucherType', 'Token Redemption')
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

    const havePrice = channel === 'Brand voucher' && voucherType === 'Token Redemption'
    const isForceUnlimitQuota = channel === 'Airdrop'
    const isForceLimitedQuota = channel === 'Brand voucher' && voucherType === 'Free Redemption'
    const isUnlimitQuota = isForceLimitedQuota ? false : isForceUnlimitQuota ? true : unlimitQuota
    const resolveVoucherType: VoucherType = channel === 'Airdrop' ? 'Free Redemption': channel === 'The Club' ? 'Token Redemption' : voucherType
    const haveEligibility = minspendOn || weekdayOn || timeOn

    function createDiscriptions(){
        function descriptionForLang(lang:Language){
           
           try{
            const sentences = [
                `${Dict.tester[lang]}: ${tester}        ${Dict['testId'][lang]}: {testId}`,
                `${Dict['channel'][lang]}: ${channelDict[channel][lang]}`,
                `${Dict['voucherType'][lang]}: ${voucherTypeDict[voucherType][lang]}`,
                havePrice?`${Dict['tokenPrice'][lang]}: ${tokenPrice}` : '',
                `${Dict['offerType'][lang]}: ${offerTypeDict[offerType][lang]}`,
                offerType === 'Discount voucher' ? `${Dict['discount'][lang]}: $${discount}\n` : "",
                `${Dict['offerPeriod'][lang]}: ${dateStringFormat(startDate)} ${Dict['to'][lang]} ${dateStringFormat(endDate)}`,
                `${Dict['Quota'][lang]}: ${isUnlimitQuota?Dict['unlimited'][lang]:quota}`,
                `\n${Dict['eligibility'][lang]}: ${haveEligibility?"":Dict['none'][lang]}`,
                minspendOn?`${Dict['minspend'][lang]}: ${minspend}`:'',
                weekdayOn?`${Dict['weekdays'][lang]}: ${!weekdays.length? weekdayDict['none'][lang]:
                    weekdays.length === 7 ? weekdayDict['Everyday'][lang]:
                    weekdays.map(d=>weekdayDict[d][lang]).join(', ')
                 }`:"",
                 timeOn?`${Dict['time'][lang]}:  ${startTime} ${Dict['to'][lang]} ${endTime}`:''
            ].filter(s=>s!=='') satisfies string[]
            return sentences.join('\n')
           } catch(e){
              
               return 'Error Occured. Please try clear the local storage'
           }
    
        }
        
        return pair(descriptionForLang('en'),descriptionForLang('tc'))
    }
    

    const weekdayTitle =
        !weekdayOn || weekdays.length == 7 ? "Everyday" :
            weekdays.length === 0 ? "None" :
                weekdays.map(weekdayShort).join('/')


    const unformated_title = `${tester}{testId}_${ChannelToSymbol[channel]}_${OfferTypeToSymbol[offerType]}`
        + `_m${minspendOn ? minspend : "0"}_${weekdayTitle}`
        + `_${timeOn ? startTime + "-" + endTime : "00:00-23:59"}`
        + `_${isUnlimitQuota ? "Un" : "q" + quota}`


    const unformatedt_tc_title = "[中文] " + unformated_title

    const title = unformated_title.replace('{testId}',testId.toString())
    const tc_title = unformatedt_tc_title.replace('{testId}',testId.toString())



    const unFormatedDescriptionPair = createDiscriptions()
    const description = unFormatedDescriptionPair.en.replace('{testId}',testId.toString())
    const tc_description = unFormatedDescriptionPair.tc.replace('{testId}',testId.toString())

    const tabe_data: DATA_TABLE = {
        title, tc_title,
        // description, tc_description,
        start_date: dateStringFormat(startDate),
        end_date: dateStringFormat(endDate),
        quota: isUnlimitQuota ? null : quota,
        is_unlimited_quota: isUnlimitQuota,
        time_on: timeOn,
        start_time: timeOn ? startTime : "00:00",
        end_time: timeOn ? endTime : "23:59",
        min_spend_on: minspendOn,
        min_spend: minspendOn ? minspend : null,
        weekday_on: weekdayOn,
        mon_on: weekdays.includes('Monday'),
        tue_on: weekdays.includes('Tuesday'),
        wed_on: weekdays.includes('Wednesday'),
        thur_on: weekdays.includes('Thursday'),
        fri_on: weekdays.includes('Wednesday'),
        sat_on: weekdays.includes('Saturday'),
        sun_on: weekdays.includes('Sunday'),
        discount_value: offerType === 'Discount voucher' ? discount : null,
        token_price: tokenPrice
    }


    const voucherJson = {
        testId,
        unformated_title:unformated_title,
        unformated_tc_title:unformatedt_tc_title,
        channel,
        voucherType: resolveVoucherType,
        unformated_description:unFormatedDescriptionPair.en,
        unformated_tc_description:unFormatedDescriptionPair.tc,
        startDate:dateStringFormat(startDate),
        endDate:dateStringFormat(endDate),
        minspendOn,
        minspend,
        timeOn,
        startTime,
        endTime,
        weekdayOn,
        weekdays,
        offerType,
        discount,
        quota,
        isUnlimitQuota,
        tokenPrice:havePrice?tokenPrice:0
    } satisfies VoucherJSON

    function tableValue(head: DATA_HEADING) {
        const value = tabe_data[head]
        if(value === null)  return 'NULL'
        if (typeof value === 'boolean') return value ? 1 : 0
        return value
    }

    const copyHeaders = async ()=>{
        const header = DATA_HEADINGS.map(h => h).join('\t')
        await copy({
            label: `Copied table headers to clipboard`,
            value:header
        })
    }

    const createVoucherData = async () => {
        const value = DATA_HEADINGS.map(h => tableValue(h)).join('\t')
        const table = {
            'label': 'Table Values Except Descriptions',
            'value': value,
            description:`Remember to also paste the descriptions ${!autoIncrement.value? 'and incrment the Test ID':''}`
        }

        const to_copy = [
            {
                label: 'English description', value: description
            },
            {
                label: 'Chinese description', value: tc_description
            },
            table,
        ] as {
            label: string
            value: string
            description?:string
        }[]
        let idx = 0
        const wait = 500
        const fn = async () => {
            if (idx === to_copy.length) {
                autoIncrement.value  && setTestId(prev=>prev+1)
                return
            }
            const { label, value,description } = to_copy[idx]
            await copy({
                label,
                value,
                description
            })
            idx++
            window.setTimeout(() => fn(), wait)
        }
        window.setTimeout(() => fn(), wait)
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
        haveEligibility,
        havePrice,
        isForceLimitedQuota,
        isForceUnlimitQuota,
        isUnlimitQuota,
        resolveVoucherType,
        weekdayTitle,
        title,
        description,
        tc_title,
        tc_description,
        tabe_data,
        voucherJson,
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
        createVoucherData,
        copyHeaders
    }

    return [data, action] as const
}

export default useVoucherData


