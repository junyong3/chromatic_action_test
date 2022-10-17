import { Alert as MuiAlert, AlertTitle } from '@mui/material'
import { AlertProps, typeKey } from '@components/AlertMsg/Props'
import { MSG } from '@constants/MessageCode/msg'
import { PropsWithChildren } from 'react'

function AlertMsg(props: PropsWithChildren<AlertProps>) {
  const { children, type, msg, title, ...muiProps } = props

  const getMsg = <ObjectType extends object>(msg: ObjectType, path: string) => {
    const keys = path.split('.')
    let result = msg
    for (const key of keys) {
      result = (result as Record<string, any>)[key]
    }
    return result
  }
  const severity = type.toLowerCase() as Lowercase<typeKey>

  const Message = getMsg<typeof MSG>(MSG, `${type}.${msg}`)
  return (
    <MuiAlert {...muiProps} severity={severity}>
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {Message as unknown as string}
      {children ? children : null}
    </MuiAlert>
  )
}

export default AlertMsg
