import { useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import Instance from '@api/Instance'
import { COMMERCE_MEMBER_API_PATH } from '@api/path/Commerce/memberPath'
import { useMutationWrap } from '@queries/useMutation'
import { useMemberPointStore } from '@stores/Commerce/Member/member.point.store'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import DateTimePickerElement from '@components/DatePicker/DateTimePickerElement'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'
import InputSelect from '@components/Select/InputSelect'
import FormModal from '@components/Modal/FormModal'
import SnackbarService from '@services/SnackbarService'
import { givePointReasonOptions } from '@constants/SelectItem/OptionList'
import { MSG } from '@constants/MessageCode/msg'

function GivePointModal({ memberId }: { memberId: string }) {
  const { mutate } = useMutationWrap()

  const [isGivePointDialog, setIsGivePointDialog] = useMemberPointStore(
    (state) => [state.isGivePointDialog, state.setIsGivePointDialog]
  )
  const [isWillCloseDialog, setIsWillCloseDialog] = useState(false)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      selectReason: '',
      reason: '',
      expireDate: dayjs()
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .add(1, 'year'),
    },
  })
  const selectReason = methods.watch('selectReason')

  const onSubmit = methods.handleSubmit(
    ({ amount, selectReason, reason, expireDate }) => {
      const params = {
        amount,
        reason: selectReason !== 'I' ? selectReason : reason,
        expireDate: dayjs(expireDate).format('YYYY-MM-DD HH:mm:ss'),
      }
      mutate(
        Instance.post(COMMERCE_MEMBER_API_PATH.MEMBER_POINT(memberId), params),
        {
          onSuccess: () => {
            SnackbarService.show(MSG.SUCCESS.GIVE_MEMBER_POINT)
            onClose()
          },
        }
      )
    }
  )

  const resetState = () => {
    methods.setValue('amount', 0)
    methods.setValue('selectReason', '')
    methods.setValue('reason', '')
    methods.setValue(
      'expireDate',
      dayjs().set('hour', 23).set('minute', 59).set('second', 59).add(1, 'year')
    )
    methods.clearErrors()
  }

  const onClickReset = () => {
    resetState()
  }

  const onClose = () => {
    setIsWillCloseDialog(false)
    setIsGivePointDialog(false)
    resetState()
  }

  return (
    <FormModal
      size={'sm'}
      open={isGivePointDialog}
      title={'적립금 지급'}
      onClose={() => setIsWillCloseDialog(true)}
      methods={methods}
      onSubmit={onSubmit}
      content={
        <>
          <SearchFormRow>
            <SearchFormItem label={'금액'} required>
              <InputTextField
                name={'amount'}
                isNumber
                placeholder={'금액'}
                inputProps={{
                  min: 0,
                }}
                validation={{
                  required: {
                    value: true,
                    message: '금액을 입력해 주세요.',
                  },
                  min: {
                    value: 1,
                    message: '금액을 입력해 주세요.',
                  },
                }}
              />
              <Typography variant="subtitle2" sx={{ marginLeft: '5px' }}>
                원
              </Typography>
            </SearchFormItem>
          </SearchFormRow>
          <SearchFormRow>
            <SearchFormItem label={'지급 사유'} required>
              <InputSelect
                required
                name={'selectReason'}
                options={givePointReasonOptions}
                label={'사유 선택'}
                placeholder={'사유 선택'}
              />
              {selectReason === 'I' ? (
                <InputTextField
                  name={'reason'}
                  label={'기타 사유 입력'}
                  required
                  size={'small'}
                  placeholder={'기타 사유 입력'}
                  validation={{
                    required: {
                      value: true,
                      message: '사용 사유를 입력해 주세요.',
                    },
                    maxLength: {
                      value: 50,
                      message: '최대 50자까지 입력 가능합니다.',
                    },
                  }}
                  sx={{ marginLeft: '18px' }}
                />
              ) : null}
            </SearchFormItem>
          </SearchFormRow>
          <SearchFormRow>
            <SearchFormItem label={'소멸일시'} required>
              <DateTimePickerElement
                name={'expireDate'}
                label={'소멸일시'}
                inputFormat={'YYYY-MM-DD HH:mm:ss'}
                validation={{
                  required: {
                    value: true,
                    message: '소멸일시를 입력해 주세요.',
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
            sx={{
              width: '200px',
              justifyContent: 'center',
            }}
            onClick={onClickReset}
          >
            초기화
          </Button>
          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!methods.formState.isValid}
            sx={{
              width: '200px',
              justifyContent: 'center',
            }}
          >
            저장
          </Button>
        </>
      }
    >
      <Dialog
        size={'xs'}
        open={isWillCloseDialog}
        title={'적립금 지급'}
        onClose={() => setIsWillCloseDialog(false)}
        content={
          <>
            데이터 저장 없이 창이 닫힙니다.
            <br />
            계속 진행하시겠어요?
          </>
        }
        actions={
          <>
            <Button onClick={() => setIsWillCloseDialog(false)}>취소</Button>
            <Button data-cy={'dialogSaveButton'} onClick={onClose}>
              확인
            </Button>
          </>
        }
      ></Dialog>
    </FormModal>
  )
}

export default GivePointModal
