import React, { useState, useEffect } from "react";
import { Copy, Upload, AlertCircle, CheckCircle, Menu, X, Home, Wallet, CreditCard, BarChart3, Settings, LogOut, User, Bell } from "lucide-react";

// Enhanced Layout component with header and sidebar
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: Wallet, label: "Wallet", active: true },
    { icon: CreditCard, label: "Transactions", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-900">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BT</span>
            </div>
            <span className="text-white font-bold text-lg">BTMETA</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </a>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-white">Wallet Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">BT0954948</p>
                  <p className="text-xs text-gray-400">Premium User</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function Wallet() {
  const [walletData, setWalletData] = useState({
    mainBalance: {
      btmetaBalance: "0.00 BTMETA",
      usdtBalance: "0.00 USDT",
      walletId: "",
    },
    totalDeposit: {
      btmetaBalance: "0.00 BTMETA",
      usdtBalance: "0.00 USDT",
      walletId: "",
    },
    depositInfo: {
      name: "",
      email: "",
      usdtBalance: "0 USDT",
      minDeposit: "0.00 BTMETA",
      maxDeposit: "0.00 BTMETA",
      walletAddress: "",
      network: "BNB Smart Chain (BEP20)",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Load demo data (replace with API calls when ready)
  useEffect(() => {
    const loadDemoData = () => {
      setLoading(true);

      // Simulate loading time
      setTimeout(() => {
        setWalletData({
          mainBalance: {
            btmetaBalance: "2,235,889.00 BTMETA",
            usdtBalance: "1,118.00 USDT",
            walletId: "BT0954948",
          },
          totalDeposit: {
            btmetaBalance: "100.00 BTMETA",
            usdtBalance: "50.00 USDT",
            walletId: "BT0954948",
          },
          depositInfo: {
            name: "BT0954948",
            email: "sabameharban704@gmail.com",
            usdtBalance: "0 USDT",
            minDeposit: "1000.00 BTMETA",
            maxDeposit: "10000000.00 BTMETA",
            walletAddress: "0xA5021FF959F4833a1F7160dE51E2E7401AB1A0bB",
            network: "BNB Smart Chain (BEP20)",
          },
        });
        setLoading(false);
      }, 1000); // 1 second loading simulation
    };

    loadDemoData();
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletData.depositInfo.walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert("Failed to copy address to clipboard");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmitDeposit = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setSubmitLoading(true);

    // Demo submission (replace with actual API call when ready)
    setTimeout(() => {
      alert("Deposit receipt submitted successfully! (Demo mode)");
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById("file-upload");
      if (fileInput) {
        fileInput.value = "";
      }
      setSubmitLoading(false);
    }, 2000); // Simulate 2 second processing time
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-white text-lg">Loading wallet data...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 space-y-6">
        {/* My Wallet Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-start text-white bg-gradient-to-r bg-clip-text">
            MY WALLET
          </h2>

          {/* Main Balance Card */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-gray-900 rounded-xl p-8 text-start border border-gray-700">
              <h3 className="text-gray-300 text-3xl font-semibold tracking-wide">
                Main Balance
              </h3>
              <p className="text-yellow-400 text-xl font-bold drop-shadow-lg">
                {walletData.mainBalance.btmetaBalance}
              </p>
              <p className="text-green-400 text-md font-semibold">
                {walletData.mainBalance.usdtBalance}
              </p>
              <p className="text-gray-400 text-sm mt-6">
                Wallet ID: {walletData.mainBalance.walletId}
              </p>
            </div>
          </div>

          {/* Total Deposit Card */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-gray-900 rounded-xl p-6 text-start border border-gray-700">
              <h3 className="text-gray-300 text-3xl font-bold tracking-wide">
                Total Deposit
              </h3>
              <p className="text-green-400 text-xl font-bold drop-shadow-lg">
                {walletData.totalDeposit.btmetaBalance}
              </p>
              <p className="text-blue-400 text-lg font-semibold mt-2">
                {walletData.totalDeposit.usdtBalance}
              </p>
            </div>
          </div>
        </div>

        {/* Redesigned Deposit Section */}
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-600 shadow-2xl max-w-md mx-auto">
          <h3 className="text-2xl text-white font-bold mb-6 text-left">
            Deposit
          </h3>

          {/* Account Details - Compact Layout */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">Name</span>
              <span className="text-white text-sm font-medium">
                {walletData.depositInfo.name}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">Email</span>
              <span className="text-white text-sm font-medium">
                {walletData.depositInfo.email}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">USDT Balance</span>
              <span className="text-white text-sm font-medium">
                {walletData.depositInfo.usdtBalance}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">Minimum Deposit</span>
              <span className="text-white text-sm font-medium">
                {walletData.depositInfo.minDeposit}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400 text-sm">Maximum Deposit</span>
              <span className="text-white text-sm font-medium">
                {walletData.depositInfo.maxDeposit}
              </span>
            </div>
          </div>

          {/* QR Code and Wallet Address - Side by Side */}
          <div className="mb-6">
            <div className="flex items-start space-x-4">
              {/* QR Code */}
              <div className="bg-white p-3 rounded-lg shadow-lg flex-shrink-0">
                <div className="w-20 h-20 bg-black flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-0.5 h-0.5 ${
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Wallet Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="text-gray-300 text-sm font-medium mb-2">
                    Wallet Address
                  </h4>
                  <div className="flex items-center space-x-2 p-2 bg-slate-700 rounded-lg border border-slate-600">
                    <span className="text-xs break-all text-white font-mono flex-1">
                      {walletData.depositInfo.walletAddress}
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className={`p-1.5 rounded transition-all duration-200 ${
                        copySuccess
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                      title="Copy address"
                    >
                      {copySuccess ? (
                        <CheckCircle size={12} />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-300 text-sm font-medium mb-2">
                    Network
                  </h4>
                  <div className="p-2 bg-slate-700 border border-slate-600 rounded-lg">
                    <span className="text-white text-sm font-medium">
                      {walletData.depositInfo.network}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Please upload deposit confirmation receipt
            </label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-all duration-300 bg-slate-700/30">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-between text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-sm">
                  {selectedFile ? selectedFile.name : "Choose file"}
                </span>
                <span className="text-xs text-gray-400">
                  {selectedFile ? "File selected" : "No file chosen"}
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitDeposit}
            disabled={!selectedFile || submitLoading}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
              !selectedFile || submitLoading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {submitLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Screenshot"
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}