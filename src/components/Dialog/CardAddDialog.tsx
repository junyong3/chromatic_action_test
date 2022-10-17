import shallow from 'zustand/shallow'
import Button from '@components/Button'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import InputTextField from '@components/TextField/InputTextField'
import InputRadio from '@components/Radio/InputRadio'
import InputCheckbox from '@components/Checkbox/InputCheckbox'
import useMemberStore from '@src/stores/Commerce/Member/member.store'
import SnackbarService from '@services/SnackbarService'
import { useMutationWrap } from '@queries/useMutation'
import NetworkService from '@api/NetworkService'
import { AdminCreateCardDto } from '@api/model/Commerce/payment'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import LoadingService from '@services/LoadingService'
import { MSG } from '@constants/MessageCode/msg'
import FormModal from '@components/Modal/FormModal'
import { useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useErrorStore } from '@stores/error.store'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { MemberQueryKey } from '@src/pages/Member/Props'
const UserVerificationOpt = [
  {
    label: '생년월일',
    id: 'birthDate',
  },
  {
    label: '사업자등록번호',
    id: 'company',
  },
]
const IdentityComplete = [
  {
    label: '본인 확인 완료',
    id: 'check',
  },
]
export const InitCardAdd = {
  IdentityVerificationNumber: null as null | number,
  IsIdentityComplete: [],
  cardNumber: null as null | string,
  ExpirationPeriod: '',
  cardPassword: '',
  UserVerification: 'birthDate',
  CompanyRegistrationNumber: null as null | string,
  cardName: '',
}
function CardAddDialog() {
  const { id: memberId } = useParams()
  const queryClient = useQueryClient()
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const isCardAddOpen = useMemberStore(
    (state) => state.isCardAddDialogOpen,
    shallow
  )
  const { mutate } = useMutationWrap()

  const formContext = useForm<typeof InitCardAdd>({
    mode: 'onBlur',
    defaultValues: InitCardAdd,
  })
  const { isValid } = formContext.formState
  const UserVerification = formContext.watch('UserVerification')
  const [UserVerificationFormat, setUserVerificationFormat] = useState({
    label: '생년월일',
    placeholder: '생년월일 6자리 (ex. 880101)',
    maxLength: 8,
  })

  useEffect(() => {
    if (UserVerification === 'birthDate') {
      setUserVerificationFormat({
        label: '생년월일',
        placeholder: '생년월일 6자리 (ex. 880101)',
        maxLength: 6,
      })
    } else {
      setUserVerificationFormat({
        label: '사업자등록번호',
        placeholder: '사업자등록번호 10자리',
        maxLength: 10,
      })
    }
  }, [UserVerification])

  const onSubmit = formContext.handleSubmit((data) => {
    const cardInfoDataSet = {} as AdminCreateCardDto
    cardInfoDataSet.cardNumber = data.cardNumber || ''
    cardInfoDataSet.cardName = data.cardName
    cardInfoDataSet.expirationMonth = data.ExpirationPeriod.slice(0, 2)
    cardInfoDataSet.expirationYear = data.ExpirationPeriod.slice(2, 4)
    cardInfoDataSet.customerIdentityNumber =
      data.CompanyRegistrationNumber || ''
    cardInfoDataSet.cardPassword = data.cardPassword
    cardInfoDataSet.userId = memberId || ''

    LoadingService.show()
    mutate(
      NetworkService.commercePayment.post<AdminCreateCardDto>(
        COMMERCE_PAYMENT_API_PATH.MEMBER_CREDIT_CARD,
        cardInfoDataSet
      ),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.SAVE_CARD)
          queryClient.invalidateQueries(MemberQueryKey.cardList)
          formContext.reset()
          useMemberStore.setState({ isCardAddDialogOpen: false })
        },
        onError: ({ response }) => {
          const code = response?.data.code
          setIsSystemError(true, code)
        },
        onSettled: () => {
          LoadingService.close()
        },
      }
    )
  })
  return (
    <FormModal
      size={'md'}
      open={isCardAddOpen}
      title={'카드 등록'}
      onClose={() => {
        formContext.reset()
        useMemberStore.setState({ isCardAddDialogOpen: false })
      }}
      methods={formContext}
      onSubmit={onSubmit}
      content={
        <>
          <CardAddFormRow labelWidth={130} label={'본인 인증 번호'}>
            <InputTextField
              name={'IdentityVerificationNumber'}
              data-cy={'IdentityVerificationNumber'}
              isNumber={true}
              size={'small'}
              disabled
              placeholder={'본인 인증 번호'}
              inputProps={{
                maxLength: 5,
              }}
              sx={{ width: '200px' }}
            />
            <Button
              sx={{
                marginLeft: '14px',
              }}
              variant={'outlined'}
              onClick={() => {
                SnackbarService.show('본인 인증 메시지가 전송되었습니다.')
                console.log('메시지 전송')
              }}
            >
              메시지 전송
            </Button>
            <Box
              sx={{
                marginLeft: '14px',
              }}
            >
              <InputCheckbox
                onChange={() => {
                  formContext.trigger('IsIdentityComplete')
                }}
                required
                options={IdentityComplete}
                name={'IsIdentityComplete'}
                data-cy={'IsIdentityComplete'}
              />
            </Box>
          </CardAddFormRow>
          <CardAddFormRow labelWidth={130} required label={'카드 번호'}>
            <InputTextField
              required
              name={'cardNumber'}
              data-cy={'cardNumber'}
              validation={{
                validate: {
                  cardNumber: (value) => {
                    if (value && Number(value.toString().length) < 14)
                      return '카드 번호 14-16자리 입력 해주세요.'
                  },
                },
              }}
              isNumber={true}
              size={'small'}
              placeholder={'숫자만 입력'}
              inputProps={{
                maxLength: 16,
                'aria-label': 'cardNumber',
              }}
              sx={{ width: '280px' }}
            />
          </CardAddFormRow>
          <CardAddFormRow labelWidth={130} required label={'유효 기간'}>
            <InputTextField
              required
              name={'ExpirationPeriod'}
              data-cy={'ExpirationPeriod'}
              isNumber={true}
              validation={{
                minLength: 4,
              }}
              size={'small'}
              placeholder={'MMYY'}
              inputProps={{
                maxLength: 4,
              }}
              sx={{ width: '200px' }}
            />
          </CardAddFormRow>
          <CardAddFormRow labelWidth={130} required label={'비밀번호'}>
            <InputTextField
              required
              name={'cardPassword'}
              data-cy={'cardPassword'}
              isNumber={true}
              size={'small'}
              placeholder={'앞 두 자리'}
              validation={{
                minLength: 2,
              }}
              inputProps={{
                maxLength: 2,
              }}
              sx={{ width: '200px' }}
            />
          </CardAddFormRow>
          <CardAddFormRow labelWidth={130} required label={'사용자 인증'}>
            <InputRadio
              row
              options={UserVerificationOpt}
              name={'UserVerification'}
            />
          </CardAddFormRow>
          <CardAddFormRow
            labelWidth={130}
            required
            label={UserVerificationFormat.label}
          >
            <InputTextField
              required
              name={'CompanyRegistrationNumber'}
              data-cy={'CompanyRegistrationNumber'}
              isNumber={true}
              size={'small'}
              placeholder={UserVerificationFormat.placeholder}
              // label={UserVerificationFormat.placeholder}
              validation={{
                minLength: UserVerificationFormat.maxLength,
              }}
              inputProps={{
                maxLength: UserVerificationFormat.maxLength,
              }}
              sx={{ width: '280px' }}
            />
          </CardAddFormRow>
          <CardAddFormRow labelWidth={130} required label={'카드별명'}>
            <InputTextField
              required
              name={'cardName'}
              data-cy={'cardName'}
              size={'small'}
              placeholder={'1자 이상 10자 이하 입력'}
              validation={{
                validate: {
                  cardName: (value) => {
                    if (value.trim().length === 0) return false
                  },
                },
              }}
              inputProps={{
                maxLength: 10,
              }}
              sx={{ width: '280px' }}
            />
          </CardAddFormRow>
        </>
      }
      actions={
        <>
          <Button
            type={'submit'}
            disabled={!isValid}
            variant="contained"
            color="primary"
            data-cy="cardAdd"
          >
            카드 등록
          </Button>
        </>
      }
    >
      {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
    </FormModal>
  )
}

export default CardAddDialog

function CardAddFormRow(
  props: PropsWithChildren<{
    label: string
    labelWidth: number
    required?: boolean
  }>
) {
  const { label, children, labelWidth, required = false } = props
  return (
    <SearchFormRow>
      <SearchFormItem label={label} labelWidth={labelWidth} required={required}>
        {children}
      </SearchFormItem>
    </SearchFormRow>
  )
}
