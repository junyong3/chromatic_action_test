import { Box, Stack, Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import Button from '../Button'
import { SearchFormProp } from './Props'

function SearchForm({
  text = '검색',
  onSearch,
  disabled = false,
  disabledText,
  children,
}: PropsWithChildren<SearchFormProp>) {
  return (
    <Box
      border={'1px solid rgba(224, 224, 224, 1)'}
      borderRadius={1}
      p={3}
      bgcolor={'white'}
    >
      <Stack direction={'column'} p={3} pt={0} spacing={2}>
        {children}
      </Stack>

      {text ? (
        <>
          <Divider />
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            pt={2}
          >
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
          </Stack>
        </>
      ) : null}
    </Box>
  )
}

export default SearchForm
