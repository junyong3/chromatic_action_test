import { Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import Button from '../Button'
import { SearchFormProp } from './Props'
import { SearchBox } from './StyleObj'

function SearchForm({
  text = '검색',
  onSearch,
  disabled = false,
  disabledText,
  children,
}: PropsWithChildren<SearchFormProp>) {
  return (
    <SearchBox>
      <div className="conditionWrap">{children}</div>
      <Divider variant={'middle'} />
      <div className="buttonWrap">
        <Button
          type={'submit'}
          data-cy={'searchButton'}
          variant="contained"
          color="primary"
          size="medium"
          disabled={disabled}
          onClick={onSearch}
          style={{ width: '240px' }}
        >
          {!disabled || !disabledText ? text : disabledText}
        </Button>
      </div>
    </SearchBox>
  )
}

export default SearchForm
