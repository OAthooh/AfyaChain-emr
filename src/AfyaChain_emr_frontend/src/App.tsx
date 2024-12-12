// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { Header } from './components/Header';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';

// Doctor Dashboard
import { DashboardLayout } from './pages/doctorDashboard/DashboardLayout';
import { DashboardOverview } from './pages/doctorDashboard/DashboardOverview';
import { PatientsPage } from './pages/doctorDashboard/PatientsPage';
import { AppointmentsPage } from './pages/doctorDashboard/AppointmentsPage';
import { PrescriptionsPage } from './pages/doctorDashboard/PrescriptionsPage';
import { AnalyticsPage } from './pages/doctorDashboard/AnalyticsPage';
import { MessagesPage } from './pages/doctorDashboard/MessagesPage';

// Registration Dashboard
import { RegistrationDashboardLayout } from './pages/registrationDashboard/DashboardLayout';
import PatientQueue from './pages/registrationDashboard/components/PatientQue';
import RegistrationPage from './pages/registrationDashboard/SidebarPages/RegistrationPage';
import AppointmentPage from './pages/registrationDashboard/SidebarPages/AppointmentPage';
import DepartmentPage from './pages/registrationDashboard/SidebarPages/DepartMentPage';
import RecordPage from './pages/registrationDashboard/SidebarPages/RecordPage';
import SettingsPage from './pages/registrationDashboard/SidebarPages/SettingsPage';
import { HealthRecordsLayout } from './pages/records/HealthRecordsLayout';
import { HealthRecordsPage } from './pages/records/HealthRecordsPage';
import { ReportsRecords } from './pages/records/ReportsRecords';

// Patient Dashboard
import { PatientDashboardLayout } from './pages/patientDashboard/PatientDashboardLayout';
import { PatientOverview } from './pages/patientDashboard/PatientOverview';
import { PatientAppointments } from './pages/patientDashboard/PatientAppointments';
import { PatientRecords } from './pages/patientDashboard/PatientRecords';
import { PatientMedications } from './pages/patientDashboard/PatientMedications';
import { PatientResults } from './pages/patientDashboard/PatientResults';
import { PatientTracking } from './pages/patientDashboard/PatientTracking';
import { PatientMessages } from './pages/patientDashboard/PatientMessages';
import { PatientBilling } from './pages/patientDashboard/PatientBilling';
import { PatientEducation } from './pages/patientDashboard/PatientEducation';
import { BillingLayout } from './pages/billingDashboard/BillingLayout';
import { BillingOverview } from './pages/billingDashboard/sidebarPages/BillingOverview';
import { InvoiceTable } from './pages/billingDashboard/sidebarPages/InvoiceTable';
import { TransactionList } from './pages/billingDashboard/sidebarPages/TransactionList';
import { ReportsPage } from './pages/billingDashboard/sidebarPages/ReportsPage';
import { BillingSettings } from './pages/billingDashboard/sidebarPages/BillingSettings';

// Patient Integration Components
import { HealthAnalytics } from './pages/patientDashboard/components/analytics/HealthAnalytics';
import { DeviceSync } from './pages/patientDashboard/components/intergration/DeviceSync';
import { TelemedicineIntegration } from './pages/patientDashboard/components/intergration/TelemedicineIntegration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Header and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Health Records Routes */}
        <Route path="/health-records" element={<HealthRecordsLayout />}>
        <Route index element={<HealthRecordsPage activeSection={0} />} />
          <Route path="appointments" element={<HealthRecordsPage activeSection={1} />} />
          <Route path="reports" element={<ReportsRecords />} />
          <Route path="patient-info" element={<HealthRecordsPage activeSection={3} />} />
          <Route path="compliance" element={<HealthRecordsPage activeSection={4} />} />
          <Route path="analytics" element={<HealthRecordsPage activeSection={5} />} />
          <Route path="help" element={<HealthRecordsPage activeSection={6} />} />
          <Route path="settings" element={<HealthRecordsPage activeSection={7} />} />
          <Route path="notifications" element={<HealthRecordsPage activeSection={8} />} />
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

        {/* Patient Dashboard Routes */}
        <Route path="/patient/*" element={<PatientDashboardLayout />}>
          <Route index element={<PatientOverview />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="records" element={<PatientRecords />} />
          <Route path="medications" element={<PatientMedications />} />
          <Route path="results" element={<PatientResults />} />
          <Route path="tracking" element={<PatientTracking />} />
          <Route path="messages" element={<PatientMessages />} />
          <Route path="billing" element={<PatientBilling />} />
          <Route path="education" element={<PatientEducation />} />
          
          {/* New Integration Routes */}
          <Route path="analytics" element={<HealthAnalytics />} />
          <Route path="devices" element={<DeviceSync />} />
          <Route path="telemedicine" element={<TelemedicineIntegration />} />
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