import { Story, Meta } from '@storybook/react'
import Fab from '@components/FloatingActionButton/Fab'
import { FabProps } from '@components/FloatingActionButton/Props'
import { FabListWarp } from '@components/FloatingActionButton/StyleObj'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Template: Story<FabProps> = (args: FabProps) => {
  return (
    <FabListWarp>
      <div className={'fab-card'}>
        <Fab {...args}>
          <AddIcon />
        </Fab>
      </div>
      <div className={'fab-card'}>
        <Fab {...args} color={'secondary'}>
          <EditIcon />
        </Fab>
      </div>
      <div className={'fab-card'}>
        <Fab {...args} disabled>
          <FavoriteIcon />
        </Fab>
      </div>
      <div className={'fab-card'}>
        <Fab {...args} color={'secondary'} size={'small'}>
          <EditIcon />
        </Fab>
      </div>
      <div className={'fab-card'}>
        <Fab {...args} disabled size={'medium'}>
          <FavoriteIcon />
        </Fab>
      </div>
    </FabListWarp>
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
