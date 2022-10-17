import { SelectChangeEvent } from '@mui/material'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { InputSelectProps, BaseSelectProps } from './Props'
import Select from './BaseSelect'
import { FormProvider, useForm } from 'react-hook-form'
import { action } from '@storybook/addon-actions'
import Button from '@components/Button'
import InputSelect from '@components/Select/InputSelect'
import { bankOptionCode } from '@constants/SelectItem/OptionList'

const Template: Story<BaseSelectProps<string>> = (
  args: BaseSelectProps<string>
) => {
  const [searchType, setSearchType] = useState('')
  return (
    <Select
      {...args}
      value={searchType}
      onChange={(event: SelectChangeEvent<string>) => {
        setSearchType(event.target.value as string)
      }}
      optionList={[
        { value: 'option1', label: '가나다라' },
        { value: 'option2', label: '마바사' },
        { value: 'option3', label: '아자차카' },
      ]}
    />
  )
}

export default {
  title: 'components/MUI/Select',
  component: Select,
} as Meta

export const DefaultSelect = Template.bind({})
DefaultSelect.args = {
  label: '',
  size: 'small',
  placeholder: '선택하세요',
}

type inputField = {
  bank: number | string
}
const FormTemplate: Story<InputSelectProps<inputField>> = (
  args: InputSelectProps<inputField>
) => {
  const formContext = useForm<inputField>({
    defaultValues: {
      bank: '',
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))

  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputSelect
          name={'bank'}
          optionKey={{ label: 'bankName', value: 'code' }}
          required
          label={'은행명'}
          options={bankOptionCode}
        />
        <br />
        <br />
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

export const FormSelect = FormTemplate.bind({})
FormSelect.args = {}
