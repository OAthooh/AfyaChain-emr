import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, MapPin, Activity, Heart, AlertCircle } from 'lucide-react';

interface PatientInfo {
  id: string;
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    nationalId: string;
    occupation: string;
    maritalStatus: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  medicalInfo: {
    allergies: string[];
    chronicConditions: string[];
    currentMedications: {
      name: string;
      dosage: string;
      frequency: string;
    }[];
    bloodPressure: string;
    weight: string;
    height: string;
    bmi: string;
  };
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
}

export function PatientInfoRecords() {
  const [patientInfo] = useState<PatientInfo>({
    id: "PT001",
    personalInfo: {
      fullName: "John Doe",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      bloodType: "O+",
      nationalId: "12345678",
      occupation: "Software Engineer",
      maritalStatus: "Married"
    },
    contactInfo: {
      email: "john.doe@email.com",
      phone: "+254 712 345 678",
      address: "123 Kimathi Street, Nairobi",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "+254 723 456 789"
      }
    },
    medicalInfo: {
      allergies: ["Penicillin", "Peanuts"],
      chronicConditions: ["Asthma"],
      currentMedications: [
        {
          name: "Ventolin",
          dosage: "100mcg",
          frequency: "As needed"
        },
        {
          name: "Vitamin D",
          dosage: "1000 IU",
          frequency: "Daily"
        }
      ],
      bloodPressure: "120/80",
      weight: "75 kg",
      height: "175 cm",
      bmi: "24.5"
    },
    insuranceInfo: {
      provider: "NHIF",
      policyNumber: "NHIF123456",
      expiryDate: "2024-12-31"
    }
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Patient Information</h1>
        <p className="text-gray-600">View and manage patient details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="font-medium">{patientInfo.personalInfo.fullName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium">{patientInfo.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="font-medium">{patientInfo.personalInfo.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Blood Type</label>
                <p className="font-medium">{patientInfo.personalInfo.bloodType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">National ID</label>
                <p className="font-medium">{patientInfo.personalInfo.nationalId}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Occupation</label>
                <p className="font-medium">{patientInfo.personalInfo.occupation}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Marital Status</label>
                <p className="font-medium">{patientInfo.personalInfo.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold">Contact Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{patientInfo.contactInfo.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium">{patientInfo.contactInfo.phone}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <p className="font-medium">{patientInfo.contactInfo.address}</p>
            </div>
            <div className="border-t pt-3">
              <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
              <div className="mt-2 space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Name:</span> {patientInfo.contactInfo.emergencyContact.name}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Relationship:</span> {patientInfo.contactInfo.emergencyContact.relationship}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Phone:</span> {patientInfo.contactInfo.emergencyContact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold">Medical Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Allergies</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientInfo.medicalInfo.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Chronic Conditions</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientInfo.medicalInfo.chronicConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Current Medications</label>
              <div className="mt-1 space-y-2">
                {patientInfo.medicalInfo.currentMedications.map((medication, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">{medication.name}</p>
                    <p className="text-sm text-gray-600">
                      {medication.dosage} - {medication.frequency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Blood Pressure</label>
                <p className="font-medium">{patientInfo.medicalInfo.bloodPressure}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">BMI</label>
                <p className="font-medium">{patientInfo.medicalInfo.bmi}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold">Insurance Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-500">Insurance Provider</label>
              <p className="font-medium">{patientInfo.insuranceInfo.provider}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Policy Number</label>
              <p className="font-medium">{patientInfo.insuranceInfo.policyNumber}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Expiry Date</label>
              <p className="font-medium">{patientInfo.insuranceInfo.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}