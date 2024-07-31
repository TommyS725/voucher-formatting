import { useToast } from "./ui/use-toast"




type Props = {
    text: string
    title: string

}

function CopyField(props: Props) {
    const { text, title } = props
    const { toast } = useToast()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
        toast({
            title: `Copied [${title}] to clipboard`,
        })
    }

    return (
        <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            <pre onClick={copyToClipboard} className="mt-4  hover:opacity-50 cursor-pointer "  >
                {text}
            </pre>
        </div>
    )
}

export default CopyField

