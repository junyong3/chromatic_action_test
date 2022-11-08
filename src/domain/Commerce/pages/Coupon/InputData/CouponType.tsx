import Typography from '@components/Typography'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import { Box } from '@mui/material'
import { InputDataProps } from '../Props'

function CouponType({ disabled = false }: InputDataProps) {
  const couponTypeCheckboxList = [
    {
      label: '판매가 할인',
      id: 'discountPrice',
    },
    {
      label: '장바구니 할인',
      id: 'discountCart',
    },
    {
      label: '상품 증정',
      id: 'giftProduct',
    },
    {
      label: '무료배송',
      id: 'freeDelivery',
    },
    {
      label: '기타',
      id: 'etc',
    },
  ]

  return (
    <Box pt={4}>
      <Typography required variant="subtitle2" mb={1}>
        쿠폰 종류
      </Typography>
      <RadioButtonGroupElement
        name={'couponType'}
        row
        options={couponTypeCheckboxList}
        disabled={disabled}
      />
    </Box>
  )
}

export default CouponType
