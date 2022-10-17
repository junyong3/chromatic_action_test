import { Story, Meta } from '@storybook/react'
import Radio from '@components/Radio/Radio'
import { BaseRadioProps, InputRadioProps } from '@components/Radio/Props'
import React from 'react'
import { FlexWrap } from '../StyleObj'
import { InputCheckBoxProps } from '@components/Checkbox/Props'
import { FormProvider, useForm } from 'react-hook-form'
import { action } from '@storybook/addon-actions'
import InputCheckbox from '@components/Checkbox/InputCheckbox'
import Button from '@components/Button'
import InputRadio from '@components/Radio/InputRadio'

const Template: Story<BaseRadioProps> = (args: BaseRadioProps) => {
  const [selectedValue, setSelectedValue] = React.useState('a')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
    ...args,
  })
  return (
    <FlexWrap>
      <Radio {...controlProps('a')} />
      <Radio {...controlProps('b')} color={'secondary'} />
      <Radio {...controlProps('c')} size={'small'} disabled />
      <Radio {...controlProps('d')} size={'medium'} />
      <Radio {...controlProps('e')} />
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/Radio',
  component: Radio,
  parameters: {},
} as Meta

export const Default = Template.bind({})
Default.args = {
  // checked: true,
  // checked: false,
}

type inputField = {
  channel: { label: string; id: string }
  channel2: string
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
const FormTemplate: Story<InputRadioProps<inputField>> = (
  args: InputRadioProps<inputField>
) => {
  const formContext = useForm<inputField>({
    defaultValues: {
      channel: {
        label: '매장',
        id: 'store',
      },
      channel2: 'store',
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))

  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputRadio
          row
          returnObject={true}
          label={'종류'}
          required={true}
          options={channelCheckboxList}
          name={'channel'}
        />
        <br />
        <InputRadio options={channelCheckboxList} name={'channel2'} />
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

export const FormRadio = FormTemplate.bind({})
FormRadio.args = {}
