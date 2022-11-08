import { FieldValues } from 'react-hook-form'
import { Box, Stack } from '@mui/material'
import { To } from '@routes/To'
import Page from '@components/Page'
import { useProductPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/product.store'
import { ListHeader } from '@compositions/Header'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import PurchasePriceSearchBox from '../List/PurchasePriceSearchBox'
import ProductPurchasePriceDataGrid from '../List/ProductPurchasePriceDataGrid'
import PurchasePriceHistoryDataGrid from '../List/PurchasePriceHistoryDataGrid'

function ProductPurchasePriceListPage() {
  const [searchCondition, setSearchCondition, selectPurchasePriceId] =
    useProductPurchasePriceStore((state) => [
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
          title="제상품 구매 가격 목록 조회"
          button={{
            text: '제상품 구매 가격 등록',
            link: To.MDMGoodsProductPurchasePriceCreate,
            sbkind: 'pages/MDM/Goods/ProductPurchasePrice/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['제상품 구매 가격 관리'],
          }}
        />

        <PurchasePriceSearchBox
          type={GoodsType.Product}
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
            <ProductPurchasePriceDataGrid />
          </Box>
          <Box flexGrow={1}>
            <PurchasePriceHistoryDataGrid
              type={GoodsType.Product}
              purchasePriceId={selectPurchasePriceId}
            />
          </Box>
        </Stack>
      </Stack>
    </Page>
  )
}

export default ProductPurchasePriceListPage
