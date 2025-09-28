import { useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { INCOME_TYPES, TAX_BRACKETS, YOUNG_ENTREPRENEUR_DISCOUNT } from "../constants"
import { getTextWidth } from "../utilities"
import { Footer } from "./Footer"
import { TaxSummary } from "./TaxSummary"

const MoneyInput = (props) => {
    const { setValue, watch } = useFormContext()

    const currentValue = watch(props.id)
    const [inputTextWidth, setInputTextWidth] = useState(0)

    const handleOnChange = (e, i) => {
        setValue(props.id, e.floatValue)
        setInputTextWidth(getTextWidth({ value: e.formattedValue }))
    }

    return (
        <div className="">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <div className="form-control w-full relative">
                <NumericFormat
                    prefix={"₺ "}
                    allowNegative={false}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    value={currentValue}
                    onValueChange={handleOnChange}
                    type="text"
                    className="input input-bordered placeholder:text-gray-600"
                    {...props}
                />
                {currentValue > 0 && (
                    <div
                        className="absolute top-1/2 px-4 transform -translate-y-1/2 pointer-events-none"
                        style={{ left: `${inputTextWidth}px` }}
                    >
                        <p className="text-gray-300">{".000"}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const TaxForm = () => {
    const methods = useForm({
        defaultValues: {
            incomeType: INCOME_TYPES.wage,
            activeBracketIndex: 0,
            totalTax: 0,
            totalProfit: 0,
            profitTaxRate: 0
        }
    })
    const { register, handleSubmit, setValue } = methods

    const calculateTax = (data) => {
        const brackets = TAX_BRACKETS[data.incomeType]
        let { yearlyIncome, yearlyExpense } = data

        if (yearlyIncome === undefined) {
            yearlyIncome = 0
        }

        const multipliedIncome = (yearlyIncome || 0) * 1_000
        const multipliedExpense = (yearlyExpense || 0) * 1_000

        let textBase = multipliedIncome - multipliedExpense

        if (data?.isYoungEntrepreneur) {
            textBase = textBase - YOUNG_ENTREPRENEUR_DISCOUNT
        }

        if (data.isSoftwareExport) {
            textBase = textBase * 0.2
        }

        if (textBase < 0) return [0, 0, 0, 0]

        let tax = 0
        let activeBracketIndex = 0

        for (let i = 0; i < brackets.length; i++) {
            const bracket = brackets[i]
            const { baseAmount, partialAmount, partialTax, rate, type } = bracket

            if (type === "lower" ? textBase <= baseAmount : textBase > baseAmount) {
                tax = (textBase - partialAmount) * rate + partialTax
                activeBracketIndex = i
                break
            }
        }

        const totalProfit = (yearlyIncome || 0) - (yearlyExpense || 0)
        const profitTaxRate = (tax / (totalProfit * 1000)) * 100 || 0

        return [tax, activeBracketIndex, totalProfit, profitTaxRate]
    }

    const onSubmit = (data) => {
        const [tax, activeBracketIndex, totalProfit, profitTaxRate] = calculateTax(data)

        setValue("totalTax", tax)
        setValue("activeBracketIndex", activeBracketIndex)
        setValue("totalProfit", totalProfit)
        setValue("profitTaxRate", profitTaxRate)
    }

    return (
        <FormProvider {...methods}>
            <form className="flex flex-col gap-4 form-control" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="label cursor-pointer">
                        <span className="label-text">{"Ücret geliri"}</span>
                        <input
                            type="radio"
                            name="radio-10"
                            value="wage"
                            className="radio radio-primary"
                            {...register("incomeType")}
                            defaultChecked={true}
                        />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">{"Ücret dışı gelir"}</span>
                        <input
                            type="radio"
                            name="radio-10"
                            value="noneWage"
                            className="radio radio-primary"
                            {...register("incomeType")}
                        />
                    </label>
                </div>
                <div>
                    <label className="label cursor-pointer">
                        <span className="label-text">
                            {`Yurtdışı yazılım/tasarım ihracatı`} <b>%80</b> {`kazanç istisnası`}
                        </span>
                        <input
                            type="checkbox"
                            defaultChecked={false}
                            className="checkbox checkbox-primary"
                            {...register("isSoftwareExport")}
                        />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">{"Genç Girişimci"}</span>
                        <input
                            type="checkbox"
                            {...register("isYoungEntrepreneur")}
                            defaultChecked={false}
                            className="checkbox checkbox-primary"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <MoneyInput
                        id="yearlyIncome"
                        placeholder="₺ 200.000"
                        label="Yıllık geliriniz"
                    />
                    <MoneyInput
                        id="yearlyExpense"
                        placeholder="₺ 100.000"
                        label="Yıllık gideriniz"
                    />
                </div>
                <TaxSummary />
                <button className="btn btn-primary">Hesapla</button>
            </form>
        </FormProvider>
    )
}

export default function TaxCalculator() {
    return (
        <div className="container flex min-h-screen h-full min-w-full flex-col mx-auto">
            <div className="flex-1 flex h-full w-full flex-col justify-between items-center">
                <div className="hero mt-0 sm:mt-6">
                    <div className="hero-content text-center">
                        <div className="max-w-md space-y-4 sm:space-y-12">
                            <h1 className="sm:text-5xl text-2xl font-bold">
                                2025 Gelir Vergisi Hesaplama
                            </h1>
                            <TaxForm />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
