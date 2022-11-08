import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import PartnersDataLayer from '@domain/MDM/pages/Partners/InputData/PartnersDataLayer'
import { useVenderStore } from '@stores/MDM/Partners/vender.store'
import { useMutationWrap } from '@queries/useMutation'
import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import SnackbarService from '@services/SnackbarService'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { MSG } from '@src/constants/MessageCode/msg'

function VenderCreatePage() {
  const { mutate } = useMutationWrap<{ venderId: string }>()
  const navigate = useNavigate()
  const [dataInput] = useVenderStore((state) => [state.venderDateSet])

  const onSubmit = (inputData: FieldValues) => {
    mutate(
      Instance.post(MDM_PARTNERS_API_PATH.CREATE_PARTNERS('vender'), inputData),
      {
        onSuccess: ({ data }) => {
          SnackbarService.show(MSG.SUCCESS.MDM.PARTNERS.ADD_VENDER)
          navigate(`${To.MDMPartnersVender}/${data.venderId}`)
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
          sbkind: 'pages/MDM/Partners/Vender/List',
        }}
      />
      <PartnersDataLayer
        type={'vender'}
        defaultValues={dataInput}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default VenderCreatePage
