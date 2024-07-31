import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  useId } from "react"
 
type Text = number | string

type Props<T extends Text> = {
    label: string
    placeholder: string
    setter: (value: T) => void
} & React.InputHTMLAttributes<HTMLInputElement>


function TextInput<T extends Text>(props: Props<T>){
    const {label, placeholder,setter, ...rest} = props
    const id = useId()
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input type={rest.type} id={id}placeholder={placeholder} 
       onChange={(e)=>setter(e.target.value as T)} 
       {...rest}
        />
    </div>
  )
}

export default TextInput