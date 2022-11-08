import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BaseDatePickerProps } from './Props'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

function BaseDatePicker(args: BaseDatePickerProps) {
  const {
    label,
    value,
    disabled,
    readOnly,
    disablePast, // 과거날짜 비활성화
    disableFuture = true, // 미래날짜 비활성화
    disableHighlightToday = true, // 오늘날짜 표시
    openTo = 'day',
    dateFormat = 'YYYY-MM-DD',
    maxDate = dayjs('2099-12-31'),
    minDate = dayjs('2020-01-01'),
    renderInput,
    onChange,
  } = args
  const formatMask = dateFormat.replace(/([A-Z|a-z])/g, '_')
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ko'}>
      <MuiDatePicker
        {...args}
        label={label}
        maxDate={maxDate}
        minDate={minDate}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        disablePast={disablePast}
        disableFuture={disableFuture}
        disableHighlightToday={disableHighlightToday}
        openTo={openTo}
        inputFormat={dateFormat}
        mask={formatMask}
        onChange={onChange}
        renderInput={renderInput}
      />
    </LocalizationProvider>
  )
}

export default BaseDatePicker
