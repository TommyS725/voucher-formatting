import { Channels, OfferTypes, VoucherTypes } from "@/lib/types"
import { FC } from "react"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import SwitchInput from "./SwitchInput"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import useVoucherData from "@/hooks/useVocuherData"




type Props = {
    data: ReturnType<typeof useVoucherData>[0]

    update:  ReturnType<typeof useVoucherData>[1]


}

// tester, startDate, endDate, channel, voucherType, offerType,unlimitQuota, quota, dsicount
const RequiredFields: FC<Props> = ({ data, update }) => {
   
    return (
        <div className="mt-8  space-y-8">
            <TextInput label="Tester" placeholder="Tester"  setter={update.setTester} defaultValue={data.tester} />
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
            <SelectInput label="Voucher Type" options={[...VoucherTypes]} value={data.resolveVoucherType}
            disabled={data.channel!=='Brand voucher'} setter={update.setVoucherType} />
            {data.havePrice &&
                <TextInput label="Token Price" placeholder="Token Price" setter={update.setTokenPrice} defaultValue={data.tokenPrice} type='number' />
            }

            {
                !data.isForceUnlimitQuota && <TextInput label="Quota" placeholder="Quota" setter={update.setQuota}
                    min='1' disabled={data.unlimitQuota || data.channel === 'Airdrop'}
                    defaultValue={data.quota} type='number' />
            }
            {
                !data.isForceLimitedQuota&&
                <SwitchInput label="Unlimited Quota" setter={update.setUnlimitQuota}
                    checked={data.isUnlimitQuota} disabled={data.isForceLimitedQuota} />
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