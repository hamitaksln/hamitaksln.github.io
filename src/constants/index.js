export const INCOME_TYPES = {
    wage: "wage",
    noneWage: "noneWage"
}

export const TAX_BRACKETS = {
    [INCOME_TYPES.wage]: [
        { baseAmount: 32_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        { baseAmount: 70_000, type: "lower", partialAmount: 32_000, partialTax: 4_800, rate: 0.2 },
        {
            baseAmount: 250_000,
            type: "lower",
            partialAmount: 70_000,
            partialTax: 12_400,
            rate: 0.27
        },
        {
            baseAmount: 880_000,
            type: "lower",
            partialAmount: 250_000,
            partialTax: 61_000,
            rate: 0.35
        },
        {
            baseAmount: 880_000,
            type: "upper",
            partialAmount: 880_000,
            partialTax: 281_500,
            rate: 0.4
        }
    ],
    [INCOME_TYPES.noneWage]: [
        { baseAmount: 32_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        { baseAmount: 70_000, type: "lower", partialAmount: 32_000, partialTax: 4_800, rate: 0.2 },
        {
            baseAmount: 170_000,
            type: "lower",
            partialAmount: 70_000,
            partialTax: 12_400,
            rate: 0.27
        },
        {
            baseAmount: 880_000,
            type: "lower",
            partialAmount: 170_000,
            partialTax: 39_400,
            rate: 0.35
        },
        {
            baseAmount: 880_000,
            type: "upper",
            partialAmount: 880_000,
            partialTax: 287_900,
            rate: 0.4
        }
    ]
}

export const DIGIT_REGEX = /^[\d]+$/
