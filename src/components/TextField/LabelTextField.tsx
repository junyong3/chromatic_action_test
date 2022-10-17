import { LabelTextFieldProps } from '@components/TextField/Props'
import React from 'react'
import { FormControlLabel } from '@mui/material'
import Typography from '@components/Typography'

function LabelTextField(props: LabelTextFieldProps) {
  const {
    sx,
    control,
    label,
    labelPlacement = 'start',
    required,
    variant,
  } = props

  return (
    <FormControlLabel
      sx={sx}
      labelPlacement={labelPlacement}
      label={
        required ? (
          <Typography
            required={required}
            variant={variant}
            sx={{
              padding: '0 12px',
            }}
          >
            {label}
          </Typography>
        ) : (
          label
        )
      }
      control={control}
    />
  )
}

export default LabelTextField
