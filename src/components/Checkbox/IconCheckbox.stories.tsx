import { Story, Meta } from '@storybook/react'
import Checkbox from '@components/Checkbox/BaseCheckbox'
import { BaseCheckboxProps } from '@components/Checkbox/Props'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { FlexWrap } from '../StyleObj'

const Template: Story<BaseCheckboxProps> = (args: BaseCheckboxProps) => {
  return (
    <FlexWrap>
      <div>
        <Checkbox
          {...args}
          icon={<AppleIcon />}
          checkedIcon={<AndroidIcon />}
        />
      </div>
      <div>
        <Checkbox
          {...args}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
        />
      </div>
      <div>
        <Checkbox
          {...args}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </div>
      <div>
        <Checkbox
          {...args}
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
      </div>
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/Checkbox',
  component: Checkbox,
} as Meta

export const IconType = Template.bind({})
IconType.args = {
  defaultChecked: true,
  // checked: false,
}
