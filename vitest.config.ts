import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['json', 'html', 'text-summary', 'text'],
    },
  },
})
