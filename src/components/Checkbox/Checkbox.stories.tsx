import { Story, Meta } from '@storybook/react'
import Checkbox from '@components/Checkbox/BaseCheckbox'
import {
  BaseCheckboxProps,
  InputCheckBoxProps,
} from '@components/Checkbox/Props'
import { FlexWrap } from '../StyleObj'
import { FormProvider, useForm } from 'react-hook-form'
import { action } from '@storybook/addon-actions'
import Button from '@components/Button'
import React from 'react'
import InputCheckbox from '@components/Checkbox/InputCheckbox'

const Template: Story<BaseCheckboxProps> = (args: BaseCheckboxProps) => {
  return (
    <FlexWrap>
      <Checkbox {...args} />
      <Checkbox {...args} checked={true} color={'secondary'} />
      <Checkbox {...args} size={'small'} />
      <Checkbox {...args} size={'medium'} disabled />
      <Checkbox {...args} />
    </FlexWrap>
  )
}

export const Default = Template.bind({})
Default.args = {
  defaultChecked: true,
  onChange: (e) => {
    console.log(e)
  },
  // checked: false,
}

type inputField = {
  channel: typeof channelCheckboxList
  channel2: string[]
}
const channelCheckboxList = [
  {
    label: '전체',
    id: 'all',
  },
  {
    label: 'APP',
    id: 'app',
  },
  {
    label: 'WEB(mobile, PC)',
    id: 'web',
  },
  {
    label: '매장',
    id: 'store',
  },
]
const FormTemplate: Story<InputCheckBoxProps<inputField>> = (
  args: InputCheckBoxProps<inputField>
) => {
  const formContext = useForm<inputField>({
    defaultValues: {
      channel: channelCheckboxList,
      channel2: ['etc', 'app'],
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))

  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputCheckbox
          row
          returnObject={true}
          options={channelCheckboxList}
          name={'channel'}
        />
        <br />
        <InputCheckbox options={channelCheckboxList} name={'channel2'} />
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

export const FormCheckbox = FormTemplate.bind({})
FormCheckbox.args = {}

export default {
  title: 'components/MUI/Checkbox',
  component: Checkbox,
} as Meta
