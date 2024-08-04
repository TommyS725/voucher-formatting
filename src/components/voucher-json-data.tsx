import { useVoucherDataContext } from "@/contexts/voucher-data-provider";


const DATA_ID = 'v_json'

function VoucherJsonData() {
    const [data] = useVoucherDataContext()



    return (<>
    {data.tester && <p className="hidden" id={DATA_ID}>{JSON.stringify(data.voucherJson)}</p>}
    </>)
}


export default VoucherJsonData
  