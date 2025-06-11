import React, { useState, useEffect } from "react";
import { Menu, Home, User, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import Sidebar from "../../components/sidebar.jsx"; // Import the Sidebar component
import PerformanceChart from "../../components/PerformanceChart.jsx"; // Import the PerformanceChart component

const HomeUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [apiData, setApiData] = useState({
    mainBalance: 0,
    totalDeposit: 0,
    totalWithdrawal: 0,
    loading: true,
    error: null,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        setApiData((prev) => ({ ...prev, loading: true }));

        // const response = await fetch('YOUR_API_ENDPOINT_HERE');
        // const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = {
          mainBalance: 2222717.62,
          totalDeposit: 619927.87,
          totalWithdrawal: 0.0,
        };

        setApiData({
          mainBalance: mockData.mainBalance,
          totalDeposit: mockData.totalDeposit,
          totalWithdrawal: mockData.totalWithdrawal,
          loading: false,
          error: null,
        });
      } catch (error) {
        setApiData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch balance data",
        }));
      }
    };

    fetchBalanceData();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatUSDT = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 1000000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              HomeUI
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Component */}
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    HELLO : USER45720
                  </h1>
                  <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                    viswajithviswa715@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Main Balance Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-bold text-gray-900">
                    MAIN BALANCE
                  </h3>
                </div>
                {apiData.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ) : apiData.error ? (
                  <div className="text-red-500 text-sm">{apiData.error}</div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {formatNumber(apiData.mainBalance)} BTMETA
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {formatUSDT(apiData.mainBalance)} USDT
                    </div>
                  </>
                )}
              </div>

              {/* Total Deposit Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Wallet className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-900">
                    TOTAL DEPOSIT
                  </h3>
                </div>
                {apiData.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ) : apiData.error ? (
                  <div className="text-red-500 text-sm">{apiData.error}</div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {formatNumber(apiData.totalDeposit)} BTMETA
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {formatUSDT(apiData.totalDeposit)} USDT
                    </div>
                  </>
                )}
              </div>

              {/* Total Withdrawal Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-4 mb-4">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-bold text-gray-900">
                    TOTAL WITHDRAWAL
                  </h3>
                </div>
                {apiData.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ) : apiData.error ? (
                  <div className="text-red-500 text-sm">{apiData.error}</div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {formatNumber(apiData.totalWithdrawal)} BTMETA
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {formatUSDT(apiData.totalWithdrawal)} USDT
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Performance Chart Component */}
            <PerformanceChart />

            {/* Bottom Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:hidden">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeUI;
