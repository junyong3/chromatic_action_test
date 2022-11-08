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
import { useVenderStore } from '@stores/MDM/Partners/vender.store'
import PartnersDataLayer from '@domain/MDM/pages/Partners/InputData/PartnersDataLayer'
import { PartnersQueryKey, VenderTS } from '@domain/MDM/pages/Partners/Props'
import { MSG } from '@src/constants/MessageCode/msg'

function VenderUpdatePage() {
  const { id } = useParams()
  const { mutate } = useMutationWrap<VenderTS>()
  const navigate = useNavigate()
  const [dataSet, setDataSet] = useVenderStore((state) => [
    state.venderDateSet,
    state.setVenderDataSet,
  ])

  const { isSuccess, isLoading } = useQueryWrap<VenderTS>(
    PartnersQueryKey.venderDetail(id as string),
    () =>
      Instance.get(
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('vender', id as string)
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
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('vender', id as string),
        inputData
      ),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.MDM.PARTNERS.UPDATE_VENDER)
          navigate(`${To.MDMPartnersVender}/${id}`)
        },
      }
    )
  }

  return (
    <Page>
      <SubHeader
        title={'매입처 수정'}
        saveButton={{
          type: 'submit',
          form: 'partnersDataLayerForm',
          sbkind: 'pages/MDM/Partners/Vender/Detail',
        }}
      />
      <PartnersDataLayer<VenderTS>
        type={'vender'}
        defaultValues={dataSet}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default VenderUpdatePage
