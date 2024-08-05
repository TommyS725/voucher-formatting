import { Channels, OfferTypes, VoucherTypes } from "@/lib/types"
import TextInput from "./TextInput"
import SelectInput from "./SelectInput"
import SwitchInput from "./SwitchInput"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useVoucherDataContext } from "@/contexts/voucher-data-provider"
import { useSettingContext } from "@/contexts/setting-provider"
import { useEffect } from "react"
import { useToast } from "./ui/use-toast"


// tester, startDate, endDate, channel, voucherType, offerType,unlimitQuota, quota, dsicount
const RequiredFields = () => {
    const [data, update] = useVoucherDataContext()
    const { autoIncrement } = useSettingContext()
    const { toast } = useToast()

    useEffect(() => {
        const action = (ev: MessageEvent<any>) => {
            if (ev.data.name === 'copied' ) {
                const title = "Voucher Data Copied To Autofill"
                if (ev.data.inc === true && localStorage.getItem('autoIncrement') === 'true') {
                    update.setTestId(prev => {
                        const id = prev + 1
                        toast({
                            title,
                            description: `Test ID Auto Incremneted From ${prev} to ${id}`
                        })
                        return id
                    })
                } else {
                    toast({
                        title,
                    })
                }
            }
        }
        window.addEventListener('message', action)
        return () => window.removeEventListener('message', action)
    }, [])

    return (
        <div className="mt-8  space-y-8">
            <TextInput label="Tester" placeholder="Tester" setter={update.setTester} defaultValue={data.tester} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label >Test ID</Label>
                <div className=" flex space-x-16">
                    <Input type='number' placeholder={'Test ID'} value={data.testId}
                        onChange={(e) => update.setTestId(Number(e.target.value))}
                    />
                    <Button onClick={() => update.setTestId(prev => prev + 1)}>Increment {autoIncrement.value ? '(Auto Incrementing)' : ''}</Button>
                </div>
            </div>
            <TextInput className="dark:[color-scheme:dark]" label="Start Date" placeholder="Start Date" setter={update.setStartDate} defaultValue={data.startDate} type='date' />
            <TextInput className="dark:[color-scheme:dark]" label="End Date" placeholder="End Date" setter={update.setEndDate} defaultValue={data.endDate} type='date' />
            <SelectInput label="Channel" options={Channels} value={data.channel} setter={update.setChannel} />
            <SelectInput label="Voucher Type" options={[...VoucherTypes]} value={data.resolveVoucherType}
                disabled={data.channel !== 'Brand voucher'} setter={update.setVoucherType} />
            {data.havePrice &&
                <TextInput label="Token Price" placeholder="Token Price" setter={update.setTokenPrice} defaultValue={data.tokenPrice} type='number' />
            }

            {
                !data.isForceUnlimitQuota && <TextInput label="Quota" placeholder="Quota" setter={update.setQuota}
                    min='1' disabled={data.isUnlimitQuota}
                    defaultValue={data.quota} type='number' />
            }
            {
                !data.isForceLimitedQuota &&
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