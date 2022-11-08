import { Box, Stack, Divider } from '@mui/material'
import { PropsWithChildren } from 'react'
import { FormProvider } from 'react-hook-form'
import Button from '../Button'
import { SearchBoxProp } from './Props'

function SearchBox({
  text = '검색',
  disabled = false,
  disabledText,
  methods,
  onSubmit,
  children,
}: PropsWithChildren<SearchBoxProp>) {
  return (
    <FormProvider {...methods}>
      <form id={'SearchBoxForm'} onSubmit={onSubmit}>
        <Box
          border={'1px solid rgba(224, 224, 224, 1)'}
          borderRadius={1}
          p={3}
          bgcolor={'white'}
        >
          <Stack direction={'column'} p={3} pt={0} spacing={2}>
            {children}
          </Stack>
          <Divider />
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            pt={2}
          >
            <Button
              type={'submit'}
              form={'SearchBoxForm'}
              data-cy={'searchButton'}
              variant="contained"
              color="primary"
              size="medium"
              disabled={disabled}
              style={{ width: '240px' }}
            >
              {!disabled || !disabledText ? text : disabledText}
            </Button>
          </Stack>
        </Box>
      </form>
    </FormProvider>
  )
}

export default SearchBox
