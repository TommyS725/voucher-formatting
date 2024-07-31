import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useId } from "react"


type Props = {
    label: string
    checked: boolean
    setter: (value: boolean) => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function SwitchInput(props: Props) {
    const { label, checked, setter,...rest } = props
    const id = useId()
    return (
        <div className="flex items-center space-x-2">
            <Switch id={id} checked={checked} onCheckedChange={e=>setter(e)} {...rest} />
            <Label htmlFor={id}>{label }</Label>
        </div>
    )
}


export default SwitchInput