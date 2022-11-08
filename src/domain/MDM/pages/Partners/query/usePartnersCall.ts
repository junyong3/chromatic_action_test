import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import { useQueryWrap } from '@queries/useQuery'
import { KeyGoodsTS, PartnersQueryKey } from '../Props'

export const useKeyGoodsListCall = (params: { keyword: string }) => {
  return useQueryWrap<KeyGoodsTS[]>(
    PartnersQueryKey.keyGoodsList(params.keyword),
    () => Instance.get(MDM_PARTNERS_API_PATH.KEY_GOODS_LIST, params)
  )
}
