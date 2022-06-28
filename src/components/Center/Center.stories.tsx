import { Meta, Story } from '@storybook/react'
import Center from '@components/Center/Center'
import { Grid } from '@mui/material'
import {
  ButtonCenterWrap,
  CheckCenterWrap,
  IconCenterWrap,
} from '@components/Center/StyleObj'
import JIcon from '@components/JIcon'
import Button from '@components/Button'
import Checkbox from '@components/Checkbox'

const Template: Story = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="start"
    >
      <Grid item>
        <IconCenterWrap>
          <Center>
            <JIcon name={'Dark'} />
          </Center>
        </IconCenterWrap>
      </Grid>
      <Grid item>
        <ButtonCenterWrap>
          <Center>
            <Button>가운데</Button>
          </Center>
        </ButtonCenterWrap>
      </Grid>
      <Grid item>
        <CheckCenterWrap>
          <Center>
            <Checkbox />
          </Center>
        </CheckCenterWrap>
      </Grid>
    </Grid>
  )
}
export default {
  title: 'components/MUI/Center',
  component: Center,
  argTypes: {},
} as Meta

export const CenterBox = Template.bind({})

CenterBox.args = {}
