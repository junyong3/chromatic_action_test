import { ComponentStory, ComponentMeta } from '@storybook/react'
import JusoCodePopUp from '@components/PopupPostCode/JusoCodePopUp'
import { Button, Typography } from '@mui/material'
import { useRef } from 'react'
import { JusoCodePopUpProps } from '@components/PopupPostCode/Props'
import usePostCodeStore from '@stores/postCode.store'

export default {
  title: 'components/YGUI/JusoCodePopUp',
  component: JusoCodePopUp,
} as ComponentMeta<typeof JusoCodePopUp>

const Template: ComponentStory<typeof JusoCodePopUp> = (props) => {
  const jusoRef = useRef<JusoCodePopUpProps>(null)
  const [jusoPostCode] = usePostCodeStore((state) => [state.jusoPostCode])
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          if (jusoRef.current !== null) jusoRef.current.open()
        }}
      >
        주소 검색
      </Button>
      <Typography>우편변호 : {jusoPostCode.zipNo}</Typography>
      <Typography>주소 : {jusoPostCode.jibunAddr}</Typography>
      <JusoCodePopUp ref={jusoRef} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  disabled: false,
}
