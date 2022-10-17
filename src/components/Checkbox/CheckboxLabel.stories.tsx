import { Story, Meta } from '@storybook/react'
import Checkbox from '@components/Checkbox/BaseCheckbox'
import { BaseCheckboxProps } from '@components/Checkbox/Props'
import FormGroup from '@components/FormGroup'
import FormControlLabel from '@components/FormControlLabel'
import { FlexWrap } from '../StyleObj'

const Template: Story<BaseCheckboxProps> = (args: BaseCheckboxProps) => {
  return (
    <FlexWrap>
      <FormGroup>
        <div>
          <FormControlLabel control={<Checkbox {...args} />} label={'체크'} />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox {...args} checked={true} color={'secondary'} />}
            label={'왼쪽'}
            value={'start'}
            labelPlacement={'start'}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox {...args} size={'small'} />}
            label={'위'}
            value={'top'}
            labelPlacement={'top'}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox {...args} size={'medium'} />}
            label={'오른쪽'}
            value={'end'}
            labelPlacement={'end'}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox {...args} size={'medium'} />}
            label={'아래'}
            value={'bottom'}
            labelPlacement={'bottom'}
          />
        </div>
      </FormGroup>
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/Checkbox',
  component: Checkbox,
  parameters: {},
} as Meta

export const Label = Template.bind({})
Label.args = {
  defaultChecked: true,
  // checked: false,
}
