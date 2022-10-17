import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@src/api/path/Commerce/memberPath'
import { useQueryWrap } from '@queries/useQuery'
import LoadingService from '@services/LoadingService'
import useMemberStore, {
  MemberDataSet,
} from '@stores/Commerce/Member/member.store'
import { SubHeader } from '@compositions/Header'
import Page from '@components/Page'
import MemberDataLayer from './Detail&Update/MemberDataLayer'
import MemberTab from './Detail&Update/MemberTab'
import { To } from '@routes/To'
import { MemberQueryKey } from '@pages/Member/Props'

function MemberDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const setMemberDataSet = useMemberStore((state) => state.setMemberDataSet)

  const { isSuccess, isLoading } = useQueryWrap<MemberDataSet>(
    MemberQueryKey.detail(id as string),
    () =>
      NetworkService.commerceMember.get(
        COMMERCE_MEMBER_API_PATH.MEMBER_DETAIL(id as string)
      ),
    {
      onSuccess: (memberDataSet: any) => {
        setMemberDataSet({ ...memberDataSet })
      },
      enabled: !!id,
    }
  )

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
  }, [isLoading, isSuccess])

  return (
    <Page>
      <SubHeader
        title={'회원 상세'}
        updateButton={{
          sbKind: 'pages/Commerce/Member/MemberUpdate',
          disabled: false,
          onClick: () => navigate(`${To.CommerceMemberList}/${id}/update`),
        }}
      />
      <MemberDataLayer pageType="detail" />
      <Box sx={{ mt: 5 }}>
        <MemberTab />
      </Box>
    </Page>
  )
}

export default MemberDetail
