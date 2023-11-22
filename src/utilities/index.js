import clsx from "clsx"
import { twMerge } from "tailwind-merge"

/* 
Credit: anner burton
https://stackoverflow.com/a/61088413/10873418
*/

export const getTextWidth = ({ fontSize = "16px", value }) => {
    if (typeof document === "undefined") return 0

    let div = document.createElement("div")
    div.innerText = value
    div.style.fontSize = fontSize
    div.style.width = "auto"
    div.style.display = "inline-block"
    div.style.visibility = "hidden"
    div.style.position = "fixed"
    div.style.overflow = "auto"
    document.body.append(div)
    let width = div.clientWidth
    div.remove()
    return width
}

export const getTRYFormat = (value) => {
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(value)
}

export function cn(...classes) {
    return twMerge(clsx(...classes))
}
