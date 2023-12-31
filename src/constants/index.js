export const INCOME_TYPES = {
    wage: "wage",
    noneWage: "noneWage"
}

export const TAX_BRACKETS = {
    [INCOME_TYPES.wage]: [
        { baseAmount: 110_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 230_000,
            type: "lower",
            partialAmount: 110_000,
            partialTax: 16_500,
            rate: 0.2
        },
        {
            baseAmount: 870_000,
            type: "lower",
            partialAmount: 230_000,
            partialTax: 40_500,
            rate: 0.27
        },
        {
            baseAmount: 3_000_000,
            type: "lower",
            partialAmount: 870_000,
            partialTax: 213_300,
            rate: 0.35
        },
        {
            baseAmount: 3_000_000,
            type: "upper",
            partialAmount: 3_000_000,
            partialTax: 958_800,
            rate: 0.4
        }
    ],
    [INCOME_TYPES.noneWage]: [
        { baseAmount: 110_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 230_000,
            type: "lower",
            partialAmount: 110_000,
            partialTax: 16_500,
            rate: 0.2
        },
        {
            baseAmount: 580_000,
            type: "lower",
            partialAmount: 230_000,
            partialTax: 40_500,
            rate: 0.27
        },
        {
            baseAmount: 3_000_000,
            type: "lower",
            partialAmount: 580_000,
            partialTax: 135_000,
            rate: 0.35
        },
        {
            baseAmount: 3_000_000,
            type: "upper",
            partialAmount: 3_000_000,
            partialTax: 982_000,
            rate: 0.4
        }
    ]
}

export const YOUNG_ENTREPRENEUR_DISCOUNT = 230_000

export const DIGIT_REGEX = /^[\d]+$/
