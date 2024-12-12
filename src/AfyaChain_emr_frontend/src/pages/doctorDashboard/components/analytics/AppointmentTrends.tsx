import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TrendsProps {
  dateRange: string;
  department: string;
}

// Mock data generator
const generateTrendData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    appointments: Math.floor(Math.random() * 20) + 10,
  }));
};

export function AppointmentTrends({ dateRange, department }: TrendsProps) {
  const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
  const trendData = generateTrendData(days);

  const data = {
    labels: trendData.map(d => d.date),
    datasets: [
      {
        label: 'Daily Appointments',
        data: trendData.map(d => d.appointments),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Appointment Trends</h2>
        <select
          value={department}
          onChange={(e) => e.target.value}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          <option value="cardiology">Cardiology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="orthopedics">Orthopedics</option>
        </select>
      </div>

      <div className="h-[300px]">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Appointments',
                },
              },
            },
            interaction: {
              mode: 'nearest',
              axis: 'x',
              intersect: false,
            },
          }}
        />
      </div>
    </div>
  );
} 