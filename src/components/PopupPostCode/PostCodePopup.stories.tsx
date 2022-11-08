import { ComponentStory, ComponentMeta } from '@storybook/react'
import PostCodePopup from '@components/PopupPostCode/PostCodePopup'
import usePostCodeStore from '@stores/postCode.store'
import { Typography } from '@mui/material'

export default {
  title: 'components/YGUI/PostCodePopup',
  component: PostCodePopup,
} as ComponentMeta<typeof PostCodePopup>

const Template: ComponentStory<typeof PostCodePopup> = (props) => {
  const [address, zonecode] = usePostCodeStore((state) => [
    state.address,
    state.zonecode,
  ])
  return (
    <>
      <PostCodePopup />
      <Typography>우편변호 : {zonecode}</Typography>
      <Typography>주소 : {address}</Typography>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}
