import { FieldValues } from 'react-hook-form'
import { Box, Stack } from '@mui/material'
import { To } from '@routes/To'
import Page from '@components/Page'
import { useMaterialPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/material.store'
import { ListHeader } from '@compositions/Header'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import PurchasePriceSearchBox from '../List/PurchasePriceSearchBox'
import MaterialPurchasePriceDataGrid from '../List/MaterialPurchasePriceDataGrid'
import PurchasePriceHistoryDataGrid from '../List/PurchasePriceHistoryDataGrid'

function MaterialPurchasePriceListPage() {
  const [searchCondition, setSearchCondition, selectPurchasePriceId] =
    useMaterialPurchasePriceStore((state) => [
      state.searchCondition,
      state.setSearchCondition,
      state.selectPurchasePriceId,
    ])

  const onSubmit = (inputData: FieldValues) => {
    setSearchCondition(inputData)
  }

  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="원부자재 구매 가격 목록 조회"
          button={{
            text: '원부자재 구매 가격 등록',
            link: To.MDMGoodsMaterialPurchasePriceCreate,
            sbkind: 'pages/MDM/Goods/MaterialPurchasePrice/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['원부자재 구매 가격 관리'],
          }}
        />

        <PurchasePriceSearchBox
          type={GoodsType.Material}
          onSubmit={onSubmit}
          defaultValues={searchCondition}
        />

        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={4}
        >
          <Box flexGrow={3}>
            <MaterialPurchasePriceDataGrid />
          </Box>
          <Box flexGrow={1}>
            <PurchasePriceHistoryDataGrid
              type={GoodsType.Material}
              purchasePriceId={selectPurchasePriceId}
            />
          </Box>
        </Stack>
      </Stack>
    </Page>
  )
}

export default MaterialPurchasePriceListPage
