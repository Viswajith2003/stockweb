import React, { useState, useEffect } from "react";
import { 
  Copy, 
  CheckCircle, 
  Menu, 
  Home, 
  User, 
  Wallet, 
  CreditCard, 
  BarChart3, 
  Settings 
} from "lucide-react";

// Sidebar Component
const Sidebar = ({ isMenuOpen, toggleMenu }) => {
  // Mock current location since we don't have react-router
  const currentPath = "/wallet";

  const isActive = (path) => {
    return currentPath === path;
  };

  const getLinkClasses = (path) => {
    const baseClasses =
      "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors";
    const activeClasses = "bg-blue-50 text-blue-700";
    const inactiveClasses = "text-gray-700 hover:bg-gray-100";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside
      className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
       md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
       transition-transform duration-300 ease-in-out md:shadow-none md:border-r border-gray-200`}
    >
      <div className="p-4 border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a href="#" className={getLinkClasses("/dashboard")}>
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className={getLinkClasses("/wallet")}>
              <Wallet className="w-5 h-5" />
              <span>Wallet</span>
            </a>
          </li>
          <li>
            <a href="#" className={getLinkClasses("/transaction")}>
              <CreditCard className="w-5 h-5" />
              <span>Transactions</span>
            </a>
          </li>
          <li>
            <a href="#" className={getLinkClasses("/analytics")}>
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a href="#" className={getLinkClasses("/settings")}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Layout Component
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-2 sm:px-4 sm:py-3 md:px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMenu}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">
              BTMETA
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Component */}
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleMenu}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

// Main Wallet Component
export default function WalletPage() {
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
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-700 text-lg">Loading wallet data...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wallet</h1>
          <p className="text-gray-600">Manage your BTMETA and USDT balances</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Balance Card */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-white rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Main Balance</h3>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-yellow-600">
                  {walletData.mainBalance.btmetaBalance}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  {walletData.mainBalance.usdtBalance}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Wallet ID: {walletData.mainBalance.walletId}
                </p>
              </div>
            </div>
          </div>

          {/* Total Deposit Card */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-white rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Total Deposit</h3>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-green-600">
                  {walletData.totalDeposit.btmetaBalance}
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  {walletData.totalDeposit.usdtBalance}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">Make a Deposit</h3>
            <p className="text-gray-600 mt-1">Upload your deposit confirmation receipt</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm font-medium">Name</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {walletData.depositInfo.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm font-medium">Email</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {walletData.depositInfo.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm font-medium">USDT Balance</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {walletData.depositInfo.usdtBalance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm font-medium">Minimum Deposit</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {walletData.depositInfo.minDeposit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm font-medium">Maximum Deposit</span>
                    <span className="text-gray-900 text-sm font-semibold">
                      {walletData.depositInfo.maxDeposit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deposit Details */}
              <div className="space-y-6">
                {/* QR Code and Wallet Address */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    {/* QR Code */}
                    <div className="bg-white p-3 rounded-lg shadow-sm flex-shrink-0">
                      <div className="w-20 h-20 bg-black flex items-center justify-center rounded">
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
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Wallet Address
                        </h4>
                        <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-gray-200">
                          <span className="text-xs break-all text-gray-700 font-mono flex-1">
                            {walletData.depositInfo.walletAddress}
                          </span>
                          <button
                            onClick={handleCopyAddress}
                            className={`p-2 rounded transition-all duration-200 ${
                              copySuccess
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                            }`}
                            title="Copy address"
                          >
                            {copySuccess ? (
                              <CheckCircle size={16} />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Network
                        </h4>
                        <div className="p-3 bg-white border border-gray-200 rounded-lg">
                          <span className="text-gray-900 text-sm font-medium">
                            {walletData.depositInfo.network}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    Upload Deposit Receipt
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-all duration-300 bg-gray-50">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-base font-medium">
                        {selectedFile ? selectedFile.name : "Choose file to upload"}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        {selectedFile ? "File selected" : "PNG, JPG, PDF up to 5MB"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitDeposit}
                  disabled={!selectedFile || submitLoading}
                  className={`w-full font-medium py-4 px-6 rounded-lg transition-all duration-300 ${
                    !selectedFile || submitLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  {submitLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Receipt"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}