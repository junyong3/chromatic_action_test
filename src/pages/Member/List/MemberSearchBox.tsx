import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useMemberStore, {
  MemberStatus,
  MemberStatusTS,
  OrderCheck,
  OrderCheckTS,
} from '@stores/Commerce/Member/member.store'
import SearchForm from '@components/SearchForm'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import InputTextField from '@components/TextField/InputTextField'
import InputCheckbox from '@components/Checkbox/InputCheckbox'

const initSearchCondition = {
  memberStatus: ['all', MemberStatus.NORMAL, MemberStatus.SECESSION],
  orderCheck: ['all', OrderCheck.YES, OrderCheck.NO],
  keyword: '',
}
function MemberSearchBox() {
  const memberStatusConditions = useMemo(
    () => [
      {
        label: '전체',
        key: 'all',
        isChecked: true,
      },
      {
        label: '정상회원',
        key: MemberStatus.NORMAL,
        isChecked: true,
      },
      {
        label: '탈퇴 회원',
        key: MemberStatus.SECESSION,
        isChecked: true,
      },
    ],
    []
  )
  const orderCheckConditions = useMemo(
    () => [
      {
        label: '전체',
        key: 'all',
        isChecked: true,
      },
      {
        label: '주문금지 포함',
        key: OrderCheck.YES,
        isChecked: true,
      },
      {
        label: '주문금지 제외',
        key: OrderCheck.NO,
        isChecked: true,
      },
    ],
    []
  )

  const setSearchCondition = useMemberStore((state) => state.setSearchCondition)

  const methods = useForm<typeof initSearchCondition>({
    mode: 'onChange',
    defaultValues: initSearchCondition,
  })
  const { isValid } = methods.formState
  const onSubmit = methods.handleSubmit(
    ({ memberStatus, orderCheck, keyword }) => {
      setSearchCondition({
        memberStatus: memberStatus.filter(
          (value) => value !== 'all'
        ) as MemberStatusTS[],
        orderCheck: orderCheck.filter(
          (value) => value !== 'all'
        ) as OrderCheckTS[],
        keyword,
      })
    }
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm
          disabled={!isValid}
          disabledText={'검색 조건을 모두 입력해 주세요.'}
        >
          <SearchFormRow>
            <SearchFormItem label={'회원상태'} required>
              <InputCheckbox
                row
                options={memberStatusConditions}
                name={'memberStatus'}
                valueKey={'key'}
                required
              />
            </SearchFormItem>
          </SearchFormRow>
          <SearchFormRow>
            <SearchFormItem label={'활동제한'} required>
              <InputCheckbox
                row
                options={orderCheckConditions}
                name={'orderCheck'}
                valueKey={'key'}
                required
              />
            </SearchFormItem>
          </SearchFormRow>
          <SearchFormRow>
            <SearchFormItem label={'검색어 필터'} required>
              <InputTextField
                data-cy={'keywordInput'}
                name={'keyword'}
                size={'small'}
                placeholder={
                  '회원 이름, 휴대폰번호, UID를 정확히 입력해 주세요.'
                }
                required
                parseError={() => ''}
                sx={{ width: '376px' }}
              />
            </SearchFormItem>
          </SearchFormRow>
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default MemberSearchBox
