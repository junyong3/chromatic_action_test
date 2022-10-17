import Viewport from './app/viewPort/Viewport'
import ThemeContainer from './containers/theme/ThemeContainer'

function App() {
  return (
    <ThemeContainer>
      <div id="app">
        <Viewport></Viewport>
      </div>
    </ThemeContainer>
  )
}

export default App
