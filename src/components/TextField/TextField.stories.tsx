import { Story, Meta } from '@storybook/react'
import { TypographyProps } from '@components/Typography/Props'
import BaseTextField from '@components/TextField'
import {
  InputFileTextFieldProps,
  LabelTextFieldProps,
  TextFieldElementProps,
} from '@components/TextField/Props'
import LabelTextField from './LabelTextField'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { FieldError, FormProvider, useForm, useWatch } from 'react-hook-form'
import Button from '../Button'
import { Control } from 'react-hook-form/dist/types/form'
import { action } from '@storybook/addon-actions'
import InputFileTextField from './InputFileTextField'

const Template: Story<TypographyProps> = (args: TypographyProps) => {
  return (
    <>
      <BaseTextField name={'name'} label={'이름'} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}

const labelTemplate: Story<LabelTextFieldProps> = (
  args: LabelTextFieldProps
) => {
  const { label, required, variant } = args
  return (
    <>
      <LabelTextField
        label={label}
        required={required}
        variant={variant}
        control={<BaseTextField name={'payment'} label={'결제상태'} />}
      />
    </>
  )
}

export const LabelField = labelTemplate.bind({})
LabelField.args = {
  label: '결제 상태',
  required: true,
  variant: 'body2',
}

type inputField = {
  name: string
  address: string
  etc: string
  view: string
  phone: number | string
}
const FormTextField: Story<TextFieldElementProps<FieldValues>> = (
  args: TextFieldElementProps<FieldValues>
) => {
  const { required } = args
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<inputField>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      etc: '',
      view: '',
    },
  })
  const viewSubscribe = watch('view')
  const onSubmit = handleSubmit(action('success'), action('error'))
  action(viewSubscribe)
  const parseError = (error: FieldError) => {
    action('parserError')
    return 'This field is required'
  }
  return (
    <form onSubmit={onSubmit}>
      <TextFieldElement
        name={'name'}
        label={'이름'}
        required={required}
        sx={{ width: '250px', margin: '12px' }}
        control={control}
        helperText={'이름에 "jun"이라고 입력해보세요'}
      />
      <br />
      <TextFieldElement
        name={'phone'}
        label={'휴대폰'}
        validation={{
          required: '휴대폰번호를 입력해주세요',
        }}
        sx={{ width: '250px', margin: '12px' }}
        control={control}
      />
      <br />
      <TextFieldElement
        name={'address'}
        label={'주소'}
        required={required}
        parseError={parseError}
        sx={{ width: '250px', margin: '12px' }}
        control={control}
      />
      <br />
      <TextFieldElement
        name={'etc'}
        label={'비고'}
        helperText={'비고란'}
        sx={{ width: '250px', margin: '12px' }}
        control={control}
      />
      <br />
      <FieldComp control={control} />
      <Button type={'submit'} color={'primary'} variant={'contained'}>
        Submit
      </Button>
    </form>
  )
}

const FieldComp = ({ control }: { control: Control<inputField> }) => {
  const name = useWatch({
    control,
    name: 'name',
  })
  return (
    <>
      {name === 'jun' ? <div>watch name : jun</div> : null}
      <TextFieldElement
        name={'view'}
        label={'뷰'}
        required={true}
        sx={{ width: '250px', margin: '12px' }}
        control={control}
      />
      <br />
    </>
  )
}
export const FormHookTextField = FormTextField.bind({})
FormHookTextField.args = {
  required: true,
}

const ProviderForm: Story<TextFieldElementProps<FieldValues>> = (
  args: TextFieldElementProps<FieldValues>
) => {
  const { required } = args
  const formContext = useForm<inputField>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      etc: '',
      view: '',
    },
  })
  const viewSubscribe = formContext.watch('view')
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))
  action(viewSubscribe)
  const parseError = (error: FieldError) => {
    return 'This field is required'
  }
  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <TextFieldElement
          name={'name'}
          label={'이름'}
          required={required}
          sx={{ width: '250px', margin: '12px' }}
          helperText={'이름에 "jun"이라고 입력해보세요'}
        />
        <br />
        <TextFieldElement
          name={'phone'}
          label={'휴대폰'}
          validation={{
            required: '휴대폰번호를 입력해주세요',
          }}
          sx={{ width: '250px', margin: '12px' }}
        />
        <br />
        <TextFieldElement
          name={'address'}
          label={'주소'}
          required={required}
          parseError={parseError}
          sx={{ width: '250px', margin: '12px' }}
        />
        <br />
        <TextFieldElement
          name={'etc'}
          label={'비고'}
          helperText={'비고란'}
          sx={{ width: '250px', margin: '12px' }}
        />
        <br />
        <FieldContextComp />
        <Button type={'submit'} color={'primary'} variant={'contained'}>
          Submit
        </Button>
        <Button
          onClick={() => {
            formContext.reset()
          }}
          color={'primary'}
          variant={'contained'}
        >
          reset
        </Button>
      </form>
    </FormProvider>
  )
}

const FieldContextComp = () => {
  const name = useWatch({
    name: 'name',
  })
  return (
    <>
      {name === 'jun' ? <div>watch name : jun</div> : null}
      <TextFieldElement
        name={'view'}
        label={'뷰'}
        required={true}
        sx={{ width: '250px', margin: '12px' }}
      />
      <br />
    </>
  )
}
export const ProviderFormHookTextField = ProviderForm.bind({})
ProviderFormHookTextField.args = {
  required: true,
}

const InputFileTemplate: Story<InputFileTextFieldProps> = (
  args: InputFileTextFieldProps
) => {
  const { fileKey, fileNameKey, buttonText, accept, validation } = args

  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <InputFileTextField
        fileKey={fileKey}
        fileNameKey={fileNameKey}
        buttonText={buttonText}
        accept={accept}
        validation={validation}
      ></InputFileTextField>
    </FormProvider>
  )
}

export const InputFile = InputFileTemplate.bind({})
InputFile.args = {
  fileKey: 'file',
  fileNameKey: 'fileName',
  buttonText: '등록하기',
  accept: '.xls, .xlsx',
}

export default {
  title: 'components/MUI/TextField',
  component: BaseTextField,
} as Meta
