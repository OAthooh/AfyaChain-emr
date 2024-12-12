import PatientRegistrationForm from '../components/PatientRegistrationForm';
import RegistrationDetails from '../components/RegistrationDetails';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InsuranceInformationForm from '../components/insuaranceInformationForm';
import AdministrativeDetailsForm from '../components/AdministrativeDetails';


const RegistrationPage = () => {
  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2563EB]">Patient Registration</h1>
        <p className="text-gray-600">Enter new patient information below</p>
      </div>
      
      <Tabs className="w-full">
        <TabList className="flex border-b mb-4 w-full">
          <Tab className="flex-1 px-4 py-2 cursor-pointer text-center">Personal Information</Tab>
          <Tab className="flex-1 px-4 py-2 cursor-pointer text-center">Insurance Details</Tab>
          <Tab className="flex-1 px-4 py-2 cursor-pointer text-center">Administrative Info</Tab>
        </TabList>

        <TabPanel className="w-full">
          <PatientRegistrationForm />
          <RegistrationDetails />
        </TabPanel>
        
        <TabPanel className="w-full">
          <InsuranceInformationForm />
        </TabPanel>
        
        <TabPanel className="w-full">
          <AdministrativeDetailsForm />
        </TabPanel>
      </Tabs>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-[#2563EB] text-white py-2 px-4 rounded-lg hover:bg-[#2563EB]/90 transition-colors"
        >
          Register Patient
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;