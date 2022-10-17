import {
  FormControlLabelProps,
  TextFieldProps as muiTextFieldProps,
} from '@mui/material'
import {
  Control,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'

type addTextFieldProps = {
  typeMode?: 'text' | 'number' | 'email'
}
export type TextFieldProps = muiTextFieldProps & addTextFieldProps
export type TextFieldElementProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name'
> & {
  validation?: ControllerProps['rules']
  name: Path<T>
  parseError?: (error: FieldError) => string // 사용자 정의 에러
  control?: Control<T>
  isComma?: boolean
  isNumber?: boolean
}

export type LabelTextFieldProps = {
  required: boolean
  variant: Variant
} & FormControlLabelProps

export type InputFileTextFieldProps = {
  fileKey: string
  fileNameKey: string
  buttonText?: string
  accept?: string
  validation?: ControllerProps['rules']
} & TextFieldProps
