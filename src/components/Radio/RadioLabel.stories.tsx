import { Story, Meta } from '@storybook/react'
import Radio from '@components/Radio/Radio'
import { BaseRadioProps } from '@components/Radio/Props'
import FormGroup from '@components/FormGroup'
import FormControlLabel from '@components/FormControlLabel'
import { FlexWrap } from '../StyleObj'

const Template: Story<BaseRadioProps> = (args: BaseRadioProps) => {
  return (
    <FlexWrap>
      <FormGroup>
        <div>
          <FormControlLabel control={<Radio {...args} />} label={'라디오'} />
        </div>
        <div>
          <FormControlLabel
            control={<Radio {...args} checked={false} color={'secondary'} />}
            label={'왼쪽'}
            value={'start'}
            labelPlacement={'start'}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Radio {...args} size={'small'} />}
            label={'위'}
            value={'top'}
            labelPlacement={'top'}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Radio {...args} checked={false} size={'medium'} />}
            label={'오른쪽'}
            value={'end'}
            labelPlacement={'end'}
          />
        </div>
        <div>
          <FormControlLabel
            control={<Radio {...args} size={'medium'} />}
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
  title: 'components/MUI/Radio',
  component: Radio,
  parameters: {},
} as Meta

export const Label = Template.bind({})
Label.args = {
  checked: true,
  // checked: false,
}
