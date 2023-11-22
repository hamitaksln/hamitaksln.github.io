import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { TAX_BRACKETS } from "../constants"
import { cn, getTRYFormat } from "../utilities"

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
            className={cn(
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

    const [totalTax, incomeType, activeBracketIndex, totalProfit, profitTaxRate] = watch([
        "totalTax",
        "incomeType",
        "activeBracketIndex",
        "totalProfit",
        "profitTaxRate"
    ])

    const brackets = useMemo(
        () =>
            TAX_BRACKETS[incomeType]?.map((el, i) => ({
                ...el,
                selected: activeBracketIndex === i
            })),
        [incomeType, activeBracketIndex]
    )

    return (
        <div className="space-y-6">
            <div className="divider"></div>
            <div>
                <div className="flex justify-between items-center ">
                    <span>{"Toplam ödenecek vergi miktarı:"}</span>
                    <span className="text-xl font-semibold">{getTRYFormat(totalTax)}</span>
                </div>
                <div className="flex justify-between items-center ">
                    <span>{"Toplam kar miktarı:"}</span>
                    <span className="">{getTRYFormat(totalProfit * 1000)}</span>
                </div>
                <div className="flex justify-between items-center ">
                    <span>{"Toplam kar/vergi oranı:"}</span>
                    <span className="">{profitTaxRate?.toFixed(2)}%</span>
                </div>
            </div>
            <TaxBrackets brackets={brackets} />
        </div>
    )
}
