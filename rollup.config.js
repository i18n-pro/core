import ts from 'rollup-plugin-typescript2'
import prettier from 'rollup-plugin-prettier'
import { terser } from 'rollup-plugin-terser'
import { version, name } from './package.json'

const formats = ['umd', 'umd.min']

const copyright =
  'Copyright (c) 2022-present Eyelly Wu <https://github.com/eyelly-wu>'

const banner = `/*
* ${name}
* v${version}
* ${new Date().toLocaleString()}
* ${copyright}
*/`

const minBanner = `// ${name} v${version} ${new Date().toLocaleString()} ${copyright}`

export default formats.map((format, index) => {
  const isLast = (index = index === formats.length - 1)
  let pluginsExtra = []

  const suffix = format.split('.')[1]

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
      name: 'i18nPro',
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
            target: 'es5',
          },
        },
      }),
      prettier(),
      ...pluginsExtra,
    ],
  }
})
