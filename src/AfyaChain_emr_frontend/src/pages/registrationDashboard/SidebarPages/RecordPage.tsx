const RecordPage = () => {
  return (
    <div className="w-[100%] ml-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2563EB]">Patient Records</h1>
        <p className="text-gray-600">Manage appointments and patient registration</p>
      </div>
      
      {/* Search and Basic Filters */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <input
            type="search"
            placeholder="Search patients by name or ID..."
            className="flex-1 p-2 border rounded-md"
          />
          <select className="p-2 border rounded-md">
            <option value="">Appointment Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="checked-in">Checked In</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
       {/* Reception Statistics */}
       <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Today's Appointments</h3>
          <p className="text-2xl text-blue-600">24</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Waiting Patients</h3>
          <p className="text-2xl text-blue-600">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Checked In</h3>
          <p className="text-2xl text-blue-600">12</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Register New Patient
        </button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
          Schedule Appointment
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="border p-4 rounded-md hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-gray-600">ID: 12345</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                  Check In
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  View Details
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Appointment: 2:30 PM</p>
              <p className="text-sm text-gray-600">Department: General Practice</p>
              <p className="text-sm text-gray-600">Contact: +254 123 456 789</p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default RecordPage;