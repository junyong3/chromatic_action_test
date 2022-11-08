import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FieldValues } from 'react-hook-form'
import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import { To } from '@routes/To'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { useMutationWrap } from '@queries/useMutation'
import { useQueryWrap } from '@queries/useQuery'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { useClientStore } from '@stores/MDM/Partners/client.store'
import PartnersDataLayer from '@domain/MDM/pages/Partners/InputData/PartnersDataLayer'
import { PartnersQueryKey, ClientTS } from '@domain/MDM/pages/Partners/Props'
import { MSG } from '@src/constants/MessageCode/msg'

function ClientUpdatePage() {
  const { id } = useParams()
  const { mutate } = useMutationWrap<ClientTS>()
  const navigate = useNavigate()
  const [dataSet, setDataSet] = useClientStore((state) => [
    state.clientDateSet,
    state.setClientDataSet,
  ])

  const { isSuccess, isLoading } = useQueryWrap<ClientTS>(
    PartnersQueryKey.clientDetail(id as string),
    () =>
      Instance.get(
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('client', id as string)
      ),
    {
      onSuccess: (dataInput: any) => {
        setDataSet(dataInput)
      },
      enabled: !!id,
    }
  )

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
  }, [isLoading, isSuccess])

  const onSubmit = (inputData: FieldValues) => {
    mutate(
      Instance.patch(
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('client', id as string),
        inputData
      ),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.MDM.PARTNERS.UPDATE_CLIENT)
          navigate(`${To.MDMPartnersClient}/${id}`)
        },
      }
    )
  }

  return (
    <Page>
      <SubHeader
        title={'매출처 수정'}
        saveButton={{
          type: 'submit',
          form: 'clientUpdateForm',
          sbkind: 'pages/MDM/Partners/Client/Detail',
        }}
      />
      <PartnersDataLayer<ClientTS>
        type={'client'}
        defaultValues={dataSet}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default ClientUpdatePage
