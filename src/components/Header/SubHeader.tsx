import React, { PropsWithChildren } from 'react'
import Text from '@components/Text/Text'
import styled from '@emotion/styled'
import { Divider } from '@mui/material'

interface subHeaderProps {
  title: string
}

function SubHeader({ title, children }: PropsWithChildren<subHeaderProps>) {
  return (
    <div>
      <Title>
        <Text styleName={'h5'} as={'div'}>
          {title}
        </Text>
        {children}
      </Title>
      <Divider />
    </div>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0 16px 0;
`

export default SubHeader
