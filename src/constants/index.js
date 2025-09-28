export const INCOME_TYPES = {
    wage: "wage",
    noneWage: "noneWage"
}

export const TAX_BRACKETS = {
    [INCOME_TYPES.wage]: [
        { baseAmount: 158_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 330_000,
            type: "lower",
            partialAmount: 158_000,
            partialTax: 23_700,
            rate: 0.2
        },
        {
            baseAmount: 1_200_000,
            type: "lower",
            partialAmount: 330_000,
            partialTax: 58_100,
            rate: 0.27
        },
        {
            baseAmount: 4_300_000,
            type: "lower",
            partialAmount: 1_200_000,
            partialTax: 293_000,
            rate: 0.35
        },
        {
            baseAmount: 4_300_000,
            type: "upper",
            partialAmount: 4_300_000,
            partialTax: 1_378_000,
            rate: 0.4
        }
    ],
    [INCOME_TYPES.noneWage]: [
        { baseAmount: 158_000, type: "lower", partialAmount: 0, partialTax: 0, rate: 0.15 },
        {
            baseAmount: 330_000,
            type: "lower",
            partialAmount: 158_000,
            partialTax: 23_700,
            rate: 0.2
        },
        {
            baseAmount: 800_000,
            type: "lower",
            partialAmount: 330_000,
            partialTax: 58_100,
            rate: 0.27
        },
        {
            baseAmount: 4_300_000,
            type: "lower",
            partialAmount: 800_000,
            partialTax: 185_000,
            rate: 0.35
        },
        {
            baseAmount: 4_300_000,
            type: "upper",
            partialAmount: 4_300_000,
            partialTax: 1_410_000,
            rate: 0.4
        }
    ]
}

export const YOUNG_ENTREPRENEUR_DISCOUNT = 230_000

export const DIGIT_REGEX = /^[\d]+$/
