import { defineConfig } from "astro/config"
import react from "@astrojs/react"

// https://astro.build/config
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
    // Enable React to support React JSX components.
    integrations: [react(), tailwind({ config: { applyBaseStyles: false } })]
})
