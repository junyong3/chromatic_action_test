import useUpdateEffect from '@hooks/useUpdateEffect'
import { Grid } from '@mui/material'
import { useCallback, useRef } from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import { GoodsTS, SellingPriceTS } from '../Props'
import AvailableStartDate from './AvailableStartDate'
import GoodsCode from './GoodsCode'
import GoodsModal, { GoodsModalRefProps } from './GoodsModal'
import GoodsName from './GoodsName'
import GoodsCustomer from './GoodsCustomer'
import Price from './Price'

interface SellingPriceDataLayerProps {
  pageType: 'detail' | 'create' | 'update'
  type: GoodsType
  defaultValues: SellingPriceTS
  onSubmit?: (inputData: FieldValues) => void
}

function SellingPriceDataLayer({
  pageType,
  type,
  defaultValues,
  onSubmit,
}: SellingPriceDataLayerProps) {
  const goodsModalRef = useRef<GoodsModalRefProps>(null)
  const openGoodsModal = useCallback(() => {
    if (goodsModalRef.current) goodsModalRef.current.open()
  }, [])

  const methods = useForm<SellingPriceTS>({
    mode: 'onBlur',
    defaultValues,
  })

  useUpdateEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues])

  const onSelectByGoodsModal = (selected: GoodsTS) => {
    methods.setValue('goods', selected)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          id="sellingPriceDataLayerForm"
          onSubmit={onSubmit && methods.handleSubmit(onSubmit)}
        >
          <Grid container rowSpacing={4} spacing={3} columnSpacing={3} py={4}>
            <GoodsCode
              type={type}
              disabled={pageType !== 'create'}
              openGoodsModal={openGoodsModal}
            />
            <GoodsName type={type} disabled={pageType !== 'create'} />
            <Grid item xs={4} />

            <GoodsCustomer disabled={pageType !== 'create'} />
            <Grid item xs={8} />

            <Price disabled={pageType === 'detail'} />
            <AvailableStartDate disabled={pageType === 'detail'} />
          </Grid>
        </form>
      </FormProvider>

      <GoodsModal
        ref={goodsModalRef}
        type={type}
        onSelect={onSelectByGoodsModal}
      />
    </>
  )
}

export default SellingPriceDataLayer
