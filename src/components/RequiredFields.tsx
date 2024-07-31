import { Channel, Channels, OfferType, OfferTypes, VoucherType, VoucherTypes } from "@/types"
import { FC } from "react"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import SwitchInput from "./SwitchInput"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { havePrice, isForceLimitedQuota, isForceUnlimitQuota, isUnlimitQuota, resolveVoucherType } from "@/lib/utils"




type Props = {
    data: {
        tester: string
        testId: number
        startDate: string
        endDate: string
        channel: Channel
        voucherType: VoucherType
        tokenPrice: number
        offerType: OfferType
        unlimitQuota: boolean
        quota: number
        discount: number
    },

    update: {
        setTester: (value: string) => void
        setTestId: (value: number) => void
        setStartDate: (value: string) => void
        setEndDate: (value: string) => void
        setChannel: (value: Channel) => void
        setVoucherType: (value: VoucherType) => void
        setTokenPrice: (value: number) => void
        setOfferType: (value: OfferType) => void
        setUnlimitQuota: (value: boolean) => void
        setQuota: (value: number) => void
        setDiscount: (value: number) => void
    }

}

// tester, startDate, endDate, channel, voucherType, offerType,unlimitQuota, quota, dsicount
const RequiredFields: FC<Props> = ({ data, update }) => {
    const showPrice = havePrice(data.channel, data.voucherType)
    const forceUnlimitQuota = isForceUnlimitQuota(data.channel)
    const forceLimitedQuota = isForceLimitedQuota(data.channel, data.voucherType)
    const unlimitQuota = isUnlimitQuota(data.channel, data.voucherType, data.unlimitQuota)
    const resolvedVoucherType = resolveVoucherType(data.channel, data.voucherType)
    return (
        <div className="mt-8  space-y-8">
            <TextInput label="Tester" placeholder="Tester" setter={update.setTester} defaultValue={data.tester} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label >Test ID</Label>
                <div className=" flex space-x-16">
                    <Input type='number' placeholder={'Test ID'} value={data.testId}
                        onChange={(e) => update.setTestId(Number(e.target.value))}
                    />
                    <Button onClick={() => update.setTestId(data.testId + 1)}>Increment</Button>
                </div>
            </div>
            <TextInput label="Start Date" placeholder="Start Date" setter={update.setStartDate} defaultValue={data.startDate} type='date' />
            <TextInput label="End Date" placeholder="End Date" setter={update.setEndDate} defaultValue={data.endDate} type='date' />
            <SelectInput label="Channel" options={Channels} value={data.channel} setter={update.setChannel} />
            <SelectInput label="Voucher Type" options={[...VoucherTypes]} value={resolvedVoucherType}
            disabled={data.channel!=='Brand voucher'} setter={update.setVoucherType} />
            {showPrice &&
                <TextInput label="Token Price" placeholder="Token Price" setter={update.setTokenPrice} defaultValue={data.tokenPrice} type='number' />
            }

            {
                !forceUnlimitQuota && <TextInput label="Quota" placeholder="Quota" setter={update.setQuota}
                    min='1' disabled={data.unlimitQuota || data.channel === 'Airdrop'}
                    defaultValue={data.quota} type='number' />
            }
            {
                !forceLimitedQuota &&
                <SwitchInput label="Unlimited Quota" setter={update.setUnlimitQuota}
                    checked={unlimitQuota} disabled={forceLimitedQuota || forceLimitedQuota} />
            }

            <SelectInput label="Offer Type" options={[...OfferTypes]}
                value={data.offerType} setter={update.setOfferType} />
            {data.offerType === 'Discount voucher' &&
                <TextInput label="Discount " placeholder="Discount " disabled={data.offerType !== 'Discount voucher'}
                    setter={update.setDiscount} defaultValue={data.discount} type='number' />}


        </div>
    )
}

export default RequiredFields