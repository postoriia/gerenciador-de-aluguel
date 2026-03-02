import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './features/auth/pages/login.tsx'
import RegisterPage from './features/auth/pages/register.tsx'
import { AppProvider } from './provider'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="h-screen">
          <Routes>
            {/* Rota padrão redireciona para login */}
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rota para 404 ou outras páginas pode vir aqui */}
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
