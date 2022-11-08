import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import React from 'react'
import ReviewFormData from '@domain/Commerce/pages/Review/Detail/Detail/ReviewFormData'

function ReviewDetailPage() {
  return (
    <Page>
      <SubHeader title={'리뷰 상세'} />
      <ReviewFormData />
    </Page>
  )
}

export default ReviewDetailPage
