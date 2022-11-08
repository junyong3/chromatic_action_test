import { useMutationWrap2 } from '@queries/useMutation'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useCategoryStore } from '@stores/category.store'
import { FormProvider, useForm } from 'react-hook-form'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { queryClient } from '@queries/client'
import { To } from '@routes/To'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { Grid } from '@mui/material'
import BrandName from '@domain/Commerce/pages/Category/Brand/InputData/BrandName'
import ImageURL from '@domain/Commerce/pages/Category/Brand/InputData/ImageURL'
import ExposureState from '@domain/Commerce/pages/Category/Brand/InputData/ExposureState'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { brandCategoryUpdate } from '@domain/Commerce/pages/Category/Brand/query'
import {
  BrandCategoryDto,
  BrandCategoryKey,
  BrandRenderTree,
} from '@domain/Commerce/pages/Category/Brand/Props'
import BrandCategoryTreeView from '@domain/Commerce/pages/Category/Brand/BrandCategoryTreeView'
import { Status } from '@domain/Commerce/pages/Category/Brand/Props'
import ProductCategory from '@domain/Commerce/pages/Category/Brand/InputData/ProductCategory'

function BrandCategory() {
  const { mutate: update } =
    useMutationWrap2<BrandCategoryDto>(brandCategoryUpdate)
  const navigate = useNavigate()
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState<boolean>(false)
  const [selectedNodeId, selectedNode, categoryList] = useCategoryStore(
    (state) => [state.selectedNodeId, state.selectedNode, state.categoryList]
  )

  const methods = useForm<BrandRenderTree>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      imageUrl: '',
      productCategoryId: undefined,
      status: Status.disabled,
    },
  })

  const { isValid } = methods.formState

  const reFormattingData = (list: any[], params: BrandRenderTree) => {
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
        void queryClient.invalidateQueries(BrandCategoryKey.list)
        setIsOpenSaveDialog(false)
        navigate(`${To.CommerceBrandCategory}`)
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
        title={'브랜드 카테고리 관리'}
        saveButton={{
          onClick: () => setIsOpenSaveDialog(true),
          disabled: !isValid,
        }}
      />

      <FormProvider {...methods}>
        <form id={'brandCategoryForm'} onSubmit={onSubmit}>
          <Grid container columnSpacing={3} py={4}>
            <Grid item xs={4}>
              <BrandCategoryTreeView />
            </Grid>
            {selectedNodeId ? (
              <Grid item xs={8}>
                <BrandName />
                <ImageURL />
                <ProductCategory />
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
              form="brandCategoryForm"
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

export default BrandCategory
