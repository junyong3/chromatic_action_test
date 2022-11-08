import { useMemo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import useMemberStore, {
  MemberStatus,
  MemberStatusTS,
  OrderCheck,
  OrderCheckTS,
} from '@stores/Commerce/Member/member.store'
import { SearchBox, SearchBoxRow, SearchBoxItem } from '@components/SearchBox'
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
  const onSubmit = (dataInput: FieldValues) => {
    const { memberStatus, orderCheck, keyword } = dataInput
    setSearchCondition({
      memberStatus: memberStatus.filter(
        (value: string) => value !== 'all'
      ) as MemberStatusTS[],
      orderCheck: orderCheck.filter(
        (value: string) => value !== 'all'
      ) as OrderCheckTS[],
      keyword,
    })
  }

  return (
    <SearchBox
      disabled={!isValid}
      disabledText={'검색 조건을 모두 입력해 주세요.'}
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <SearchBoxRow>
        <SearchBoxItem label={'회원상태'} required>
          <InputCheckbox
            row
            options={memberStatusConditions}
            name={'memberStatus'}
            valueKey={'key'}
            required
          />
        </SearchBoxItem>
      </SearchBoxRow>
      <SearchBoxRow>
        <SearchBoxItem label={'활동제한'} required>
          <InputCheckbox
            row
            options={orderCheckConditions}
            name={'orderCheck'}
            valueKey={'key'}
            required
          />
        </SearchBoxItem>
      </SearchBoxRow>
      <SearchBoxRow>
        <SearchBoxItem label={'검색어 필터'} required>
          <InputTextField
            data-cy={'keywordInput'}
            name={'keyword'}
            size={'small'}
            placeholder={'회원 이름, 휴대폰번호, UID를 정확히 입력해 주세요.'}
            required
            parseError={() => ''}
            sx={{ width: '376px' }}
          />
        </SearchBoxItem>
      </SearchBoxRow>
    </SearchBox>
  )
}

export default MemberSearchBox
