import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutationWrap } from '@queries/useMutation'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@api/path/Commerce/memberPath'
import InputTextField from '@components/TextField/InputTextField'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import Typography from '@components/Typography'
import FormModal from '@components/Modal/FormModal'
import SnackbarService from '@services/SnackbarService'
import { useMemberPointStore } from '@stores/Commerce/Member/member.point.store'

function UsePointModal({ memberId }: { memberId: string }) {
  const { mutate } = useMutationWrap()

  const [isUsePointDialog, setIsUsePointDialog] = useMemberPointStore(
    (state) => [state.isUsePointDialog, state.setIsUsePointDialog]
  )
  const [isWillCloseDialog, setIsWillCloseDialog] = useState(false)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      reason: '',
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutate(
      NetworkService.commerceMember.patch(
        COMMERCE_MEMBER_API_PATH.MEMBER_POINT(memberId),
        data
      ),
      {
        onSuccess: () => {
          SnackbarService.show('적립금이 사용되었습니다.')
          onClose()
        },
      }
    )
  })

  const resetState = () => {
    methods.setValue('amount', 0)
    methods.setValue('reason', '')
    methods.clearErrors()
  }

  const onClickReset = () => {
    resetState()
  }

  const onClose = () => {
    setIsWillCloseDialog(false)
    setIsUsePointDialog(false)
    resetState()
  }

  return (
    <FormModal
      size={'xs'}
      open={isUsePointDialog}
      title={'적립금 사용'}
      onClose={() => setIsWillCloseDialog(true)}
      methods={methods}
      onSubmit={onSubmit}
      content={
        <>
          <SearchFormRow>
            <SearchFormItem label={'금액'} required>
              <InputTextField
                type={'number'}
                name={'amount'}
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
            <SearchFormItem label={'사용 사유'} required>
              <InputTextField
                data-cy={'reason'}
                name={'reason'}
                size={'small'}
                placeholder={'사용 사유'}
                required
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
                sx={{ width: '100%' }}
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
        title={'적립금 사용'}
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

export default UsePointModal
