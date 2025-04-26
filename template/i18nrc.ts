import { join } from 'path'
import { Config } from '../src/type'

export default {
  funcName: 't',
  // entry: join(__dirname, './src/'),
  // fileRegExp: /\.[jt]s$/,
  input: 'src/**/*.{js,ts}',
  output: {
    path: join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'en',
    to: ['zh-CN', 'ja'],
    codeLocaleMap: {
      'zh-CN': 'zh',
    },
    // proxy: 'http://127.0.0.1:1087',
  },
} as Config
