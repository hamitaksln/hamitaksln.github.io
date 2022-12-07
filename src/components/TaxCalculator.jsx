import { useLayoutEffect, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { DIGIT_REGEX, TAX_BRACKETS } from "../constants"
import { useFontFaceObserver } from "../hooks/useIsFontLoaded"
import { getTextWidth } from "../utilities"
import { Footer } from "./Footer"
import { TaxSummary } from "./TaxSummary"

const MoneyInput = (props) => {
    const { setValue, watch } = useFormContext()

    const currentValue = watch(props.id)
    const [inputTextWidth, setInputTextWidth] = useState(0)

    const isFontLoaded = useFontFaceObserver([{ family: "Inter" }])

    const handleOnChange = (e, i) => {
        if (e.nativeEvent.data && !DIGIT_REGEX.test(e.nativeEvent.data)) return
        if (e.target.value.length > 6) return

        setValue(props.id, parseFloat(e.target.value) || 0, { valueAsNumber: true })
    }

    useLayoutEffect(() => {
        if (!isFontLoaded) return

        setInputTextWidth(getTextWidth({ value: currentValue }))
    }, [currentValue, isFontLoaded])

    return (
        <div className="">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <div className="form-control w-full relative">
                <input
                    value={currentValue}
                    type="text"
                    onChange={handleOnChange}
                    className="input input-bordered"
                    {...props}
                />
                {currentValue > 0 && isFontLoaded && (
                    <div
                        className="absolute top-1/2 px-4 transform -translate-y-1/2 pointer-events-none"
                        style={{ left: `${inputTextWidth}px` }}
                    >
                        <p className="text-gray-400">{".000 TL"}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const TaxForm = () => {
    const methods = useForm({
        defaultValues: { totalTax: 0, yearlyIncome: 420, yearlyExpense: 100, activeBracketIndex: 0 }
    })
    const { register, handleSubmit, setValue } = methods

    const calculateTax = (data) => {
        const brackets = TAX_BRACKETS[data.incomeType]
        const { yearlyIncome, yearlyExpense } = data

        const multipliedIncome = yearlyIncome * 1_000
        const multipliedExpense = yearlyExpense * 1_000

        let textBase = multipliedIncome - multipliedExpense

        if (data?.isYoungEntrepreneur) {
            textBase = textBase - 75_000
        }

        if (data.isSoftwareExport) {
            textBase = textBase / 2
        }

        if (textBase < 0) return [0, 0]

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

        return [tax, activeBracketIndex]
    }

    const onSubmit = (data) => {
        if (data.yearlyIncome <= 0) return

        const [tax, activeBracketIndex] = calculateTax(data)

        setValue("totalTax", tax)
        setValue("activeBracketIndex", activeBracketIndex)
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
                            {"Yurtdışı yazılım ihracatı %50 kazanç istisnası"}
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
                        placeholder="Yıllık gelir"
                        label="Yıllık geliriniz"
                    />
                    <MoneyInput
                        id="yearlyExpense"
                        placeholder="Yıllık gider"
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
        <div className="container flex min-h-screen min-w-full flex-col mx-auto">
            <div className="fixed flex h-full w-full flex-col justify-between items-center">
                <div className="hero mt-6">
                    <div className="hero-content text-center">
                        <div className="max-w-md space-y-16">
                            <h1 className="text-5xl font-bold">Gelir Vergisi Hesaplama</h1>
                            <TaxForm />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
