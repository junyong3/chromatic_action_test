import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import PartnersDataLayer from '@domain/MDM/pages/Partners/InputData/PartnersDataLayer'
import { useClientStore } from '@stores/MDM/Partners/client.store'
import { useMutationWrap } from '@queries/useMutation'
import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import SnackbarService from '@services/SnackbarService'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { MSG } from '@src/constants/MessageCode/msg'

function ClientCreatePage() {
  const { mutate } = useMutationWrap<{ clientId: string }>()
  const navigate = useNavigate()
  const [dataSet] = useClientStore((state) => [state.clientDateSet])

  const onSubmit = (inputData: FieldValues) => {
    mutate(
      Instance.post(MDM_PARTNERS_API_PATH.CREATE_PARTNERS('client'), inputData),
      {
        onSuccess: ({ data }) => {
          SnackbarService.show(MSG.SUCCESS.MDM.PARTNERS.ADD_CLIENT)
          navigate(`${To.MDMPartnersClient}/${data.clientId}`)
        },
      }
    )
  }
  return (
    <Page>
      <SubHeader
        title={'매출처 추가'}
        saveButton={{
          type: 'submit',
          form: 'partnersDataLayerForm',
          sbkind: 'pages/MDM/Partners/Client/List',
        }}
      />
      <PartnersDataLayer
        type={'client'}
        defaultValues={dataSet}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default ClientCreatePage
