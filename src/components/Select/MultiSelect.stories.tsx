import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import InputMultiSelect from '@components/Select/InputMultiSelect'
import Button from '@components/Button'
import { FormProvider, useForm } from 'react-hook-form'

export default {
  title: 'components/MUI/MultiSelect',
  component: InputMultiSelect,
} as ComponentMeta<typeof InputMultiSelect>

type MultiSelectField = {
  selectValue1: any[]
}
const Template: ComponentStory<typeof InputMultiSelect> = (args) => {
  const { options } = args
  const formContext = useForm<MultiSelectField>({
    defaultValues: {
      selectValue1: [],
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))
  return (
    // <FormContainer defaultValues={{}} onSuccess={action('submit')}>
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputMultiSelect
          {...args}
          minWidth={400}
          label={''}
          name={'selectValue1'}
        />
        <br />
        <Button type={'submit'}>전송</Button>
      </form>
    </FormProvider>
  )
}

const names = ['소', '돼지', '닭', '밀키트', '이유식', '수산', '과일', '야채']

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const Basic = Template.bind({})
Basic.args = {
  name: 'basic',
  options: names,
}
export const Filled = Template.bind({})
Filled.args = {
  name: 'filled',
  required: true,
  options: names,
  variant: 'filled',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  name: 'basic',
  label: 'Select Field',
  options: names,
}

export const WithLabelSmall = Template.bind({})
WithLabelSmall.args = {
  name: 'basic_small',
  size: 'small',
  label: 'Select Field',
  options: names,
}

export const Required = Template.bind({})
Required.args = {
  name: 'required',
  label: 'Required Field',
  options: names,
  required: true,
}

export const WithChips = Template.bind({})
WithChips.args = {
  name: 'chips',
  label: 'Required Field',
  options: names,
  showChips: true,
}

export const WithCheckbox = Template.bind({})
WithCheckbox.args = {
  name: 'checkbox',
  label: 'Checkbox Field',
  options: names,
  showCheckbox: true,
}

const objectVals = [
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
  { id: 3, name: 'Celsius' },
  { id: 4, name: 'Delta' },
]
export const WithObjectArray = Template.bind({})
WithObjectArray.args = {
  name: 'object',
  label: 'Object Field',
  options: objectVals,
  optionKey: {
    value: 'id',
    label: 'name',
  },
}

export const OverwriteRenderValue = Template.bind({})
OverwriteRenderValue.args = {
  name: 'object',
  label: 'Object Field',
  options: objectVals,
  optionKey: {
    value: 'id',
    label: 'name',
  },
  renderValue: (selected: any) => `You selected: ${(selected || [])?.length}`,
}

export const MonthPicker = Template.bind({})
MonthPicker.args = {
  name: 'month',
  options: months,
  label: 'Months',
  MenuProps: {
    PaperProps: {
      sx: {
        '& .MuiList-root': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
        },
      },
    },
  },
}

export const MonthPickerSmall = Template.bind({})
MonthPickerSmall.args = {
  name: 'months_small',
  options: months,
  label: 'Months',
  size: 'small',
  MenuProps: {
    PaperProps: {
      sx: {
        '& .MuiList-root': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
        },
      },
    },
  },
}
