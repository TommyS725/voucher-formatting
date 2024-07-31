import useVoucherData from "@/hooks/useVocuherData"
import { havePrice,  isUnlimitQuota, resolveVoucherType, weekdayTitle } from "@/lib/utils"
import { ChannelToSymbol, OfferTypeToSymbol } from "@/types"
import CopyField from "./CopyField"



type Props = {
    data: ReturnType<typeof useVoucherData>[0]
}


function Output({ data }: Props) {
    const showPrice = havePrice(data.channel, data.voucherType)
    const unlimitQuota = isUnlimitQuota(data.channel, data.voucherType, data.unlimitQuota)
    const resolvedVoucherType = resolveVoucherType(data.channel, data.voucherType)

    const title = `${data.tester}${data.testId}_${ChannelToSymbol[data.channel]}_${OfferTypeToSymbol[data.offerType]}`
        + `_m${data.minspendOn ? data.minspend : "0"}_${weekdayTitle(data.weekdayOn, data.weekdays)}`
        + `_${data.timeOn ? data.startTime + "-" + data.endTime : "00:00-23:59"}`
        + `_${unlimitQuota ? "Un" : "q" + data.quota}`

    const description = `Tester: ${data.tester}         Test ID: ${data.testId}\n\n`
        + `Channel: ${data.channel}\nVoucher Type: ${resolvedVoucherType}\n`
        + (showPrice ? `Token Price: ${data.tokenPrice}\n` : '')
        + `Offer Type: ${data.offerType}\n`
        + (data.offerType === 'Discount voucher' ? `Discount value: $${data.discount}\n` : "")
        + `Offer period: ${data.startDate} to ${data.endDate}\n`
        + `Quota: ${unlimitQuota ? 'Unlimited' : data.quota}\n`
        + "\nEligibility:\n"
        + (!data.minspendOn && !data.weekdayOn && !data.timeOn ? 'None\n' :
            ([
                data.minspendOn ? `Minimum Spend: ${data.minspend}\n` : '',
                data.weekdayOn ? `Weekdays: ${data.weekdays.join(', ')}\n` : '',
                data.timeOn ? `Time of day: ${data.startTime} - ${data.endTime}\n` : ''
            ].join('')))

    return (
        <div className="space-y-10">
            <pre className="text-2xl font-semibold">Output   {data.tester?"(CLick to copy)":undefined} </pre>
            {
                !data.tester && <h1 className="text-xl font-semibold text-red-500">
                    Plese first fill in tester name in the Required tab
                </h1>
            }
            {
                data.tester &&
                <div className=" space-y-8">
                    <CopyField title="Title" text={title} />
                    <CopyField title="TC Title" text={"[CN] " + title} />
                    <CopyField title="Description" text={description} />
                    <CopyField title="TC Description" text={"[CN]\n" + description} />
                </div>
            }
        </div>
    )
}


export default Output