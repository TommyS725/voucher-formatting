import useVoucherData from "@/hooks/useVocuherData"
import { createContext, useContext, } from "react"




type VoucherDataState = ReturnType<typeof useVoucherData>

const VoucherDataProvoiderContext = createContext<VoucherDataState|null>(null)


export function VoucherDataProvider({children}: {children:React.ReactNode}){
    const value = useVoucherData()


    return (
        <VoucherDataProvoiderContext.Provider value={value}>
            {children}
        </VoucherDataProvoiderContext.Provider>
    )
}


export function useVoucherDataContext(){
    const context = useContext(VoucherDataProvoiderContext)
    if(context === null){
        throw new Error('useVoucherDataContext must be used within a VoucherDataProvider')
    }
    return context
}
