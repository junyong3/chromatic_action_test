import { SubHeader } from '@compositions/Header'
import Page from '@src/components/Page'
import React, { useEffect, useState } from 'react'
import ProductCategoryTreeView from '@domain/Commerce/pages/Category/Product/ProductCategoryTreeView'
import { Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import CategoryName from '@domain/Commerce/pages/Category/Product/InputData/CategoryName'
import ImageURL from '@domain/Commerce/pages/Category/Product/InputData/ImageURL'
import ExposureState from '@domain/Commerce/pages/Category/Product/InputData/ExposureState'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { useMutationWrap2 } from '@queries/useMutation'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { queryClient } from '@queries/client'
import {
  ProductCategoryDto,
  ProductCategoryKey,
  ProductRenderTree,
  Status,
} from '@domain/Commerce/pages/Category/Product/Props'
import { To } from '@routes/To'
import { useNavigate } from 'react-router-dom'
import { useCategoryStore } from '@stores/category.store'
import { productCategoryUpdate } from '@domain/Commerce/pages/Category/Product/query'

function ProductCategory() {
  const { mutate: update } = useMutationWrap2<ProductCategoryDto>(
    productCategoryUpdate
  )
  const navigate = useNavigate()
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState<boolean>(false)
  const [selectedNodeId, selectedNode, categoryList] = useCategoryStore(
    (state) => [state.selectedNodeId, state.selectedNode, state.categoryList]
  )

  const methods = useForm<ProductRenderTree>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      imageUrl: '',
      status: Status.disabled,
      displayStartAt: '',
      displayEndAt: '',
    },
  })

  const { isValid } = methods.formState

  const reFormattingData = (list: any[], params: ProductRenderTree) => {
    const idx = list.findIndex((d) => d.id === params.id)
    if (idx > -1) {
      if (params.type === 'new') {
        delete params.id
      }

      list.splice(idx, 1)
      list.splice(idx, 0, params)
    } else {
      list.forEach((d) => {
        reFormattingData(d.subCategories ?? [], params)
      })
    }
  }

  const onSubmit = methods.handleSubmit((params) => {
    LoadingService.show()

    reFormattingData(categoryList, params)

    update(categoryList, {
      onSuccess: () => {
        SnackbarService.show(MSG.SUCCESS.SAVE_CATEGORY)
        void queryClient.invalidateQueries(ProductCategoryKey.list)
        setIsOpenSaveDialog(false)
        navigate(`${To.CommerceProductCategory}`)
        methods.reset(params)
      },
      onSettled: () => {
        LoadingService.close()
      },
    })
  })

  useEffect(() => {
    if (selectedNode) {
      methods.reset(selectedNode)
    }
  }, [selectedNode])

  return (
    <Page>
      <SubHeader
        title={'상품 카테고리 관리'}
        saveButton={{
          onClick: () => setIsOpenSaveDialog(true),
          disabled: !isValid,
        }}
      />

      <FormProvider {...methods}>
        <form id={'productCategoryForm'} onSubmit={onSubmit}>
          <Grid container columnSpacing={3} py={4}>
            <Grid item xs={4}>
              <ProductCategoryTreeView />
            </Grid>
            {selectedNodeId ? (
              <Grid item xs={8}>
                <CategoryName />
                <ImageURL />
                <ExposureState />
              </Grid>
            ) : null}
          </Grid>
        </form>
      </FormProvider>

      <Dialog
        size="sm"
        open={isOpenSaveDialog}
        title="확인"
        onClose={() => setIsOpenSaveDialog(false)}
        content={'설정된 정보로 저장하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsOpenSaveDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogSaveButton'}
              type="submit"
              form="productCategoryForm"
              onClick={() => setIsOpenSaveDialog(false)}
            >
              저장
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default ProductCategory
