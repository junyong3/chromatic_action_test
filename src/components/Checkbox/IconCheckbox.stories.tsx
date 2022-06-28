import { Story, Meta } from '@storybook/react'
import Checkbox from '@components/Checkbox/Checkbox'
import { CheckboxProps } from '@components/Checkbox/Props'
import { CheckboxListWarp } from '@components/Checkbox/StyleObj'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const Template: Story<CheckboxProps> = (args: CheckboxProps) => {
  return (
    <CheckboxListWarp>
      <div className={'checkbox-card'}>
        <Checkbox
          {...args}
          icon={<AppleIcon />}
          checkedIcon={<AndroidIcon />}
        />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox
          {...args}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
        />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox
          {...args}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox
          {...args}
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
        />
      </div>
      <div className={'checkbox-card'}></div>
    </CheckboxListWarp>
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
