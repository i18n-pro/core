import { render, getAnchor } from 'jsx-to-md'

export default function getTitleToA(title: string) {
  return render(<a href={getAnchor(title)}>{title}</a>)
}
