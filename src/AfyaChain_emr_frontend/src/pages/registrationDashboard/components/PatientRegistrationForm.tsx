import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4 text-[#2563EB]">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const PatientRegistrationForm = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow-lg">
      <FormSection title="Personal Information">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">SSN</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
      </FormSection>

      <FormSection title="Insurance Information">
        <div>
          <label className="block text-sm font-medium mb-1">Provider</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Policy Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
      </FormSection>

      <FormSection title="Emergency Contact">
        <div>
          <label className="block text-sm font-medium mb-1">Contact Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Phone</label>
          <input
            type="tel"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
        </div>
      </FormSection>

      
    </form>
  );
};

export default PatientRegistrationForm;