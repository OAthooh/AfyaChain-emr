// src/pages/patientdashboard/components/PatientQuickInfo.tsx
interface PatientInfo {
    name: string;
    id: string;
    bloodType: string;
    allergies: string[];
    photo: string;
  }
  
  export function PatientQuickInfo() {
    const patientInfo: PatientInfo = {
      name: "John Doe",
      id: "P-123456",
      bloodType: "A+",
      allergies: ["Penicillin", "Peanuts"],
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };
  
    return (
      <div className="flex items-center space-x-3">
        <img
          src={patientInfo.photo}
          alt={patientInfo.name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">{patientInfo.name}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>ID: {patientInfo.id}</span>
            <span>•</span>
            <span className="font-medium text-red-600">Blood: {patientInfo.bloodType}</span>
          </div>
        </div>
      </div>
    );
  }
  