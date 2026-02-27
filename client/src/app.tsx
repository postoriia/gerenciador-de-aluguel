import LoginPage from './features/auth/pages/login.tsx'
import { AppProvider } from './provider'

function App() {
  return (
    <AppProvider>
      <div className="h-screen">
        <LoginPage />
      </div>
    </AppProvider>
  )
}

export default App
