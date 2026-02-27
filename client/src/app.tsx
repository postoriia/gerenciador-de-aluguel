import Router from './routes'
import { AppProvider } from './provider'

function App() {
  return (
    <AppProvider>
      <div className="h-screen">
        <Router />
      </div>
    </AppProvider>
  )
}

export default App
