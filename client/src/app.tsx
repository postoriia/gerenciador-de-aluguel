import Router from './routes'
import { AppProvider } from './provider'
import { Toaster } from 'sonner'

function App() {
  return (
    <AppProvider>
      <div className="h-screen">
        <Router />
        <Toaster richColors position="top-right" />
      </div>
    </AppProvider>
  )
}

export default App
