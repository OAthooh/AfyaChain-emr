import PatientRegistrationForm from '../components/PatientRegistrationForm';
import RegistrationDetails from '../components/RegistrationDetails';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InsuranceInformationForm from '../components/insuaranceInformationForm';
import AdministrativeDetailsForm from '../components/AdministrativeDetails';


const RegistrationPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2563EB]">Patient Registration</h1>
        <p className="text-gray-600">Enter new patient information below</p>
      </div>
      
      <Tabs>
        <TabList className="flex border-b mb-4">
          <Tab className="px-4 py-2 cursor-pointer">Personal Information</Tab>
          <Tab className="px-4 py-2 cursor-pointer">Insurance Details</Tab>
          <Tab className="px-4 py-2 cursor-pointer">Administrative Info</Tab>
        </TabList>

        <TabPanel>
          <PatientRegistrationForm />
          <RegistrationDetails />
        </TabPanel>
        
        <TabPanel>
          <InsuranceInformationForm />
        </TabPanel>
        
        <TabPanel>
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