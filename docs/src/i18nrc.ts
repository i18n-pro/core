import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { Config } from '../../src/type'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  funcName: 'tr',
  // entry: join(__dirname, './src/'),
  // fileRegExp: /\.[jt]s$/,
  input: './**/*.{js,ts,tsx}',
  output: {
    path: join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'zh-CN',
    to: ['en'],
    proxy: 'http://127.0.0.1:7997',
  },
} as Config
