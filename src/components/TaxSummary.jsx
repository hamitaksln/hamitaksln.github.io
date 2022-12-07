import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { TAX_BRACKETS } from "../constants"

const TaxBracket = ({ bracket }) => {
    return <div></div>
}

const TaxBrackets = ({ brackets }) => {
    // Brackets will be added soon
    return null
    return (
        <div className="flex flex-col gap-4">
            {brackets.map((bracket, i) => (
                <TaxBracket bracket={bracket} key={i} />
            ))}
        </div>
    )
}

export const TaxSummary = ({}) => {
    const { watch } = useFormContext()

    const totalTax = watch("totalTax")
    const incomeType = watch("incomeType")
    const activeBracketIndex = watch("activeBracketIndex")

    const taxDisplay = useMemo(
        () =>
            new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY"
            }).format(totalTax),
        [totalTax]
    )

    const brackets = useMemo(
        () =>
            TAX_BRACKETS[incomeType]?.map((el, i) => ({
                ...el,
                selected: activeBracketIndex === i
            })),
        [incomeType, activeBracketIndex]
    )

    if (!totalTax) return null

    return (
        <div>
            <div className="divider"></div>
            <div className="flex justify-between items-center ">
                <span>{"Toplam vergi miktarı:"}</span>
                <span className="text-xl">{taxDisplay}</span>
            </div>
            <TaxBrackets brackets={brackets} />
        </div>
    )
}
