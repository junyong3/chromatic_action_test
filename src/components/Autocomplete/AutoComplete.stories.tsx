import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from '@components/Button'
import { FormProvider, useForm } from 'react-hook-form'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'

export default {
  title: 'components/MUI/AutoComplete',
  component: InputAutoComplete,
} as ComponentMeta<typeof InputAutoComplete>
type valueSelect = {
  id: number
  label: string
}
type AutoCompleteField = {
  selectValue1: any[]
  preselect: valueSelect
  'multi-preselect': Array<valueSelect>
  multiCheck: Array<valueSelect>
  'match-id': number
  'match-id-multi': number[]
}
const Template: ComponentStory<typeof InputAutoComplete> = (args) => {
  const formContext = useForm<AutoCompleteField>({
    defaultValues: {
      selectValue1: [],
      preselect: { id: 2, label: 'Second' },
      'multi-preselect': [{ id: 2, label: 'Second' }],
      'match-id': 2,
      'match-id-multi': [2, 3],
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))
  return (
    // <FormContainer defaultValues={{}} onSuccess={action('submit')}>
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputAutoComplete {...args} label={'선택하세요'} name={args.name} />
        <br />
        <Button type={'submit'}>전송</Button>
      </form>
    </FormProvider>
  )
}
const options = [
  { label: 'First', id: 1 },
  { label: 'Second', id: 2 },
  { label: 'Third', id: 3 },
  {
    label: 'Four',
    id: 4,
  },
]
const options2 = [
  '소',
  '돼지',
  '닭',
  '밀키트',
  '이유식',
  '수산',
  '과일',
  '야채',
]
export const Basic = Template.bind({})

Basic.args = {
  name: 'selectValue1',
  optionKey: {
    label: 'label',
    value: 'id',
  },
  options: options2,
  autocompleteProps: {
    isOptionEqualToValue: (option: any, value: any) => {
      return option === value
    },
  },
}

export const BasicPreSelect = Template.bind({})
BasicPreSelect.args = {
  name: 'preselect',
  optionKey: {
    label: 'label',
    value: 'id',
  },
  options,
}

export const MultiSelect = Template.bind({})
MultiSelect.args = {
  name: 'multi',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },
  multiple: true,
}

export const MultiSelectRequired = Template.bind({})
MultiSelectRequired.args = {
  label: 'Multiple Required',
  name: 'multi-required',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },

  multiple: true,
  required: true,
}

export const MultiSelectRequiredCustom = Template.bind({})
MultiSelectRequiredCustom.args = {
  label: 'Multiple Required Custom',
  name: 'multi-required-custom',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },
  multiple: true,
  rules: {
    required: 'Please fill out.',
  },
}

export const MultiSelectPredefined = Template.bind({})
MultiSelectPredefined.args = {
  name: 'multi-preselect',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },
  multiple: true,
}

export const MultiSelectCheckbox = Template.bind({})
MultiSelectCheckbox.args = {
  name: 'multiCheck',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },
  multiple: true,
  showCheckbox: true,
}

export const Loading = Template.bind({})
Loading.args = {
  label: 'Loading State',
  name: 'loading',
  options: [],
  multiple: true,
  showCheckbox: true,
  loading: true,
}

export const MatchId = Template.bind({})
MatchId.args = {
  label: 'Match ID',
  name: 'match-id',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },
  matchId: true,
}

export const MatchIdMulti = Template.bind({})
MatchIdMulti.args = {
  label: 'Match ID',
  name: 'match-id-multi',
  options,
  optionKey: {
    label: 'label',
    value: 'id',
  },
  multiple: true,
  matchId: true,
}
