import NoDataBoundary from '@components/NoDataBoundary/NoDataBoundary'
import Center from '@components/Center/Center'

function NoRwoData() {
  return (
    <Center>
      <NoDataBoundary dataSet={null} msgKey={'noRowMsg'} />
    </Center>
  )
}

export default NoRwoData
