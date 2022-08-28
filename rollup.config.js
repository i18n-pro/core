import ts from 'rollup-plugin-typescript2'
import prettier from 'rollup-plugin-prettier'
import { terser } from 'rollup-plugin-terser'
import { version } from './package.json'

const formats = ['umd', 'umd.min']

const banner = `/*
* i18n-pro
* v${version}
* ${new Date().toLocaleString()}
*/`

const minBanner = `// i18n-pro v${version} ${new Date().toLocaleString()}`

export default formats.map((format, index) => {
  const isLast = (index = index === formats.length - 1)
  let outputExtra = {}
  let pluginsExtra = []

  const suffix = format.split('.')[1]

  if (['umd', 'umd.min'].includes(format)) {
    outputExtra.name = 'i18nPro'
  }

  if (format.includes('.')) {
    pluginsExtra.push(
      terser({
        format: {
          comments: /i18n-pro/,
        },
      }),
    )
  }

  return {
    input: 'src/lib/index.ts',
    output: {
      file: `dist/lib/index${suffix ? '.' + suffix : ''}.js`,
      format: format.includes('.') ? format.split('.')[0] : format,
      banner: suffix ? minBanner : banner,
      ...outputExtra,
    },
    plugins: [
      ts({
        useTsconfigDeclarationDir: isLast,
        tsconfigOverride: {
          compilerOptions: {
            removeComments: false,
            declaration: isLast,
            declarationDir: 'dist',
            module: 'ESNext',
          },
        },
      }),
      prettier(),
      ...pluginsExtra,
    ],
  }
})
