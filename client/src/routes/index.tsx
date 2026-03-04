import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import PrivateRoute from './private-route'
import PublicRoute from './public-route'

import LoginPage from '@/features/auth/pages/login'
import RegisterPage from '@/features/auth/pages/register'
import DashboardPage from '@/features/dashboard/pages/dashboard'
import PaymentsPage from '@/features/payments/pages/payments'
import PropertiesPage from '@/features/properties/pages/properties'

import { AppLayout } from '@/components/layout/app-layout'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/entrar" />} />

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
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pagamentos" element={<PaymentsPage />} />
        <Route path="/propriedades" element={<PropertiesPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
