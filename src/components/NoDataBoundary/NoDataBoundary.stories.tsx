import { Meta, Story } from '@storybook/react'
import NoDataBoundary from '@components/NoDataBoundary/NoDataBoundary'
import { NoDataBoundaryWrap } from '@components/NoDataBoundary/StyleObj'
import { NoDataMsgProps } from '@components/NoDataBoundary/Props'
import Center from '@components/Center/Center'

const Template: Story<NoDataMsgProps & { dataSet: any }> = (
  props: NoDataMsgProps & { dataSet: any }
) => {
  return (
    <NoDataBoundaryWrap>
      <Center>
        <NoDataBoundary dataSet={props.dataSet} msgKey={props.msgKey}>
          <div>props.dataSet</div>
        </NoDataBoundary>
      </Center>
    </NoDataBoundaryWrap>
  )
}
export default {
  title: 'components/YGUI/Boundary',
  component: NoDataBoundary,
  argTypes: {},
} as Meta

export const NoData = Template.bind({})

NoData.args = {
  msgKey: 'noMsg',
  dataSet: null,
}
