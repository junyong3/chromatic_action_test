import { FieldValues } from 'react-hook-form'
import { Box, Stack } from '@mui/material'
import { To } from '@routes/To'
import Page from '@components/Page'
import { ListHeader } from '@compositions/Header'
import { useProductSellingPriceStore } from '@stores/MDM/Goods/SellingPrice/product.store'
import SellingPriceSearchBox from '../List/SellingPriceSearchBox'
import ProductSellingPriceDataGrid from '../List/ProductSellingPriceDataGrid'
import SellingPriceHistoryDataGrid from '../List/SellingPriceHistoryDataGrid'

function ProductSellingPriceListPage() {
  const [searchCondition, setSearchCondition, selectSellingPriceId] =
    useProductSellingPriceStore((state) => [
      state.searchCondition,
      state.setSearchCondition,
      state.selectSellingPriceId,
    ])

  const onSubmit = (inputData: FieldValues) => {
    setSearchCondition(inputData)
  }
  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="제상품 판매 가격 목록 조회"
          button={{
            text: '제상품 판매 가격 등록',
            link: To.MDMGoodsProductSellingPriceCreate,
            sbkind: 'pages/MDM/Goods/ProductSellingPrice/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['제상품 판매 가격 관리'],
          }}
        />
        <SellingPriceSearchBox
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
            <ProductSellingPriceDataGrid />
          </Box>
          <Box flexGrow={1}>
            <SellingPriceHistoryDataGrid
              sellingPriceId={selectSellingPriceId}
            />
          </Box>
        </Stack>
      </Stack>
    </Page>
  )
}

export default ProductSellingPriceListPage
