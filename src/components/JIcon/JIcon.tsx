import { createElement } from 'react'
import * as svg from './svg'

export type JIconType = keyof typeof svg
export type JIconProps = {
  name: JIconType
  className?: string
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
  fill?: string
}

function JIcon({ name, className, style, onClick, fill }: JIconProps) {
  return createElement(svg[name], {
    className,
    onClick,
    style,
    fill,
  })
}

export default JIcon
