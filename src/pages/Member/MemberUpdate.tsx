import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@api/path/Commerce/memberPath'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import InvalidParamsErrorDialog from '@components/Dialog/InvalidParamsErrorDialog'
import { useQueryWrap } from '@queries/useQuery'
import LoadingService from '@services/LoadingService'
import useMemberStore, {
  MemberDataSet,
} from '@stores/Commerce/Member/member.store'
import MemberDataLayer from './Detail&Update/MemberDataLayer'
import MemberTab from './Detail&Update/MemberTab'
import { MemberQueryKey } from '@pages/Member/Props'

function MemberUpdate() {
  const { id } = useParams()
  const setMemberDataSet = useMemberStore((state) => state.setMemberDataSet)
  const isAvailableSave = useMemberStore((state) => state.isAvailableSave)
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState<boolean>(false)

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

  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
  }, [isLoading, isSuccess])

  return (
    <Page>
      <SubHeader
        title={'회원 수정'}
        saveButton={{
          disabled: !isAvailableSave,
          onClick: () => setIsOpenSaveDialog(true),
        }}
      />
      <MemberDataLayer pageType="update" />
      <Box sx={{ mt: 5 }}>
        <MemberTab />
      </Box>

      <Dialog
        size="sm"
        open={isOpenSaveDialog}
        title="확인"
        onClose={() => setIsOpenSaveDialog(false)}
        content={'설정된 정보로 저장하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsOpenSaveDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogSaveButton'}
              data-sb-kind={'pages/Commerce/Member/MemberDetail'}
              type="submit"
              form="memberUpdateForm"
              disabled={!isAvailableSave}
              onClick={() => setIsOpenSaveDialog(false)}
            >
              저장
            </Button>
          </>
        }
      />
      <InvalidParamsErrorDialog />
    </Page>
  )
}

export default MemberUpdate
