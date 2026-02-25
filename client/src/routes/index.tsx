import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PrivateRoute from './private-route'
import PublicRoute from './public-route'

import LoginPage from '@/features/auth/pages/login'
import RegisterPage from '@/features/auth/pages/register'
import DashboardPage from '@/features/dashboard/pages/dashboard'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/entrar"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/cadastrar"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default Router
