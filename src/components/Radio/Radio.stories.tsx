import { Story, Meta } from '@storybook/react'
import Radio from '@components/Radio/Radio'
import { RadioProps } from '@components/Radio/Props'
import { RadioListWarp } from '@components/Radio/StyleObj'
import React from 'react'

const Template: Story<RadioProps> = (args: RadioProps) => {
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
    <RadioListWarp>
      <div className={'checkbox-card'}>
        <Radio {...controlProps('a')} />
      </div>
      <div className={'checkbox-card'}>
        <Radio {...controlProps('b')} color={'secondary'} />
      </div>
      <div className={'checkbox-card'}>
        <Radio {...controlProps('c')} size={'small'} disabled />
      </div>
      <div className={'checkbox-card'}>
        <Radio {...controlProps('d')} size={'medium'} />
      </div>
      <div className={'checkbox-card'}>
        <Radio {...controlProps('e')} />
      </div>
    </RadioListWarp>
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
