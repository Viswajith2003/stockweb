import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  DollarSign,
  TrendingUp,
  Eye,
  EyeOff,
  QrCode,
  Wallet,
  AlertTriangle,
} from "lucide-react";

const WalletPage = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const walletData = {
    mainBalance: 100,
    totalDeposit: 100,
    walletAddress: "ajdgdidkdbdobdoe9ejdbdkd9d8002a5",
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            MY WALLET
          </h1>
          <p className="text-gray-600">
            Manage your digital assets and transactions
          </p>
        </div>

        {/* Main Balance Card */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 p-1 rounded-2xl shadow-lg">
            <div className="bg-white rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  MAIN BALANCE
                </h2>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {balanceVisible ? (
                    <Eye className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-600 mb-2">
                {balanceVisible ? `${walletData.mainBalance} USDC` : "••••••"}
              </div>

              <div className="text-gray-500 text-sm sm:text-base">
                ≈ $
                {balanceVisible ? walletData.mainBalance.toFixed(2) : "••••••"}{" "}
                USD
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <ArrowDownLeft className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">DEPOSIT</h3>
            <p className="text-gray-500 text-sm">Add funds to your wallet</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <ArrowUpRight className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">WITHDRAW</h3>
            <p className="text-gray-500 text-sm">Transfer funds out</p>
          </button>
        </div>

        {/* Wallet Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">TOTAL DEPOSIT</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {walletData.totalDeposit} USDC
            </div>
            <div className="text-gray-500 text-sm">All time deposits</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">GROWTH</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">+0.00%</div>
            <div className="text-gray-500 text-sm">Last 30 days</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">AVAILABLE</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {walletData.mainBalance} USDC
            </div>
            <div className="text-gray-500 text-sm">Ready to use</div>
          </div>
        </div>

        {/* Wallet Address Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                WALLET ADDRESS
              </h3>
              <p className="text-gray-500 text-sm">BEP20 Network</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300 mb-4">
                <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center border">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-xs">QR Code</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center">
                Scan to get wallet address
              </p>
            </div>

            {/* Address Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NETWORK
                </label>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-800">BEP20</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WALLET ADDRESS
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                  <span className="flex-1 text-sm font-mono break-all text-gray-900">
                    {walletData.walletAddress}
                  </span>
                  <button
                    onClick={() => copyToClipboard(walletData.walletAddress)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {copiedAddress && (
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                    ✓ Address copied to clipboard!
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    MINIMUM DEPOSIT
                  </label>
                  <div className="text-lg font-bold text-gray-900">10 USDC</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    MAXIMUM DEPOSIT
                  </label>
                  <div className="text-lg font-bold text-gray-900">
                    10,000 USDC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-bold text-yellow-800 mb-2">
                IMPORTANT NOTICE
              </h4>
              <div className="text-yellow-700 text-sm space-y-1">
                <p>• Only send BEP20 tokens to this address</p>
                <p>• Minimum deposit: 10 USDC</p>
                <p>• Maximum deposit: 10,000 USDC</p>
                <p>
                  • Sending other tokens or using different networks may result
                  in permanent loss of funds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wallet Icon */}
        <div className="flex justify-center mt-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
