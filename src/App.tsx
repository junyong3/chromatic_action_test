import useAuthEffect from '@hooks/useAuthEffect'
import { useAuthStore } from '@stores/auth.store'
import Viewport from './app/viewPort/Viewport'
import ThemeContainer from './containers/theme/ThemeContainer'

function App() {
  const isAuthEffectLoading = useAuthStore((state) => state.isAuthEffectLoading)

  useAuthEffect()

  if (isAuthEffectLoading) return null

  return (
    <ThemeContainer>
      <div id="app">
        <Viewport></Viewport>
      </div>
    </ThemeContainer>
  )
}

export default App
