import InputTextField from '@components/TextField/InputTextField'
import { Grid, ImageList, ImageListItem, Skeleton, Stack } from '@mui/material'
import Typography from '@components/Typography'
import Button from '@components/Button'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'
import InputRadio from '@components/Radio/InputRadio'
import ReviewReportDataGrid from '@domain/Commerce/pages/Review/Detail/Detail/ReviewReportDataGrid'
import { useFormContext } from 'react-hook-form'
import BottomUpdateView from '@components/BottomUpdateView/BottomUpdateView'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import React, { Suspense } from 'react'

function ReviewDataLayer() {
  const { getValues } = useFormContext()
  const reviewType = [
    {
      label: '텍스트',
      id: 'textReview',
    },
    {
      label: '사진',
      id: 'imageReview',
    },
  ]

  const exposureType = [
    {
      label: '노출',
      id: 'exposure',
    },
    {
      label: '미노출',
      id: 'unexposure',
    },
  ]
  const navigate = useNavigate()
  const isImageReview = getValues('reviewType') === 'imageReview'

  const reviewImageList = getValues('imageList') || []
  const confirmText =
    getValues('isExposure') === 'unexposure' ? '노출' : '미노출'
  const { confirmOpen, ConfirmComp } = useConfirmDialog({
    addTitle: ' 노출 상태 변경',
    addContent: `해당 리뷰를 ${confirmText} 처리하시겠습니까?`,
    confirmText: confirmText,
    onConfirm: () => {
      console.log('수정')
      navigate(To.CommerceReviewList)
      // List 화면으로 이동
    },
  })
  return (
    <>
      <Grid container rowSpacing={4} columnSpacing={2} py={4}>
        {/*1*/}
        <Grid item xs={6}>
          <Typography mb={1} variant="subtitle2">
            상품명
          </Typography>
          <InputTextField
            name={'productName'}
            data-cy={'productName'}
            size={'small'}
            placeholder={'상품명'}
            disabled
            sx={{ width: '540px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography mb={1} variant="subtitle2">
            옵션명
          </Typography>
          <InputTextField
            name={'productOption'}
            data-cy={'productOption'}
            size={'small'}
            placeholder={'옵션명'}
            disabled
            sx={{ width: '340px' }}
          />
        </Grid>
        {/*2*/}
        <Grid item xs={3}>
          <Typography mb={1} variant="subtitle2">
            리뷰 작성 일시
          </Typography>
          <InputTextField
            name={'createDate'}
            data-cy={'createDate'}
            size={'small'}
            placeholder={'리뷰 작성 일시'}
            disabled
            sx={{ width: '240px' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography mb={1} variant="subtitle2">
            리뷰 종류
          </Typography>
          <InputRadio row disabled options={reviewType} name={'reviewType'} />
        </Grid>
        <Grid item xs={6}>
          <Typography mb={1} variant="subtitle2">
            노출 상태
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputRadio
              row
              disabled
              options={exposureType}
              name={'isExposure'}
            />
            <Button
              variant="contained"
              data-cy="addButton"
              onClick={() => {
                confirmOpen(true)
              }}
            >
              노출 상태 변경
            </Button>
          </Stack>
        </Grid>
        {/*3*/}
        <Grid item xs={3}>
          <Typography mb={1} variant="subtitle2">
            작성자
          </Typography>
          <InputTextField
            name={'userName'}
            data-cy={'userName'}
            size={'small'}
            placeholder={'작성자'}
            disabled
            sx={{ width: '240px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography mb={1} variant="subtitle2">
            UID
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputTextField
              name={'uid'}
              data-cy={'uid'}
              size={'small'}
              disabled
              sx={{ width: '340px' }}
            />
            <Button
              variant="outlined"
              color={'gray'}
              data-cy="Pagelink"
              onClick={() => {
                console.log('주문 상세 page 이동')
              }}
            >
              주문 상세
            </Button>
          </Stack>
        </Grid>
        {/*4*/}
        {isImageReview ? (
          <Grid item xs={12}>
            <Typography mb={1} variant="subtitle2">
              리뷰 사진
            </Typography>
            <ImageList
              variant={'masonry'}
              sx={{ width: '100%', height: '100%' }}
              gap={8}
              cols={5}
              rowHeight={200}
            >
              {reviewImageList.map((item: string, ix: number) => (
                <ImageListItem
                  key={ix}
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.open(item, '_blank')
                  }}
                >
                  {item ? (
                    <img
                      alt={'review'}
                      src={`${item}`}
                      loading="lazy"
                      width={'170'}
                      height={'170'}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={170}
                      height={170}
                    />
                  )}
                </ImageListItem>
              ))}
              {isImageReview && reviewImageList.length ? null : (
                <ImageNotSupportedIcon
                  sx={{
                    width: '170px',
                    height: '170px',
                  }}
                />
              )}
            </ImageList>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography mb={1} variant="subtitle2">
            리뷰 내용
          </Typography>
          <InputTextField
            name={'reviewContent'}
            data-cy={'reviewContent'}
            size={'small'}
            placeholder={'리뷰 내용'}
            multiline
            rows={6}
            disabled
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography mb={1} variant="subtitle2">
            신고 내역
          </Typography>
          <ReviewReportDataGrid />
        </Grid>
      </Grid>
      <BottomUpdateView
        userId={getValues('userName')}
        updateTime={getValues('updateDate')}
      />
      <ConfirmComp />
    </>
  )
}
export default ReviewDataLayer
