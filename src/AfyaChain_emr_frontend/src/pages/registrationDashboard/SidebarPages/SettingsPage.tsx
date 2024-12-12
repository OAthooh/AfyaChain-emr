import { useState } from 'react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');

  return (
    <div className="w-[100%] ml-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2563EB]">Settings</h1>
        <p className="text-gray-600">System configuration and preferences</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Account Settings Section */}
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <button className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-gray-500">Receive email notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">Toggle dark/light theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <h3 className="font-medium mb-2">Language</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="english">English</option>
                <option value="swahili">Swahili</option>
                <option value="french">French</option>
              </select>
            </div>
          </div>
        </section>

        {/* System Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Version:</span> 1.0.0
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}
            </p>
            <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Check for Updates
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;