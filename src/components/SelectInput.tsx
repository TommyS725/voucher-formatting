import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {  useId } from "react"
 

type Props<T extends string> = {
    label: string
    options:T[]
    value: T
    setter: (value: T) => void
    placeholder?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>


function SelectInput<T extends string>(props: Props<T>){
    const {label, options,value,setter,placeholder , ...rest} = props
    const id = useId()
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} defaultValue={value} onValueChange={e=>setter(e as T)} disabled={rest.disabled}>
                <SelectTrigger className="w-[30vw]">
                    <SelectValue placeholder={placeholder ?? label} />
                </SelectTrigger>
                <SelectContent>
                   {options.map((key) => 
                    <SelectItem value={key} key={'select-'+key}>{key}</SelectItem>
                )}
                </SelectContent>
        </Select>
    </div>
  )
}

export default SelectInput