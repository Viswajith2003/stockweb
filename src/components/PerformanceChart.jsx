import React, { useEffect, useRef } from "react";
import * as Chart from "chart.js";

const PerformanceChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const updateInterval = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    // Clear existing interval
    if (updateInterval.current) {
      clearInterval(updateInterval.current);
      updateInterval.current = null;
    }

    // Register Chart.js components
    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.PointElement,
      Chart.LineElement,
      Chart.LineController,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend,
      Chart.Filler
    );

    const ctx = chartRef.current.getContext("2d");

    // Generate initial data
    const generateInitialData = () => {
      const data = [];
      const labels = [];
      const now = new Date();

      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 2000); // 2 seconds intervals
        labels.push(time.toLocaleTimeString());
        data.push(Math.random() * 100 + 50); // Random values between 50-150
      }

      return { labels, data };
    };

    const initialData = generateInitialData();

    try {
      chartInstance.current = new Chart.Chart(ctx, {
        type: "line",
        data: {
          labels: initialData.labels,
          datasets: [
            {
              label: "Performance (%)",
              data: initialData.data,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: "#ffffff",
              pointBorderWidth: window.innerWidth < 640 ? 1 : 2,
              pointRadius: window.innerWidth < 640 ? 2 : 4,
              pointHoverRadius: window.innerWidth < 640 ? 4 : 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "#ffffff",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#ffffff",
              bodyColor: "#ffffff",
              borderColor: "#3b82f6",
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              display: true,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "#ffffff",
                maxTicksLimit: 6,
              },
            },
            y: {
              display: true,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "#ffffff",
                callback: function (value) {
                  return value.toFixed(0) + "%";
                },
              },
            },
          },
          animation: {
            duration: 1000,
            easing: "easeInOutQuart",
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        },
      });

      // Real-time data updates
      updateInterval.current = setInterval(() => {
        if (chartInstance.current) {
          const chart = chartInstance.current;
          const newTime = new Date().toLocaleTimeString();
          const newValue = Math.random() * 100 + 50;

          // Add new data point
          chart.data.labels.push(newTime);
          chart.data.datasets[0].data.push(newValue);

          // Remove old data points (keep last 30)
          if (chart.data.labels.length > 30) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
          }

          chart.update("none"); // Update without animation for smooth real-time effect
        }
      }, 2000); // Update every 2 seconds
    } catch (error) {
      console.error("Error creating chart:", error);
    }

    // Cleanup function
    return () => {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
        updateInterval.current = null;
      }
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-2 sm:gap-4 mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          Real-time Performance Chart
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-500">Live</span>
        </div>
      </div>

      <div className="bg-gradient-to-br mr-11 from-gray-900 to-gray-800 rounded-xl h-64 sm:h-56 md:h-64 lg:h-80 p-2 sm:p-3 md:p-4 relative overflow-hidden">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default PerformanceChart;
