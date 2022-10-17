import { AlertProps as MuiAlertProps } from '@mui/material'
import { MSG } from '@constants/MessageCode/msg'

export type typeKey = keyof typeof MSG

type MsgKeyOf<M extends object> = {
  [Key in keyof M & (string | number)]: M[Key] extends object
    ? `${Key}` | MsgKeyOf<M[Key]>
    : `${Key}`
}[keyof M & (string | number)]
export type AlertProps = MuiAlertProps & {
  title?: string
  type: typeKey
  msg: Exclude<MsgKeyOf<typeof MSG>, typeKey>
}
