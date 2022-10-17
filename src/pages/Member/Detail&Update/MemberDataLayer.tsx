import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { AxiosError } from 'axios'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import ErrorCode from '@api/NetworkService/errorCode'
import NetworkService from '@api/NetworkService'
import { IAMErrorRes, IAMSuccessRes } from '@api/model/IAMRes'
import { COMMERCE_MEMBER_API_PATH } from '@src/api/path/Commerce/memberPath'
import useMemberStore, {
  MemberStatus,
  OrderCheck,
  MemberDataSet,
} from '@src/stores/Commerce/Member/member.store'
import { useErrorStore } from '@stores/error.store'
import { useMutationWrap } from '@queries/useMutation'
import useUpdateEffect from '@hooks/useUpdateEffect'
import Typography from '@components/Typography'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import InputTextField from '@components/TextField/InputTextField'
import useMemberInfoValidate from '../query/useMemberInfoValidate'
import { FlexRow } from '../StyleObj'
import InputRadio from '@components/Radio/InputRadio'
import InputSwitch from '@components/Switch/InputSwitch'
import { MemberDataGridProp, MemberQueryKey } from '@pages/Member/Props'
import { useQueryClient } from 'react-query'
import { REGEXP } from '@src/constants/REGEXP'

function MemberDataLayer(props: MemberDataGridProp) {
  const memberStatusOptions = useMemo(
    () => [
      {
        label: '정상회원',
        id: MemberStatus.NORMAL,
      },
      {
        label: '탈퇴 회원',
        id: MemberStatus.SECESSION,
      },
    ],
    []
  )

  const { pageType } = props
  const isUpdateMode = pageType === 'update'
  const queryClient = useQueryClient()
  const [dataInput, setDataInput, setIsAvailableSave] = useMemberStore(
    (state) => [
      state.memberDataSet,
      state.setMemberDataSet,
      state.setIsAvailableSave,
    ]
  )
  const { validate } = useMemberInfoValidate(dataInput.id ?? '')
  const [isOpenInvalidDialog, setIsOpenInvalidDialog] = useState<boolean>(false)
  const { mutate } = useMutationWrap<MemberDataSet>()
  const navigate = useNavigate()
  const setIsInvalidError = useErrorStore((state) => state.setIsInvalidError)

  const methods = useForm<MemberDataSet & { orderCheckSwitch: boolean }>({
    mode: 'onChange',
  })
  const { errors, isValid } = useFormState({ control: methods.control })

  // 휴대폰번호 중복조회
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true)
  const clickValidatePhone = () => {
    if (isValidPhone) return
    validate({
      target: 'phone',
      value: methods.getValues('phone'),
      callback: ({ result }) => {
        setIsValidPhone(result)
        setIsOpenInvalidDialog(!result)
      },
    })
  }

  // 이메일 중복조회
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
  const clickValidateEmail = () => {
    if (isValidEmail) return
    validate({
      target: 'email',
      value: methods.getValues('email'),
      callback: ({ result }) => {
        setIsValidEmail(result)
        setIsOpenInvalidDialog(!result)
      },
    })
  }

  useEffect(() => {
    methods.reset({
      ...dataInput,
      orderCheckSwitch: dataInput.orderCheck === OrderCheck.YES,
    })
  }, [dataInput, methods])

  useUpdateEffect(() => {
    setIsAvailableSave(isValid && isValidPhone && isValidEmail)
  }, [isValid, isValidPhone, isValidEmail, setIsAvailableSave])

  const onSubmit = methods.handleSubmit((data) => {
    const params = {
      ...data,
      orderCheck: data.orderCheckSwitch ? OrderCheck.YES : OrderCheck.NO,
    }

    setDataInput(params)

    LoadingService.show()

    const onSuccess = ({ success, data }: IAMSuccessRes<MemberDataSet>) => {
      if (success) {
        SnackbarService.show(MSG.SUCCESS.SAVE_MEMBER)
        queryClient.invalidateQueries(MemberQueryKey.detail(data.id))
        if (!data || !data.id) {
          navigate(To.Error, {
            replace: true,
            state: {
              type: 'ERROR',
            },
          })
        } else navigate(`${To.CommerceMemberList}/${data.id}`)
      }
    }
    const onError = ({ response }: AxiosError<IAMErrorRes<any>>) => {
      const code = response?.data.code
      if (code === ErrorCode.INVALID_PARAMETERS) {
        setIsInvalidError(true)
      } else {
        useErrorStore.setState({
          isSystemError: true,
        })
      }
    }
    const onSettled = () => {
      LoadingService.close()
    }

    mutate(
      NetworkService.commerceMember.patch(
        COMMERCE_MEMBER_API_PATH.UPDATE_MEMBER(params.id),
        params
      ),
      {
        onSuccess,
        onError,
        onSettled,
      }
    )
  })

  return (
    <FormProvider {...methods}>
      <form id="memberUpdateForm" onSubmit={onSubmit}>
        <FlexRow style={{ paddingTop: '32px', gap: '24px' }}>
          <div className={'id-area'}>
            <Typography variant={'subtitle2'}>UID</Typography>
            <InputTextField
              data-cy={'id'}
              name={'id'}
              size={'small'}
              required
              disabled
              sx={{ width: '100%', marginTop: '12px' }}
            />
          </div>
          <div className={'name-area'}>
            <Typography variant={'subtitle2'} required>
              이름
            </Typography>
            <InputTextField
              data-cy={'name'}
              name={'name'}
              size={'small'}
              placeholder={'이름'}
              required
              disabled={!isUpdateMode}
              validation={{ minLength: 2 }}
              sx={{ width: '100%', marginTop: '12px' }}
            />
          </div>
          <div className={'phone-area'}>
            <Typography variant={'subtitle2'} required>
              휴대폰번호
            </Typography>
            <FlexRow style={{ marginTop: '12px', gap: '12px' }}>
              <InputTextField
                data-cy={'phone'}
                name={'phone'}
                size={'small'}
                placeholder={'휴대폰번호'}
                required
                disabled={!isUpdateMode}
                validation={{
                  pattern: {
                    value: REGEXP.PHONE,
                    message: '‘ - ‘없이 11자리 휴대폰번호를 입력하세요.',
                  },
                }}
                onChange={() => setIsValidPhone(false)}
              />
              <Button
                data-cy={'validatePhoneButton'}
                type="button"
                variant={'outlined'}
                sx={{ width: '96px', flex: 'none' }}
                disabled={isValidPhone || !!errors.phone}
                onClick={clickValidatePhone}
              >
                {isValidPhone ? '사용가능' : '중복확인'}
              </Button>
            </FlexRow>
          </div>
        </FlexRow>
        <FlexRow style={{ paddingTop: '32px', gap: '24px' }}>
          <div className={'status-area'}>
            <Typography variant={'subtitle2'} required>
              회원상태
            </Typography>
            <InputRadio
              row
              name={'memberStatus'}
              options={memberStatusOptions}
              type={'number'}
              disabled={!isUpdateMode}
            />
          </div>
          <div className={'register-area'}>
            <Typography variant={'subtitle2'}>가입일시</Typography>
            <FlexRow style={{ marginTop: '12px', gap: '16px' }}>
              <InputTextField
                data-cy={'registerRoute'}
                name={'registerRoute'}
                size={'small'}
                placeholder={'가입 경로'}
                disabled
                sx={{ width: '112px', flex: 'none' }}
              />
              <InputTextField
                data-cy={'registerDate'}
                name={'registerDate'}
                size={'small'}
                placeholder={'가입 일시'}
                disabled
                sx={{ flex: 1 }}
              />
            </FlexRow>
          </div>
          <div className={'email-area'}>
            <Typography variant={'subtitle2'} required>
              ID(이메일)
            </Typography>
            <FlexRow style={{ marginTop: '12px', gap: '12px' }}>
              <InputTextField
                data-cy={'email'}
                name={'email'}
                size={'small'}
                placeholder={'이메일'}
                required
                disabled={!isUpdateMode || dataInput.registerRoute !== '자체'}
                helperText={'자체 회원가입된 ID만 수정할 수 있습니다.'}
                validation={{
                  pattern: {
                    value: REGEXP.EMAIL,
                    message: '@를 포함한 이메일 형식으로 입력해 주세요.',
                  },
                }}
                onChange={() => setIsValidEmail(false)}
              />
              <Button
                data-cy={'validateEmailButton'}
                type="button"
                variant={'outlined'}
                sx={{ width: '96px', flex: 'none' }}
                disabled={isValidEmail || !!errors.email}
                onClick={clickValidateEmail}
              >
                {isValidEmail ? '사용가능' : '중복확인'}
              </Button>
            </FlexRow>
          </div>
        </FlexRow>
        <FlexRow style={{ paddingTop: '32px', gap: '24px' }}>
          <div className={'restrictions-area'}>
            <Typography variant={'subtitle2'}>활동제한</Typography>
            <InputSwitch
              name={'orderCheckSwitch'}
              label={'주문 금지'}
              size={'small'}
              disabled={!isUpdateMode}
              sx={{ mt: '4px', p: '8px' }}
            />
          </div>
        </FlexRow>
      </form>
      <Dialog
        size="sm"
        open={isOpenInvalidDialog}
        title="사용 불가"
        onClose={() => setIsOpenInvalidDialog(false)}
        content={'다른 회원이 사용하고 있어, 변경할 수 없습니다.'}
        actions={
          <Button onClick={() => setIsOpenInvalidDialog(false)}>확인</Button>
        }
      />
    </FormProvider>
  )
}

export default MemberDataLayer
