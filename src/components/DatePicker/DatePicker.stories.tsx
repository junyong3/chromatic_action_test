import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { FlexWrap } from '../StyleObj'
import DatePicker from './BaseDatePicker'
import { InputDatePickerProps, BaseDatePickerProps } from './Props'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '@components/Button'
import InputDatePicker from '@components/DatePicker/InputDatePicker'

type inputField = {
  toDate: Dayjs
}
const FormTemplate: Story<InputDatePickerProps<inputField, Dayjs>> = (
  args: InputDatePickerProps<inputField, Dayjs>
) => {
  const formContext = useForm<inputField>({
    defaultValues: {
      toDate: dayjs(),
    },
  })
  const onSubmit = formContext.handleSubmit(action('success'), action('error'))
  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <InputDatePicker name={'toDate'} />
        <br />
        <br />
        <br />
        <Button type={'submit'} color={'primary'} variant={'contained'}>
          Submit
        </Button>
        <Button
          onClick={() => {
            formContext.reset()
          }}
          color={'primary'}
          variant={'contained'}
        >
          reset
        </Button>
      </form>
    </FormProvider>
  )
}

export const FormInputDatePicker = FormTemplate.bind({})
FormInputDatePicker.args = {}

const Template: Story<BaseDatePickerProps> = (args: BaseDatePickerProps) => {
  const [date, setDate] = useState<string>(
    dayjs('2022-09-13').format('YYYY-MM-DD')
  )
  args.value = date
  args.onChange = (newValue) => {
    if (newValue) setDate(newValue.format('YYYY-MM-DD'))
  }
  return (
    <div>
      <FlexWrap backgroundColor="white">
        <DatePicker data-chromatic="ignore" {...args} />
        <DatePicker {...args} label="Disabled" disabled />
        <DatePicker {...args} label="ReadOnly" readOnly />
        <DatePicker {...args} label="HelperText" />
      </FlexWrap>
      <button onClick={action(`${date}`)}>getDate</button>
    </div>
  )
}

// export const Default = Template.bind({})
// Default.args = {
//   label: '등록일',
//   disableFuture: true,
//   renderInput: (params) => {
//     console.log(params)
//     return (
//       <BaseTextField
//         {...params}
//         data-cy={'test'}
//         helperText={'Helper Text가 여기 표시됩니다'}
//         fullWidth
//         size={'small'}
//       />
//     )
//   },
// }
// Defaults.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
//
//   // console.log(canvas.getAllByTestId('test'))
//   // console.log(canvas.findAllByLabelText('Helper Text가 여기 표시됩니다'))
//   await waitFor(async () => {
//     await expect(
//       (
//         canvas.getAllByTestId('test')[0].children[1]
//           .children[0] as HTMLInputElement
//       ).value
//     ).toBe('2022-09-13')
//     await expect(
//       (
//         canvas.getAllByTestId('test')[1].children[1]
//           .children[0] as HTMLInputElement
//       ).value
//     ).toBe('2022-09-13')
//     await expect(
//       (
//         canvas.getAllByTestId('test')[2].children[1]
//           .children[0] as HTMLInputElement
//       ).value
//     ).toBe('2022-09-13')
//     await expect(
//       (
//         canvas.getAllByTestId('test')[3].children[1]
//           .children[0] as HTMLInputElement
//       ).value
//     ).toBe('2022-09-13')
//   })
// }
export default {
  title: 'components/MUI/DatePicker',
  component: DatePicker,
} as Meta
