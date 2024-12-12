import { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const genderData = {
  labels: ['Male', 'Female', 'Other'],
  datasets: [{
    data: [45, 53, 2],
    backgroundColor: [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(75, 192, 192, 0.8)',
    ],
  }],
};

const ageData = {
  labels: ['0-17', '18-30', '31-45', '46-60', '60+'],
  datasets: [{
    label: 'Patients by Age Group',
    data: [150, 250, 300, 200, 100],
    backgroundColor: 'rgba(54, 162, 235, 0.8)',
  }],
};

export function DemographicsCharts() {
  const [activeView, setActiveView] = useState<'gender' | 'age'>('gender');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Patient Demographics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('gender')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              activeView === 'gender'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Gender Distribution
          </button>
          <button
            onClick={() => setActiveView('age')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              activeView === 'age'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Age Distribution
          </button>
        </div>
      </div>

      <div className="h-[300px] flex items-center justify-center">
        {activeView === 'gender' ? (
          <Pie
            data={genderData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const value = context.raw as number;
                      const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${context.label}: ${percentage}% (${value} patients)`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <Bar
            data={ageData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Patients',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Age Groups',
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
} 