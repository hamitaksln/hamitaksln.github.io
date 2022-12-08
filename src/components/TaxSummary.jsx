import { clsx } from "@mantine/core"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { TAX_BRACKETS } from "../constants"
import { getTRYFormat } from "../utilities"

const TaxBracket = ({ bracket }) => {
    const formatTaxBracket = (bracket) => {
        let output = ""
        if (bracket.type === "lower") {
            output += `${getTRYFormat(bracket.baseAmount)}'ye kadar `
        } else if (bracket.type === "upper") {
            output += `${getTRYFormat(bracket.baseAmount)}'den fazlası `
        }

        if (bracket.partialAmount !== 0) {
            output += `${getTRYFormat(bracket.partialAmount)} için `
            output += `${getTRYFormat(bracket.partialTax)}, fazlası`
        }
        return output
    }

    const taxBracketDisplay = useMemo(() => formatTaxBracket(bracket), [bracket])
    const taxRateDisplay = useMemo(() => `${(bracket.rate * 100).toFixed(0)}%`, [bracket.rate])

    return (
        <div
            className={clsx(
                { "bg-base-content/10 text-gray-300 font-semibold rounded": bracket?.selected },
                "text-xs sm:text-sm flex justify-between px-1"
            )}
        >
            <span>{taxBracketDisplay}</span>
            <span>{taxRateDisplay}</span>
        </div>
    )
}

const TaxBrackets = ({ brackets }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between px-1 font-semibold">
                <span>Dilim</span>
                <span>Oran</span>
            </div>
            {brackets.map((bracket, i) => (
                <TaxBracket bracket={bracket} key={i} />
            ))}
        </div>
    )
}

export const TaxSummary = ({}) => {
    const { watch } = useFormContext()

    const watchFields = watch(["totalTax", "incomeType", "activeBracketIndex"])
    const [totalTax, incomeType, activeBracketIndex] = watchFields

    const taxDisplay = useMemo(() => getTRYFormat(totalTax), [totalTax])

    const brackets = useMemo(
        () =>
            TAX_BRACKETS[incomeType]?.map((el, i) => ({
                ...el,
                selected: activeBracketIndex === i
            })),
        [incomeType, activeBracketIndex]
    )

    if (totalTax === null || totalTax === undefined) return null

    return (
        <div className="space-y-6">
            <div className="divider"></div>
            <div className="flex justify-between items-center ">
                <span>{"Toplam vergi miktarı:"}</span>
                <span className="text-xl">{taxDisplay}</span>
            </div>
            <TaxBrackets brackets={brackets} />
        </div>
    )
}
