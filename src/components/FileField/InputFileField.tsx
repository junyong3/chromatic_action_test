import { useFormContext } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { TextFieldElementProps } from '@components/FileField/Props'

export default function InputFileField<TFieldValues extends FieldValues>({
  name,
  ...muiProps
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  const { onChange: muiOnChange } = muiProps

  const { register } = useFormContext()

  return (
    <input
      {...register(name)}
      onChange={(d) => {
        muiOnChange && muiOnChange(d)
      }}
      accept="image/*"
      type="file"
    />
  )
}
