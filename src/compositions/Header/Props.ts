import Button from '@src/components/Button'
import { ButtonProps } from '@src/components/Button/Props'

export type ListHeaderProps = {
  title: string
  button?: {
    text: string
    link?: string
    isDisabled?: boolean
    sbKind?: string
    onClick?: () => void
  }
  navigation?: {
    home: string
    menuList: string[]
  }
  subText?: string
}

export type SubHeaderProps = {
  title: string
  deleteButton?: {
    sbKind?: string
  } & ButtonProps
  updateButton?: {
    sbKind?: string
  } & ButtonProps
  saveButton?: {
    sbKind?: string
  } & ButtonProps
  anotherButton?: ({ text: string } & ButtonProps)[]
}
