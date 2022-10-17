import { Meta, Story } from '@storybook/react'
import { BaseSwitchProps } from './Props'
import BaseSwitch from '@components/Switch/BaseSwitch'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '@components/Button'
import React from 'react'
import { action } from '@storybook/addon-actions'
import InputSwitch from '@components/Switch/InputSwitch'

export default {
  title: 'components/MUI/Switch',
  component: BaseSwitch,
} as Meta

const Template: Story<BaseSwitchProps> = (args: BaseSwitchProps) => {
  return <BaseSwitch {...args} />
}

export const Default = Template.bind({})
Default.args = {
  defaultChecked: false,
}

type inputField = {
  pay: boolean
  name: boolean
}
const FormTemplate: Story<BaseSwitchProps> = (args: BaseSwitchProps) => {
  const formContext = useForm<inputField>({
    defaultValues: {
      pay: true,
      name: false,
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))
  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputSwitch
          name={'pay'}
          required={true}
          label={'결제선택'}
          labelPlacement={'start'}
          variant={'body2'}
        />
        <br />
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
export const FormSwitch = FormTemplate.bind({})
FormSwitch.args = {}
