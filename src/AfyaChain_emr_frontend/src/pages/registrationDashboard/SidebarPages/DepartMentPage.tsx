
const DepartmentPage = () => {
  // Sample department data - replace with actual API call
  const departments = [
    {
      id: 1,
      name: "General Medicine",
      head: "Dr. Sarah Smith",
      location: "Block A, Floor 2",
      status: "Active",
    },
    {
      id: 2,
      name: "Pediatrics",
      head: "Dr. John Doe",
      location: "Block B, Floor 1",
      status: "Active",
    },
    // ... existing code ...
  ];

  return (
    <div className="w-[100%] ml-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2563EB]">Departments</h1>
        <p className="text-gray-600">View and manage department information</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head of Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.head}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {dept.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <button className="mr-2">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;