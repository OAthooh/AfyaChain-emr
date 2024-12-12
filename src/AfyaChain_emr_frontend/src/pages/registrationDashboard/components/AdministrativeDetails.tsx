const AdministrativeDetailsForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#2563EB] mb-6">Administrative Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Date and Time of Registration</label>
          <input 
            type="datetime-local" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Method of Arrival</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white transition-colors">
            <option value="walk-in">Walk-in</option>
            <option value="ambulance">Ambulance</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Type of Visit</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white transition-colors">
            <option value="emergency">Emergency</option>
            <option value="scheduled">Scheduled</option>
            <option value="follow-up">Follow-up</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Referring Physician</label>
          <input 
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            placeholder="Enter physician name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Previous Hospital Visits</label>
          <input 
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            placeholder="Enter medical record numbers"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Temporary Hospital ID</label>
          <input 
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            placeholder="Enter temporary ID"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700">ID Verification</label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#2563EB] transition-colors">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span className="mt-2 text-sm text-gray-600">Click to upload identification document</span>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeDetailsForm;
