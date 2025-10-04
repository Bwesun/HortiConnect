import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from "@ionic/react";
import React from "react";
import TopNav from "../components/TopNav";
import { ChartBar, Cog, Rainbow } from "lucide-react";
// Import a chart library (e.g., react-chartjs-2)
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Production (kg)",
      data: [400, 600, 800, 1200, 900, 1300, 1250],
      borderColor: "#16a34a",
      backgroundColor: "rgba(22,163,74,0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#16a34a",
    },
    {
      label: "Sales (₦)",
      data: [200000, 350000, 400000, 600000, 500000, 800000, 850000],
      borderColor: "#f59e42",
      backgroundColor: "rgba(249,168,42,0.1)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#f59e42",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      labels: {
        color: "#333",
        font: {
          size: 14,
          weight: 600, // Use a number for numeric font weights
        },
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#6b7280" },
      grid: { display: false },
    },
    y: {
      ticks: { color: "#6b7280" },
      grid: { color: "#e5e7eb" },
    },
  },
};

const UserDashboard: React.FC = () => {
    return ( 
        <IonPage>
            <IonContent fullscreen className="bg-gray-50">
                <TopNav />
                <div className="max-w-5xl mx-auto px-4 py-6">
                    {/* Greeting */}
                    <div className="mb-6">
                        <p className="font-bold text-2xl md:text-3xl" style={{
                            color: 'var(--ion-color-dark)',
                        }}>Good morning, Sarah!</p>
                        <p className="text-gray-500 mt-1">Here’s what’s happening with your farm today.</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <IonCard className="shadow-md">
                            <IonCardHeader className="flex items-center gap-2">
                                <ChartBar size={22} className="text-green-600" />
                                <IonCardTitle className="text-base font-semibold">Production</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p className="text-2xl font-bold text-green-700">1,250 kg</p>
                                <p className="text-xs text-gray-500">This month</p>
                            </IonCardContent>
                        </IonCard>
                        <IonCard className="shadow-md">
                            <IonCardHeader className="flex items-center gap-2">
                                <Rainbow size={22} className="text-yellow-500" />
                                <IonCardTitle className="text-base font-semibold">Sales</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p className="text-2xl font-bold text-yellow-600">₦850,000</p>
                                <p className="text-xs text-gray-500">This month</p>
                            </IonCardContent>
                        </IonCard>
                        <IonCard className="shadow-md">
                            <IonCardHeader className="flex items-center gap-2">
                                <Cog size={22} className="text-blue-600" />
                                <IonCardTitle className="text-base font-semibold">Tasks</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p className="text-2xl font-bold text-blue-700">7</p>
                                <p className="text-xs text-gray-500">Pending</p>
                            </IonCardContent>
                        </IonCard>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Production & Sales Trend</h2>
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[350px] md:min-w-0">
                                <Line data={chartData} options={chartOptions} height={80} />
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
                        <ul className="divide-y divide-gray-100">
                            <li className="py-2 flex flex-col md:flex-row md:justify-between md:items-center">
                                <span className="font-medium text-gray-700">Sold 500kg tomatoes to Kano Market</span>
                                <span className="text-xs text-gray-400 mt-1 md:mt-0">Today, 8:30am</span>
                            </li>
                            <li className="py-2 flex flex-col md:flex-row md:justify-between md:items-center">
                                <span className="font-medium text-gray-700">Irrigation task completed</span>
                                <span className="text-xs text-gray-400 mt-1 md:mt-0">Yesterday, 4:15pm</span>
                            </li>
                            <li className="py-2 flex flex-col md:flex-row md:justify-between md:items-center">
                                <span className="font-medium text-gray-700">Fertilizer applied to pepper field</span>
                                <span className="text-xs text-gray-400 mt-1 md:mt-0">2 days ago</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </IonContent>
        </IonPage>
     );
}
 
export default UserDashboard;