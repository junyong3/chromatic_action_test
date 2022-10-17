import { Navigation, SubText, ListHeaderTitle } from './StyleObj'
import { ListHeaderProps } from './Props'
import Button from '@components/Button/Button'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function ListHeader({ title, button, navigation, subText }: ListHeaderProps) {
  return (
    <div>
      <ListHeaderTitle>
        <Typography variant={'h5'}>{title}</Typography>
        {button ? (
          <Button
            variant="contained"
            size="medium"
            startIcon={<AddIcon />}
            href={button.link}
            data-sb-kind={button.sbKind}
            data-cy="addButton"
            disabled={button.isDisabled}
            target="_blank"
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        ) : null}
      </ListHeaderTitle>
      {navigation ? (
        <Navigation
          aria-label="breadcrumb"
          hasbutton={button ? 'true' : 'false'}
        >
          <Link
            to={navigation.home}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography color="text.secondary" variant="body1">
              Home
            </Typography>
          </Link>
          {navigation.menuList.map((menu, index) => (
            <Typography key={index} color="text.primary">
              {menu}
            </Typography>
          ))}
        </Navigation>
      ) : null}
      {subText ? <SubText>{subText}</SubText> : null}
    </div>
  )
}

export default ListHeader
