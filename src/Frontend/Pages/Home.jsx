import React, { useState, useEffect } from "react";
import { TrendingUp, Wallet, BarChart3, Home } from "lucide-react";
import Layout from "../../components/Layout.jsx";
import PerformanceChart from "../../components/PerformanceChart.jsx";

const HomeUI = () => {
  const [apiData, setApiData] = useState({
    mainBalance: 0,
    totalDeposit: 0,
    totalWithdrawal: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        setApiData((prev) => ({ ...prev, loading: true }));

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
    <Layout>
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              HELLO : USER45720
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full inline-block break-all sm:break-normal">
              viswajithviswa715@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Main Balance Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
              MAIN BALANCE
            </h3>
          </div>
          {apiData.loading ? (
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
            </div>
          ) : apiData.error ? (
            <div className="text-red-500 text-xs sm:text-sm">
              {apiData.error}
            </div>
          ) : (
            <>
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-600 mb-1 sm:mb-2 break-all">
                {formatNumber(apiData.mainBalance)} BTMETA
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
                {formatUSDT(apiData.mainBalance)} USDT
              </div>
            </>
          )}
        </div>

        {/* Total Deposit Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
              TOTAL DEPOSIT
            </h3>
          </div>
          {apiData.loading ? (
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
            </div>
          ) : apiData.error ? (
            <div className="text-red-500 text-xs sm:text-sm">
              {apiData.error}
            </div>
          ) : (
            <>
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-600 mb-1 sm:mb-2 break-all">
                {formatNumber(apiData.totalDeposit)} BTMETA
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
                {formatUSDT(apiData.totalDeposit)} USDT
              </div>
            </>
          )}
        </div>

        {/* Total Withdrawal Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
              TOTAL WITHDRAWAL
            </h3>
          </div>
          {apiData.loading ? (
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24"></div>
            </div>
          ) : apiData.error ? (
            <div className="text-red-500 text-xs sm:text-sm">
              {apiData.error}
            </div>
          ) : (
            <>
              <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-600 mb-1 sm:mb-2 break-all">
                {formatNumber(apiData.totalWithdrawal)} BTMETA
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">
                {formatUSDT(apiData.totalWithdrawal)} USDT
              </div>
            </>
          )}
        </div>
      </div>

      {/* Performance Chart Component */}
      <PerformanceChart />

      {/* Bottom Navigation - Mobile Only */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 md:hidden">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeUI;
