import { H1, List, Link } from 'jsx-to-md'
import { getDocHref } from '../utils'

export default function DocLink() {
  return (
    <>
      <H1>{tr('帮助文档')}</H1>
      <List
        items={[
          'U',
          <Link href={getDocHref('USAGE')}>{tr('快速上手')}</Link>,
          <Link href={getDocHref('COMMAND_LINE')}>{tr('命令行')}</Link>,
          <Link href={getDocHref('API')}>{tr('API')}</Link>,
          <Link href={getDocHref('MATCH_RULE')}>{tr('匹配规则')}</Link>,
          <Link href={getDocHref('OUTPUT_LOG')}>{tr('输出日志')}</Link>,
          <Link href={getDocHref('Q&A')}>Q&A</Link>,
          <Link href={getDocHref('CHANGELOG')}>{tr('更新日志')}</Link>,
        ]}
      />
    </>
  )
}
