import useVoucherData from "@/hooks/useVocuherData"
import CopyField from "./copy_fields/CopyField"
import { Button } from "./ui/button"
import InlineCopyField from "./copy_fields/InlineCopyField"
import { dateStringFormat } from "@/lib/utils"



type Props = {
    data: ReturnType<typeof useVoucherData>[0]
    action: ReturnType<typeof useVoucherData>[1]
}


function Output({ data, action }: Props) {



    return (
        <div className="space-y-10">
            <div className=" flex flex-wrap gap-8 justify-between">

                <pre className="text-2xl font-semibold">Output</pre>
                {data.tester &&
                    <div className=" space-x-10">

                        <Button onClick={action.createVoucherData}>Copy Voucher Data</Button>
                        <Button variant={'secondary'} onClick={action.copyHeaders}>Copy Table Headers</Button>

                    </div>

                }
            </div>
            {
                !data.tester && <h1 className="text-xl font-semibold text-red-500">
                    Plese first fill in tester name in the Required tab
                </h1>
            }
            {
                data.tester &&
                <div className="space-y-10">
                    <div className=" space-y-8">
                        <CopyField title="Title" text={data.title} />
                        <CopyField title="TC Title" text={data.tc_title} />
                        <CopyField title="Description" text={data.description} />
                        <CopyField title="TC Description" text={data.tc_description} />
                    </div>
                    <div className=" space-y-3">
                        <InlineCopyField title="Offer Valid Period" text={[data.startDate, data.endDate].map(dateStringFormat)}
                            deliminitor="To" label={['Start Date', 'End Date']} />
                        {data.havePrice && <InlineCopyField title="Redeem Token" text={data.tokenPrice} />}
                        {data.offerType === 'Discount voucher' && <InlineCopyField title={'Offer Value'} text={data.discount} />}
                        {!data.isUnlimitQuota && <InlineCopyField title="Quota" text={data.quota}  />}
                        {data.minspendOn && <InlineCopyField title="Minimum Spend" text={data.minspend} />}
                        {data.weekdayOn && <InlineCopyField title="Weekdays" text={data.weekdays} label={data.weekdays} />}
                        {data.timeOn&& <InlineCopyField title="Time of day" deliminitor="To" text={[data.startTime,data.endTime]} label={['Start Date','End Date']} />}
                        

                    </div>
                </div>
            }


        </div>
    )
}


export default Output