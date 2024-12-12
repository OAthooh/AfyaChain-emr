import React from 'react';

const RegistrationDetails: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-6 text-[#2563EB] border-b pb-3">Visit Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-semibold mb-2 text-gray-700 group-hover:text-[#2563EB] transition-colors">Visit Type</label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white hover:border-[#2563EB] transition-all">
            <option value="outpatient">Outpatient</option>
            <option value="inpatient">Inpatient</option>
          </select>
        </div>
        
        <div className="group">
          <label className="block text-sm font-semibold mb-2 text-gray-700 group-hover:text-[#2563EB] transition-colors">Department</label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white hover:border-[#2563EB] transition-all">
            <option value="general">General Medicine</option>
            <option value="surgery">Surgery</option>
            <option value="maternity">Maternity</option>
            <option value="pediatrics">Pediatrics</option>
          </select>
        </div>

        <div className="group">
          <label className="block text-sm font-semibold mb-2 text-gray-700 group-hover:text-[#2563EB] transition-colors">Special Accommodations</label>
          <input
            type="text"
            placeholder="e.g., Wheelchair access"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] hover:border-[#2563EB] transition-all placeholder-gray-400"
          />
        </div>

        <div className="group">
          <label className="block text-sm font-semibold mb-2 text-gray-700 group-hover:text-[#2563EB] transition-colors">Pre-admission Tests Required</label>
          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white hover:border-[#2563EB] transition-all">
            <option value="none">None Required</option>
            <option value="blood">Blood Work</option>
            <option value="xray">X-Ray</option>
            <option value="multiple">Multiple Tests</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;