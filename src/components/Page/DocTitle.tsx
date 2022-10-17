import { PropsWithChildren } from 'react'
import useTitle from '@hooks/useTitle'

const DocTitle = (props: PropsWithChildren<Record<'title', string>>) => {
  const { title, children } = props
  useTitle(title)
  return <>{children}</>
}
export default DocTitle
