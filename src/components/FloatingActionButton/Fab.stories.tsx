import { Story, Meta } from '@storybook/react'
import Fab from '@components/FloatingActionButton/Fab'
import { FabProps } from '@components/FloatingActionButton/Props'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { FlexWrap } from '../StyleObj'

const Template: Story<FabProps> = (args: FabProps) => {
  return (
    <FlexWrap>
      <Fab {...args}>
        <AddIcon />
      </Fab>
      <Fab {...args} color={'secondary'}>
        <EditIcon />
      </Fab>
      <Fab {...args} disabled>
        <FavoriteIcon />
      </Fab>
      <Fab {...args} color={'secondary'} size={'small'}>
        <EditIcon />
      </Fab>
      <Fab {...args} disabled size={'medium'}>
        <FavoriteIcon />
      </Fab>
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/FloatingActionButton',
  component: Fab,
} as Meta

export const Default = Template.bind({})
Default.args = {
  size: 'medium',
  color: 'primary',
}
