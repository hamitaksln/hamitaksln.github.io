export const INCOME_TYPES = {
    wage: "wage",
    noneWage: "noneWage"
}

export const TAX_BRACKETS = {
    [INCOME_TYPES.wage]: [
        { baseAmount: 71_337, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 156_000,
            type: "lower",
            partialAmount: 71_337,
            partialTax: 10_650,
            rate: 0.2
        },
        {
            baseAmount: 378_000,
            type: "lower",
            partialAmount: 156_000,
            partialTax: 27_650,
            rate: 0.27
        },
        {
            baseAmount: 1_961_000,
            type: "lower",
            partialAmount: 378_000,
            partialTax: 87_590,
            rate: 0.35
        },
        {
            baseAmount: 1_961_000,
            type: "upper",
            partialAmount: 1_961_000,
            partialTax: 641_640,
            rate: 0.4
        }
    ],
    [INCOME_TYPES.noneWage]: [
        { baseAmount: 71_337, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 156_000,
            type: "lower",
            partialAmount: 71_337,
            partialTax: 10_650,
            rate: 0.2
        },
        {
            baseAmount: 378_000,
            type: "lower",
            partialAmount: 156_000,
            partialTax: 27_650,
            rate: 0.27
        },
        {
            baseAmount: 1_961_000,
            type: "lower",
            partialAmount: 378_000,
            partialTax: 87_590,
            rate: 0.35
        },
        {
            baseAmount: 1_961_000,
            type: "upper",
            partialAmount: 1_961_000,
            partialTax: 641_640,
            rate: 0.4
        }
    ]
}

export const DIGIT_REGEX = /^[\d]+$/
