import { useState } from "react"
import { useForm, useFormContext, FormProvider } from "react-hook-form"
import { Footer } from "./Footer"

const INCOME_TYPES = {
    wage: "wage",
    noneWage: "noneWage"
}

const TAX_BRACKETS = {
    [INCOME_TYPES.wage]: [
        { baseAmount: 32_000, partialAmount: 0, partialTax: 0, rate: 0.15 },
        { baseAmount: 70_000, partialAmount: 32_000, partialTax: 4_800, rate: 0.2 },
        { baseAmount: 250_000, partialAmount: 70_000, partialTax: 12_400, rate: 0.27 },
        { baseAmount: 880_000, partialAmount: 250_000, partialTax: 61_000, rate: 0.35 },
        { baseAmount: 880_000 ** 10, partialAmount: 880_000, partialTax: 281_500, rate: 0.4 }
    ],
    [INCOME_TYPES.noneWage]: [
        { baseAmount: 32_000, partialAmount: 0, partialTax: 0, rate: 0.15 },
        { baseAmount: 70_000, partialAmount: 32_000, partialTax: 4_800, rate: 0.2 },
        { baseAmount: 170_000, partialAmount: 70_000, partialTax: 12_400, rate: 0.27 },
        { baseAmount: 880_000, partialAmount: 170_000, partialTax: 39_400, rate: 0.35 },
        { baseAmount: 880_000 ** 10, partialAmount: 880_000, partialTax: 287_900, rate: 0.4 }
    ]
}

const digitRegex = /^[\d]+$/

const NumberInput = (props) => {
    const { setValue, watch } = useFormContext()
    const currentValue = watch(props.id)

    const handleOnChange = (e, i) => {
        if (e.nativeEvent.data && !digitRegex.test(e.nativeEvent.data)) return

        setValue(props.id, parseFloat(e.target.value) || 0, { valueAsNumber: true })
    }
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <input
                value={currentValue}
                type="text"
                onChange={handleOnChange}
                className="input input-bordered"
                {...props}
            />
        </div>
    )
}

const TaxForm = () => {
    const [tax, setTax] = useState(0)
    const methods = useForm({ defaultValues: { yearlyIncome: 420000 } })
    const { register, handleSubmit } = methods

    const taxDisplay = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY"
    }).format(tax)

    const calculateTax = (data) => {
        const brackets = TAX_BRACKETS[data.incomeType]
        const { yearlyIncome } = data
        let textBase = yearlyIncome

        if (data?.isYoungEntrepreneur) {
            textBase = textBase - 75_000
        }

        if (data.isSoftwareExport) {
            textBase = textBase / 2
        }
        if (textBase < 0) return 0

        let tax = 0
        for (let i = 0; i < brackets.length; i++) {
            const bracket = brackets[i]
            const { baseAmount, partialAmount, partialTax, rate } = bracket

            if (textBase <= baseAmount) {
                tax = (textBase - partialAmount) * rate + partialTax
                break
            }
        }

        return tax
    }

    const onSubmit = (data) => {
        if (data.yearlyIncome <= 0) return

        const tax = calculateTax(data)

        if (tax) {
            setTax(tax)
        }
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

                <NumberInput
                    id="yearlyIncome"
                    placeholder="Yıllık kazanç"
                    label="Yıllık kazancınız"
                />
                <div className="flex justify-between text-xl">
                    <span>{"Ödemeniz gereken vergi miktarı:"}</span>
                    <span>{taxDisplay}</span>
                </div>
                <button className="btn btn-primary">Hesapla</button>
            </form>
        </FormProvider>
    )
}

export default function TaxCalculator() {
    return (
        <div className="container mx-auto">
            <div className="h-screen flex flex-col justify-between">
                <div className="hero mt-12">
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
