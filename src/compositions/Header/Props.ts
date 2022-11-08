import Button from '@components/Button'
import { ButtonProps } from '@components/Button/Props'

export type ListHeaderProps = {
  title: string
  button?: {
    text: string
    link?: string
    isDisabled?: boolean
    sbkind?: string
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
    sbkind?: string
  } & ButtonProps
  updateButton?: {
    sbkind?: string
  } & ButtonProps
  saveButton?: {
    sbkind?: string
  } & ButtonProps
  anotherButton?: ({ text: string } & ButtonProps)[]
}
