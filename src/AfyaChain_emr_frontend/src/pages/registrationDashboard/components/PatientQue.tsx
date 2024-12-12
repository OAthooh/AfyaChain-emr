import React from 'react';
import { mockPatients } from './MockData';
import { Patient } from '../types';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => (
  <div className="border p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-medium">{patient.name}</h4>
        <p className="text-sm text-gray-600">{patient.department}</p>
        {patient.doctor && <p className="text-sm text-gray-500">{patient.doctor}</p>}
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${
        patient.visitType === 'inpatient' 
          ? 'bg-red-100 text-red-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {patient.visitType}
      </span>
    </div>
  </div>
);

const PatientQueue: React.FC = () => {
  const waitingPatients = mockPatients.filter(p => p.status === 'waiting');
  const withDoctorPatients = mockPatients.filter(p => p.status === 'with-doctor');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#2563EB]">Waiting Room</h3>
        <div className="space-y-4">
          {waitingPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-[#2563EB]">With Doctor</h3>
        <div className="space-y-4">
          {withDoctorPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;