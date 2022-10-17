import SearchForm from '@components/SearchForm'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import DateTimePickerElement from '@components/DatePicker/DateTimePickerElement'
import {
  PointSearchCondition,
  usePointStore,
} from '@stores/Commerce/Point/point.store'
import { Box, Link } from '@mui/material'

function PointSearchBox() {
  const methods = useForm<PointSearchCondition>({
    defaultValues: {
      startDate: dayjs().add(-30, 'd').format('YYYY-MM-DD 00:00:00'),
      endDate: dayjs().format('YYYY-MM-DD 00:00:00'),
      fileName: '',
    },
  })
  const setSearchCondition = usePointStore((state) => state.setSearchCondition)

  const onSubmit = methods.handleSubmit((data) => {
    setSearchCondition(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <PointRangeDate />
          <PointFileName />
          <PointDesc />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default PointSearchBox

function PointRangeDate() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'기간'} required labelWidth={120}>
        <DateTimePickerElement
          name={'startDate'}
          label={'시작일자'}
          inputFormat={'YYYY-MM-DD HH:mm:ss'}
        />
        <div style={{ margin: '12px' }}>~</div>
        <DateTimePickerElement
          name={'endDate'}
          label={'종료일자'}
          inputFormat={'YYYY-MM-DD HH:mm:ss'}
          disableFuture={false}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function PointFileName() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'파일명'} labelWidth={120}>
        <InputTextField
          name={'fileName'}
          placeholder={'파일명을 입력하세요'}
          sx={{ width: '376px' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function PointDesc() {
  const onClickTemplateDownload = () => {
    console.log('template download')
  }
  return (
    <>
      <Box component={'div'} sx={{ height: 48 }} />
      <SearchFormRow>
        <SearchFormItem
          label={
            <>
              <div>
                적립금을 지급할 대상고객정보를 xls 파일로 업로드하세요. xls 파일
                템플릿대로 업로드 하셔야 오류 없이 지급됩니다.
              </div>
              <div>지급프로세스는 지급버튼을 클릭하면 진행됩니다.</div>
              <Link
                sx={{ cursor: 'pointer' }}
                onClick={onClickTemplateDownload}
              >
                등록 파일 템플릿 보기
              </Link>
            </>
          }
          labelWidth={700}
        />
      </SearchFormRow>
    </>
  )
}
