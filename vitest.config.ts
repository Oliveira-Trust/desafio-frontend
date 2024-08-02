import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

const defaultCoverageExcludes = ['coverage/**', 'dist/**', '**/[.]**', 'packages/*/test?(s)/**', '**/*.d.ts', '**/virtual:*', '**/__x00__*', '**/x00*', 'cypress/**', 'test?(s)/**', 'test?(-*).?(c|m)[jt]s?(x)', '**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)', '**/__tests__/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*', '**/vitest.{workspace,projects}.[jt]s?(on)', '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}']

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/__tests__/setup-tests.ts',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul', // or 'v8'
        exclude: [...defaultCoverageExcludes, '**/__tests__/**', 'src/main.ts'],
      },
    }
  })
)