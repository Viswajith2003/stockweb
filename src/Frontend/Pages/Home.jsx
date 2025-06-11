import React, { useState, useEffect } from "react";
import { Menu, Home, User, TrendingUp, Wallet, BarChart3 } from "lucide-react";
import Sidebar from "../../components/sidebar.jsx"; // Import the Sidebar component

const HomeUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // API data state
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

  // API fetch function
  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        setApiData((prev) => ({ ...prev, loading: true }));

        // Replace this URL with your friend's actual API endpoint
        // const response = await fetch('YOUR_API_ENDPOINT_HERE');
        // const data = await response.json();

        // Mock data for demonstration - remove this when using real API
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
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
    }).format(num / 1000000); // Assuming the API returns values in micro units
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
        <main className="flex-1 p-4 md:p-6 lg:p-8 relative z-10">
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    MAIN BALANCE
                  </h3>
                  <div className="text-gray-400 text-sm">
                    {apiData.loading ? "Loading..." : "API Data"}
                  </div>
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
                <div className="flex items-center justify-between">
                  <button
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={apiData.loading}
                  >
                    Add Funds
                  </button>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              </div>

              {/* Total Deposit Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    TOTAL DEPOSIT
                  </h3>
                  <div className="text-gray-400 text-sm">
                    {apiData.loading ? "Loading..." : "API Data"}
                  </div>
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
                <div className="flex items-center justify-between">
                  <button
                    className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    disabled={apiData.loading}
                  >
                    Deposit
                  </button>
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              {/* Total Withdrawal Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    TOTAL WITHDRAWAL
                  </h3>
                  <div className="text-gray-400 text-sm">
                    {apiData.loading ? "Loading..." : "API Data"}
                  </div>
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
                <div className="flex items-center justify-between">
                  <button
                    className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    disabled={apiData.loading}
                  >
                    Withdraw
                  </button>
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Chart/Image Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Performance Chart
                </h3>
                <div className="text-gray-400 text-sm">
                  (picture × 3 to bottom 👇)
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">
                    Chart visualization will appear here
                  </p>
                </div>

                {/* Animated background elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default HomeUI;
