import useVoucherData from "@/hooks/useVocuherData"
import CopyField from "./CopyField"
import { Button } from "./ui/button"



type Props = {
    data: ReturnType<typeof useVoucherData>[0]
    action: ReturnType<typeof useVoucherData>[1]
}


function Output({ data,action}: Props) {



    return (
        <div className="space-y-10">
            <div className=" flex flex-wrap gap-8 justify-between">

            <pre className="text-2xl font-semibold">Output</pre>
            {data.tester &&
            <div className=" space-x-10">

            <Button onClick={action.createVoucherData}>Confirm voucher data</Button>
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
                <div className=" space-y-8">
                    <CopyField title="Title" text={data.title} />
                    <CopyField title="TC Title" text={data.tc_title} />
                    <CopyField title="Description" text={data.description} />
                    <CopyField title="TC Description" text={data.tc_description} />
                </div>
            }


        </div>
    )
}


export default Output