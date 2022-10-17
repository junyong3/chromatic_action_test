import { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

function SearchFormRow({ children }: PropsWithChildren<any>) {
  return <SearchFormRowWrap>{children}</SearchFormRowWrap>
}

const SearchFormRowWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 6px;

  & + & {
    padding-top: 12px;
  }

  &:last-child {
    padding-bottom: 16px;
  }
`

export default SearchFormRow
