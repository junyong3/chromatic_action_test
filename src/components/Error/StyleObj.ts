import styled from '@emotion/styled'
export const ErrorBase = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-content: center;
  justify-content: center;
  color: #000;
  font-size: 12px;
  padding: 14px;
  .msg {
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: 8px;
    text-align: center;
    .icon {
      flex: none;
    }
  }
  .retry {
    flex: 1;
    .retry-button {
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
`
