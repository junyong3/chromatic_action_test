import { Stack } from '@mui/material'
import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'
import Page from '@components/Page'
import ProductSearchBox from './List/ProductSearchBox'
import ProductDataGrid from './List/ProductDataGrid'

function ProductListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="제상품 목록 조회"
          button={{
            text: '제상품 생성',
            link: To.MDMGoodsProductCreate,
            sbkind: 'pages/MDM/Goods/Product/Create',
          }}
          navigation={{
            home: To.MDMHome,
            menuList: ['제상품 관리'],
          }}
        />
        <ProductSearchBox />
        <ProductDataGrid />
      </Stack>
    </Page>
  )
}

export default ProductListPage
