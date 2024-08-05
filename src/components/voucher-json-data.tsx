import { useVoucherDataContext } from "@/contexts/voucher-data-provider";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";


const DATA_ID = 'v_json'

function VoucherJsonData() {
    const [data,update] = useVoucherDataContext()
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


    return (<>
    {data.tester && <p className="hidden" id={DATA_ID}>{JSON.stringify(data.voucherJson)}</p>}
    </>)
}


export default VoucherJsonData
  