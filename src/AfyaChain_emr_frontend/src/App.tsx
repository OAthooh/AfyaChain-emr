import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { Header } from './components/Header';
import { DashboardLayout } from './pages/doctorDashboard/DashboardLayout';
import { DashboardOverview } from './pages/doctorDashboard/DashboardOverview';
import { PatientsPage } from './pages/doctorDashboard/PatientsPage';
import { AppointmentsPage } from './pages/doctorDashboard/AppointmentsPage';
import { PrescriptionsPage } from './pages/doctorDashboard/PrescriptionsPage';
import { AnalyticsPage } from './pages/doctorDashboard/AnalyticsPage';
import { MessagesPage } from './pages/doctorDashboard/MessagesPage';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';
import { RegistrationDashboardLayout } from './pages/registrationDashboard/DashboardLayout';
import PatientQueue from './pages/registrationDashboard/components/PatientQue';
import RegistrationPage from './pages/registrationDashboard/SidebarPages/RegistrationPage';
import AppointmentPage from './pages/registrationDashboard/SidebarPages/AppointmentPage';
import DepartmentPage from './pages/registrationDashboard/SidebarPages/DepartMentPage';
import RecordPage from './pages/registrationDashboard/SidebarPages/RecordPage';
import SettingsPage from './pages/registrationDashboard/SidebarPages/SettingsPage';
import { BillingLayout } from './pages/billingDashboard/BillingLayout';
import { BillingOverview } from './pages/billingDashboard/sidebarPages/BillingOverview';
import { InvoiceTable } from './pages/billingDashboard/sidebarPages/InvoiceTable';
import { TransactionList } from './pages/billingDashboard/sidebarPages/TransactionList';
import { ReportsPage } from './pages/billingDashboard/sidebarPages/ReportsPage';
import { BillingSettings } from './pages/billingDashboard/sidebarPages/BillingSettings';

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
           
        {/* Doctor Dashboard Routes */}
        <Route path="/doctor/*" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="prescriptions" element={<PrescriptionsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>

        {/* Registration Dashboard Routes */}
        <Route path="/registration/*" element={<RegistrationDashboardLayout />}>
          <Route index element={<PatientQueue />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="appointments" element={<AppointmentPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="records" element={<RecordPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Billing Dashboard Routes */}
        <Route path="/billing/*" element={<BillingLayout />}>
          <Route index element={<BillingOverview />} />
          <Route path="invoices" element={<InvoiceTable dateRange="7d" filters={{ status: 'all', search: '' }} onViewInvoice={() => {}} />} />
          <Route path="transactions" element={<TransactionList dateRange="7d" filters={{ status: 'all', paymentMethod: 'all', search: '' }} />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<BillingSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;