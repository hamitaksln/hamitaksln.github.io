export const INCOME_TYPES = {
    wage: "wage",
    noneWage: "noneWage"
}

export const TAX_BRACKETS = {
    [INCOME_TYPES.wage]: [
        { baseAmount: 70_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 150_000,
            type: "lower",
            partialAmount: 70_000,
            partialTax: 10_500,
            rate: 0.2
        },
        {
            baseAmount: 550_000,
            type: "lower",
            partialAmount: 150_000,
            partialTax: 26_500,
            rate: 0.27
        },
        {
            baseAmount: 1_900_000,
            type: "lower",
            partialAmount: 550_000,
            partialTax: 134_500,
            rate: 0.35
        },
        {
            baseAmount: 1_900_000,
            type: "upper",
            partialAmount: 1_900_000,
            partialTax: 607_000,
            rate: 0.4
        }
    ],
    [INCOME_TYPES.noneWage]: [
        { baseAmount: 70_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 150_000,
            type: "lower",
            partialAmount: 70_000,
            partialTax: 10_500,
            rate: 0.2
        },
        {
            baseAmount: 370_000,
            type: "lower",
            partialAmount: 150_000,
            partialTax: 26_500,
            rate: 0.27
        },
        {
            baseAmount: 1_900_000,
            type: "lower",
            partialAmount: 370_000,
            partialTax: 85_900,
            rate: 0.35
        },
        {
            baseAmount: 1_900_000,
            type: "upper",
            partialAmount: 1_900_000,
            partialTax: 621_400,
            rate: 0.4
        }
    ]
}

export const DIGIT_REGEX = /^[\d]+$/
