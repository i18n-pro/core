import FunctionTemplate, {
  type FunctionTemplateProps,
} from './FunctionTemplate'

export default function FunctionTemplateWrapper(props: FunctionTemplateProps) {
  return <FunctionTemplate {...props} />
}
