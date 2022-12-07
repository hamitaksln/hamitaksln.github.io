import FontFaceObserver from "fontfaceobserver"
import { useEffect, useState } from "react"

/*
Credit: use-font-face-observer
https://github.com/iamskok/use-font-face-observer
*/

export function useFontFaceObserver(
    fontFaces = [],
    { testString, timeout } = {},
    { showErrors } = { showErrors: false }
) {
    const [isResolved, setIsResolved] = useState(false)
    const fontFacesString = JSON.stringify(fontFaces)

    useEffect(() => {
        const promises = JSON.parse(fontFacesString).map(({ family, weight, style, stretch }) =>
            new FontFaceObserver(family, {
                weight,
                style,
                stretch
            }).load(testString, timeout)
        )

        Promise.all(promises)
            .then(() => setIsResolved(true))
            .catch(() => {
                if (showErrors) {
                    // eslint-disable-next-line no-console
                    console.error(`An error occurred during font loading`)
                }
            })
    }, [fontFacesString, testString, timeout, showErrors])

    return isResolved
}
