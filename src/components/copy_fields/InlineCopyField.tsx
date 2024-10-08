import useCopy from "@/hooks/useCopy"
import { arrayrify } from "@/lib/utils"
import { useId, useMemo } from "react"




type Props = {
    title: string
    text: string[] | string | number | number[]
    label?:string[] | string
    deliminitor?: string
}

function InlineCopyField(props: Props) {
    const { text, title, deliminitor = ',' } = props
    const value = useMemo(() => arrayrify(text), [text])
    const label = useMemo(()=>props.label?arrayrify(props.label):undefined,[props.label])
    const { copy } = useCopy()
    const id = useId()
    return (
        <div className=" space-x-4">
            <span className="text-lg font-semibold">{title}:</span>
            <span className=" space-x-2">
                {
                    value.map((v, i) =>
                        <span  key={`${id}-${i}`}>
                            {i > 0 && <span className=" mr-2">{deliminitor}</span>}
                            <span 
                            onClick={() => copy({
                                label: label?.[i] ??title,
                                value: String(v)
                            })} className="hover:opacity-50 cursor-pointer "  >
                                {v}
                            </span>

                        </span>)
                }
            </span>
        </div>
    )
}

export default InlineCopyField

