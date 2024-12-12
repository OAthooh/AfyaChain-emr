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
import { RegistrationDashboardLayout } from './pages/registrationDashboard/DashboardLayout';
import PatientQueue from './pages/registrationDashboard/components/PatientQue';
import RegistrationPage from './pages/registrationDashboard/SidebarPages/RegistrationPage';
import AppointmentPage from './pages/registrationDashboard/SidebarPages/AppointmentPage';
import DepartmentPage from './pages/registrationDashboard/SidebarPages/DepartMentPage';
import RecordPage from './pages/registrationDashboard/SidebarPages/RecordPage';
import SettingsPage from './pages/registrationDashboard/SidebarPages/SettingsPage';

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
        <Route path="/registration/*" element={<RegistrationDashboardLayout />}>
          <Route index element={<PatientQueue />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="appointments" element={<AppointmentPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="records" element={<RecordPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;