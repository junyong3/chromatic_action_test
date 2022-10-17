import { Story, Meta } from '@storybook/react'
import { StoriesWrap } from '../StyleObj'
import SubHeader from './SubHeader'
import { SubHeaderProps } from './Props'
import { action } from '@storybook/addon-actions'

const Template: Story<SubHeaderProps> = (args: SubHeaderProps) => {
  return (
    <StoriesWrap>
      <SubHeader
        title={args.title}
        deleteButton={
          args.deleteButton
            ? {
                ...args.deleteButton,
                onClick: action('삭제'),
              }
            : undefined
        }
        updateButton={
          args.updateButton
            ? {
                ...args.updateButton,
                onClick: action('수정'),
              }
            : undefined
        }
        saveButton={
          args.saveButton
            ? {
                ...args.saveButton,
                onClick: action('저장'),
              }
            : undefined
        }
      />
    </StoriesWrap>
  )
}

export default {
  title: 'compositions/SubHeader',
  component: SubHeader,
  argTypes: {},
} as Meta

export const DefaultMainHeader = Template.bind({})
DefaultMainHeader.args = {
  title: '역할 상세',
  deleteButton: {
    disabled: false,
  },
  updateButton: {
    disabled: false,
  },
  saveButton: {
    disabled: false,
  },
}
