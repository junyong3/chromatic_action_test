import { useForm } from 'react-hook-form'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import Button from '@components/Button'
import Dialog from '@components/Dialog/Dialog'
import React, { useState } from 'react'
import { usePointStore } from '@stores/Commerce/Point/point.store'
import DateTimePickerElement from '@components/DatePicker/DateTimePickerElement'
import InputFileTextField from '@components/TextField/InputFileTextField'
import { useMutationWrap } from '@queries/useMutation'
import NetworkService from '@api/NetworkService'
import SnackbarService from '@services/SnackbarService'
import { COMMERCE_POINT_API_PATH } from '@api/path/Commerce/pointPath'
import { CreatePointTargetReq } from '@api/model/Commerce/point'
import FormModal from '@components/Modal/FormModal'

function TargetPaymentRegisterModal() {
  const { mutate } = useMutationWrap()

  const [isOpenTargetPaymentDialog, setIsOpenTargetPaymentDialog] =
    usePointStore((state) => [
      state.isOpenTargetPaymentDialog,
      state.setIsOpenTargetPaymentDialog,
    ])
  const [isErrorDialog, setIsErrorDialog] = useState(false)

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      paymentDate: '',
      file: null,
      fileName: '',
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutate(
      NetworkService.commerce.post<CreatePointTargetReq>(
        COMMERCE_POINT_API_PATH.CREATE_POINT_TARGET,
        data
      ),
      {
        onSuccess: () => {
          SnackbarService.show('지급 대상 등록이 완료되었습니다.')
          setIsOpenTargetPaymentDialog(false)
        },
        onError: () => {
          setIsErrorDialog(true)
        },
      }
    )
  })

  const resetState = () => {
    methods.setValue('paymentDate', '')
    methods.setValue('file', null)
    methods.setValue('fileName', '')
    methods.clearErrors()
  }

  const onClickReset = () => {
    resetState()
  }

  const onClose = () => {
    setIsOpenTargetPaymentDialog(false)
    resetState()
  }

  return (
    <FormModal
      size={'sm'}
      open={isOpenTargetPaymentDialog}
      title={'등록하기'}
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      content={
        <>
          <SearchFormRow>
            <SearchFormItem label={'지급일'} required labelWidth={80}>
              <DateTimePickerElement
                className={'chromatic-ignore'}
                name={'paymentDate'}
                label={'지급일'}
                inputFormat={'YYYY-MM-DD HH:mm:ss'}
                validation={{
                  required: {
                    value: true,
                    message: '지급일을 입력해 주세요.',
                  },
                }}
              />
            </SearchFormItem>
          </SearchFormRow>
          <SearchFormRow>
            <SearchFormItem label={'파일'} required labelWidth={80}>
              <InputFileTextField
                fileKey={'file'}
                fileNameKey={'fileName'}
                buttonText={'등록하기'}
                accept={'.xls, .xlsx'}
                validation={{
                  required: {
                    value: true,
                    message: '파일을 등록해 주세요.',
                  },
                }}
              />
            </SearchFormItem>
          </SearchFormRow>
        </>
      }
      actions={
        <>
          <Button
            variant={'outlined'}
            sx={{
              width: '128px',
            }}
            onClick={onClickReset}
          >
            초기화
          </Button>
          <Button
            type={'submit'}
            variant={'contained'}
            sx={{
              width: '128px',
            }}
          >
            저장
          </Button>
        </>
      }
    >
      <Dialog
        size={'xs'}
        open={isErrorDialog}
        title={'파일 업로드'}
        onClose={() => setIsErrorDialog(false)}
        content={
          <>
            적립금 지급 권한이 없습니다.
            <br />
            보안담당자에게 문의해주세요.
          </>
        }
        actions={<Button onClick={() => setIsErrorDialog(false)}>확인</Button>}
      ></Dialog>
    </FormModal>
  )
}

export default TargetPaymentRegisterModal
