import { Bar } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';


const treatmentData = {
  labels: ['Diabetes Management', 'Hypertension', 'Respiratory Infections', 'Prenatal Care', 'Vaccinations'],
  datasets: [
    {
      label: 'Success Rate',
      data: [92, 88, 95, 97, 99],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderRadius: 4,
    },
    {
      label: 'Previous Period',
      data: [89, 85, 93, 95, 98],
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderRadius: 4,
    }
  ],
};


export function TreatmentSuccess() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Treatment Success Rates</h2>
        <div className="flex items-center space-x-2 text-sm">
          <span className="flex items-center text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            +2.3%
          </span>
          <span className="text-gray-500">vs previous period</span>
        </div>
      </div>

      <div className="h-[300px]">
        <Bar
          data={treatmentData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: (context) => `Success Rate: ${context.raw}%`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Success Rate (%)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
} 