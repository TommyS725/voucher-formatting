import { useToast } from "@/components/ui/use-toast"



type Copyable = {
    label:string
    value:string
    description?:string
}


function useCopy(){
    const {toast} = useToast()

    const copy = async (copyable:Copyable)=>{
        const {value,label,description} = copyable
        await navigator.clipboard.writeText(value)
        toast({
            title: `Copied [${label}] to clipboard`,
            description
        })
    }

    return {
        copy
    }
}

export default useCopy