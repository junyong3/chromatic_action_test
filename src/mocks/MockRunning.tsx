import styled from '@emotion/styled'

const RunningWrap = styled.div`
  width: 200px;
  .RunningText {
    background: none;
    border: 0;
    padding: 0;
    position: fixed;
    z-index: 99999;
    display: inline-flex;
    font-size: 1em;
    margin: 0.5em;
    cursor: pointer;
    width: fit-content;
    bottom: 0;
    right: 0;
    color: red;
  }
`

function MockRunning() {
  return (
    <RunningWrap>
      <div className={`RunningText`}> Mock Api 사용중</div>
    </RunningWrap>
  )
}

export default MockRunning
