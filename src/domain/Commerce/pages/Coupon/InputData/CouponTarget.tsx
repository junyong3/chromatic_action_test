import { useFormContext } from 'react-hook-form'
import Typography from '@components/Typography'
import { Box, Stack } from '@mui/material'
import InputSelect from '@components/Select/InputSelect'
import Button from '@components/Button'
import TextFieldElement from '@components/TextField/InputTextField'
import React, { useEffect } from 'react'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
import { useCouponStore } from '@stores/Commerce/Coupon/coupon.store'
import { InputDataProps } from '../Props'

function CouponTarget({ disabled = false }: InputDataProps) {
  const { watch, setValue } = useFormContext()
  const [
    setIsOpenCustomerRegisterDialog,
    setIsOpenProductRegisterDialog,
    setIsOpenCategoryRegisterDialog,
    targetCustomerList,
    targetProductList,
    targetCategoryList,
    targetProductExcept,
    targetCategoryExcept,
  ] = useCouponStore((state) => [
    state.setIsOpenCustomerRegisterDialog,
    state.setIsOpenProductRegisterDialog,
    state.setIsOpenCategoryRegisterDialog,
    state.targetCustomerList,
    state.targetProductList,
    state.targetCategoryList,
    state.targetProductExcept,
    state.targetCategoryExcept,
  ])

  const onClickRegisterCustomer = () => {
    setIsOpenCustomerRegisterDialog(true)
  }

  const onClickRegisterProductOrCategory = () => {
    if (watch('target.product.type') === 'someProduct') {
      setIsOpenProductRegisterDialog(true)
    } else if (watch('target.product.type') === 'someCategory') {
      setIsOpenCategoryRegisterDialog(true)
    }
  }

  useEffect(() => {
    setValue('target.product.someProduct.list', targetProductList)
    setValue('target.product.someProduct.count', targetProductList.length)
    setValue('target.product.someProduct.except', targetProductExcept)
  }, [setValue, targetProductList, targetProductExcept])

  useEffect(() => {
    setValue('target.product.someCategory.list', targetCategoryList)
    setValue('target.product.someCategory.count', targetCategoryList.length)
    setValue('target.product.someCategory.except', targetCategoryExcept)
  }, [setValue, targetCategoryExcept, targetCategoryList])

  useEffect(() => {
    setValue('target.customer.list', targetCustomerList)
    setValue('target.customer.count', targetCustomerList.length)
  }, [setValue, targetCustomerList])

  return (
    <>
      <Box pt={4}>
        <Typography variant="subtitle2">대상 고객 등록</Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={1.5} pt={1}>
          <InputSelect
            name={'target.customer.type'}
            options={[
              { value: 'some', label: '일부 회원' },
              { value: 'all', label: '전체 회원' },
            ]}
            disabled={disabled}
            sx={{ width: 150 }}
          />
          <Button
            color={'primary'}
            variant={'contained'}
            size={'medium'}
            sx={{ marginLeft: '20px' }}
            disabled={disabled || watch('target.customer.type') === 'all'}
            onClick={onClickRegisterCustomer}
          >
            등록하기
          </Button>
        </Stack>
        {watch('target.customer.type') !== 'all' ? (
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={1.5}
            sx={{ marginTop: '8px' }}
          >
            <TextFieldElement
              name={'target.customer.count'}
              disabled
              sx={{ width: 150 }}
            />
            <Typography
              variant={'body1'}
              color={disabled ? 'gray.light' : 'gray'}
            >
              명 회원 등록
            </Typography>
          </Stack>
        ) : null}
      </Box>

      <Box pt={4}>
        <Typography variant="subtitle2">대상 상품 등록</Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={1.5} pt={1}>
          <InputSelect
            name={'target.product.type'}
            options={[
              { value: 'someProduct', label: '일부 상품' },
              { value: 'someCategory', label: '일부 카테고리' },
              { value: 'allProduct', label: '전체 상품' },
            ]}
            disabled={disabled}
            sx={{ width: 150 }}
          />
          <Button
            color={'primary'}
            variant={'contained'}
            size={'medium'}
            sx={{ marginLeft: '20px' }}
            disabled={disabled || watch('target.product.type') === 'allProduct'}
            onClick={onClickRegisterProductOrCategory}
          >
            등록하기
          </Button>
        </Stack>
        {watch('target.product.type') !== 'allProduct' ? (
          <Stack direction={'row'} alignItems={'center'} spacing={1.5} pt={1}>
            {watch('target.product.type') === 'someProduct' ? (
              <>
                <TextFieldElement
                  name={'target.product.someProduct.count'}
                  disabled
                  sx={{ width: 150 }}
                />
                <Typography
                  variant={'body1'}
                  color={disabled ? 'gray.light' : 'gray'}
                >
                  {watch('target.product.someProduct.except')
                    ? '개 상품 제외'
                    : '개 상품 등록'}
                </Typography>
              </>
            ) : null}
            {watch('target.product.type') === 'someCategory' ? (
              <>
                <TextFieldElement
                  name={'target.product.someCategory.count'}
                  disabled
                  sx={{ width: 150 }}
                />
                <Typography variant={'body1'}>
                  {watch('target.product.someCategory.except')
                    ? '개 카테고리 제외'
                    : '개 카테고리 등록'}
                </Typography>
              </>
            ) : null}
          </Stack>
        ) : null}
      </Box>

      <Box pt={4}>
        <Typography variant="subtitle2">상품 할인 제한 조건</Typography>
        <RadioButtonGroupElement
          name={'productDiscountRestrictions'}
          options={[
            { label: '없음', id: 'none' },
            { label: '쿠폰 당 1개 수량 할인', id: '1QuantityDiscount' },
          ]}
          disabled={disabled}
        />
      </Box>
    </>
  )
}

export default CouponTarget
