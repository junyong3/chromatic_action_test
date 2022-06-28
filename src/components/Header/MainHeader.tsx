import React from 'react'
import Text from '@components/Text/Text'
import Button from '@components/Button/Button'
import AddIcon from '@mui/icons-material/Add'
import styled from '@emotion/styled'
import { Breadcrumbs, Link, Typography } from '@mui/material'

interface mainHeaderProps {
  title: string
  buttonLink?: string
  buttonText?: string
  HomeLink?: string
  menuName?: string
  subText?: string
  useNavigation?: boolean
  useSubText?: boolean
}

function MainHeader({
  title,
  buttonLink,
  buttonText,
  HomeLink,
  menuName,
  useNavigation = false,
  useSubText = false,
  subText,
}: mainHeaderProps) {
  return (
    <div>
      <Title>
        <Text styleName={'h5'} as={'div'}>
          {title}
        </Text>
        {buttonText && buttonLink ? (
          <Button
            variant="contained"
            size="medium"
            startIcon={<AddIcon />}
            href={buttonLink}
            target="_blank"
          >
            {buttonText}
          </Button>
        ) : null}
      </Title>
      {useNavigation ? (
        <>
          <Navigation aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={HomeLink}>
              HOME
            </Link>
            <Typography color="text.primary">{menuName}</Typography>
          </Navigation>
        </>
      ) : null}

      {useSubText ? (
        <>
          <SubText as={'div'} styleName={'body2'}>
            {subText}
          </SubText>
        </>
      ) : null}
    </div>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

const Navigation = styled(Breadcrumbs)`
  margin: 8px 0;
`

const SubText = styled(Text)`
  margin: 8px 0 12px 0;
`

export default MainHeader
