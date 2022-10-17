import { useEffect } from 'react'

const useBrowserBeforeUnload = (
  value: ((evt: BeforeUnloadEvent) => any) | string
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBeforeunload = (evt: BeforeUnloadEvent) => {
    let returnValue
    if (typeof value === 'function') {
      returnValue = value(evt)
    } else {
      returnValue = value
    }
    if (returnValue) {
      evt.preventDefault()
      evt.returnValue = returnValue
    }
    return returnValue
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload)
    return () => window.removeEventListener('beforeunload', handleBeforeunload)
  }, [handleBeforeunload])
}

export default useBrowserBeforeUnload
