import { i18n, setI18N } from '@lib/index'
global.tr = i18n
import React from 'jsx-to-md'
import Top from './Top'
import Vision from './Vision'
import Feature from './Feature'
import LiveDemo from './LiveDemo'
import Principle from './Principle'
import Usage from './Usage'
import CommandLine from './CommandLine'
import API from './API'
import MatchRule from './MatchRule'
import OutputLog from './OutputLog'
import QAndA from './Q&A'
import ChangeLog from './ChangeLog'
import License from './License'

export default function Doc({ locale }: { locale: string }) {
  setI18N({
    locale,
    langs: {
      en: require('./i18n/en.json'),
    },
  })
  global.docLocale = locale

  return (
    <>
      <Top />
      <Vision />
      <Feature />
      <LiveDemo />
      <Principle />
      <Usage />
      <CommandLine />
      <API />
      <MatchRule />
      <OutputLog />
      <QAndA />
      <ChangeLog />
      <License />
    </>
  )
}
