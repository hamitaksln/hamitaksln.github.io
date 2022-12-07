import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

export default defineConfig({
    site: "https://hamitaksln.github.io",
    base: "/",
    integrations: [react(), tailwind({ config: { applyBaseStyles: false } })]
})
