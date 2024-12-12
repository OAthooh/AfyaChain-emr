import React from 'react';

export function HealthRecordsPage() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Your Health Records Dashboard</h2>
        <p className="text-gray-600">
          This dashboard provides a comprehensive overview of your health records, including recent activities, appointments, and more.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Name: John Doe</li>
            <li>Date of Birth: 01/01/1980</li>
            <li>Gender: Male</li>
            <li>Address: 123 Main St, Anytown</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: john.doe@example.com</li>
            <li>Insurance: ABC Health</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Records</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Progress Notes</li>
            <li>Admission Summaries</li>
            <li>Lab Results</li>
            <li>Radiology Reports</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointments and Visits</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Next Appointment: 02/15/2024</li>
            <li>Doctor: Dr. Smith</li>
            <li>Past Visits: 10</li>
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medications and Prescriptions</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Medication: Lipitor</li>
            <li>Dosage: 20mg</li>
            <li>Refill: Available</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Immunizations and Allergies</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Vaccination: Flu Shot</li>
            <li>Allergy: Penicillin</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications and Alerts</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Upcoming Appointment Reminder</li>
            <li>New Test Results Available</li>
          </ul>
        </div>
      </section>
    </div>
  );
}