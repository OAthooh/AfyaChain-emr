import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { Header } from './components/Header';
import { DashboardLayout } from './pages/doctor/DashboardLayout';
import { DashboardOverview } from './pages/doctor/DashboardOverview';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Header and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth/*" element={
          <>
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
              </Routes>
            </main>
          </>
        } />
           
        {/* Doctor Dashboard Routes - No shared header */}
        <Route path="/doctor/*" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          {/* Add other dashboard routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;