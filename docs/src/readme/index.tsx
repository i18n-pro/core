import { initI18n } from '../utils'
import React, { TableOfContents } from 'jsx-to-md'
import Top from './Top'
import Vision from './Vision'
import Feature from './Feature'
import LiveDemo from './LiveDemo'
import Principle from './Principle'
import HelpDoc from './HelpDoc'
import License from './License'

export default function Doc(props) {
  initI18n(props)

  return (
    <>
      <Top />
      <TableOfContents text={tr('目录')} open={false} />
      <Vision />
      <Feature />
      <LiveDemo />
      <Principle />
      <HelpDoc />
      <License />
    </>
  )
}
