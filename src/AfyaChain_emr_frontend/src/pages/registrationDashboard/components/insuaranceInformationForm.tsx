
const InsuranceInformationForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#2563EB] mb-6">Insurance Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Primary Insurance Provider</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            placeholder="Enter provider name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Policy Number</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            placeholder="Enter policy number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Group Number</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
            placeholder="Enter group number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Relationship to Policyholder</label>
          <select className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white transition-colors">
            <option value="">Select relationship</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700">Insurance Card Upload</label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#2563EB] transition-colors">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span className="mt-2 text-sm text-gray-600">Click to upload insurance card</span>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>
          </div>
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] transition-colors"
            />
            <span className="text-sm font-medium">Has Secondary Insurance</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default InsuranceInformationForm;