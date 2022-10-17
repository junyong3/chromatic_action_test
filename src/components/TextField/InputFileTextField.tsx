import Button from '@components/Button'
import AddIcon from '@mui/icons-material/Add'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { InputFileTextFieldProps } from '@components/TextField/Props'

function InputFileTextField(props: InputFileTextFieldProps) {
  const { fileKey, fileNameKey, buttonText, accept, validation } = props

  const { setValue } = useFormContext()

  const onChangeFile = (e: any) => {
    setValue(fileKey, e.target.files[0])
    setValue(fileNameKey, e.target.files[0].name)
  }

  return (
    <>
      <label htmlFor={'raised-button-file'}>
        <Button
          variant={'contained'}
          startIcon={<AddIcon />}
          component={'span'}
        >
          {buttonText}
        </Button>
      </label>
      <input
        type={'file'}
        accept={accept}
        id={'raised-button-file'}
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />
      <TextFieldElement
        name={'fileName'}
        disabled={true}
        sx={{ paddingLeft: '12px' }}
        validation={validation}
      />
    </>
  )
}

export default InputFileTextField
