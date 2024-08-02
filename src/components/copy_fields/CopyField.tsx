import useCopy from "@/hooks/useCopy"




type Props = {
    text: string
    title: string

}

function CopyField(props: Props) {
    const { text, title } = props
    const {copy} = useCopy()

    return (
        <div>
            {title && <h1 className="text-xl font-semibold">{title}</h1>}
            <pre onClick={()=>copy({
                label:title,
                value:text
            })} className="mt-4  hover:opacity-50 cursor-pointer "  >
                {text}
            </pre>
        </div>
    )
}

export default CopyField

