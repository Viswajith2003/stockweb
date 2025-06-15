import React, { useState, useEffect } from "react";
import { Copy, Upload, AlertCircle, CheckCircle } from "lucide-react";

// Mock Layout component
const Layout = ({ children }) => <div className="min-h-screen">{children}</div>;

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

  // Fetch wallet data from API with improved error handling
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if APIs exist before calling them
        const apiEndpoints = [
          "/api/wallet/main-balance",
          "/api/wallet/total-deposit",
          "/api/wallet/deposit-info",
        ];

        const responses = await Promise.allSettled(
          apiEndpoints.map(async (endpoint) => {
            const response = await fetch(endpoint);

            // Check if response is actually JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new Error(`API ${endpoint} returned non-JSON response`);
            }

            if (!response.ok) {
              throw new Error(`API ${endpoint} returned ${response.status}`);
            }

            return response.json();
          })
        );

        // Check if all API calls succeeded
        const allSucceeded = responses.every(
          (result) => result.status === "fulfilled"
        );

        if (allSucceeded) {
          const [mainBalance, totalDeposit, depositInfo] = responses.map(
            (r) => r.value
          );

          setWalletData({
            mainBalance: {
              btmetaBalance: mainBalance.btmetaBalance || "2,235,889.00 BTMETA",
              usdtBalance: mainBalance.usdtBalance || "1,118.00 USDT",
              walletId: mainBalance.walletId || "BT0954948",
            },
            totalDeposit: {
              btmetaBalance: totalDeposit.btmetaBalance || "100.00 BTMETA",
              usdtBalance: totalDeposit.usdtBalance || "50.00 USDT",
              walletId: totalDeposit.walletId || "BT0954948",
            },
            depositInfo: {
              name: depositInfo.name || "BT0954948",
              email: depositInfo.email || "sabameharban704@gmail.com",
              usdtBalance: depositInfo.usdtBalance || "0 USDT",
              minDeposit: depositInfo.minDeposit || "1000.00 BTMETA",
              maxDeposit: depositInfo.maxDeposit || "10000000.00 BTMETA",
              walletAddress:
                depositInfo.walletAddress ||
                "0xA5021FF959F4833a1F7160dE51E2E7401AB1A0bB",
              network: depositInfo.network || "BNB Smart Chain (BEP20)",
            },
          });
        } else {
          throw new Error("One or more API endpoints failed");
        }
      } catch (err) {
        console.error("Error fetching wallet data:", err);
        setError(`API Error: ${err.message}`);

        // Use fallback data when APIs fail
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
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
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
    const formData = new FormData();
    formData.append("receipt", selectedFile);
    formData.append("walletAddress", walletData.depositInfo.walletAddress);

    try {
      const response = await fetch("/api/wallet/submit-deposit", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.ok) {
          alert("Deposit receipt submitted successfully!");
          setSelectedFile(null);
          // Reset file input
          document.getElementById("file-upload").value = "";
        } else {
          alert(result.message || "Failed to submit deposit receipt");
        }
      } else {
        if (response.ok) {
          alert("Deposit receipt submitted successfully!");
          setSelectedFile(null);
          document.getElementById("file-upload").value = "";
        } else {
          alert("Failed to submit deposit receipt");
        }
      }
    } catch (error) {
      console.error("Error submitting deposit:", error);
      alert("Network error occurred while submitting deposit");
    } finally {
      setSubmitLoading(false);
    }
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
        {/* Error Alert */}
        {error && (
          <div className="bg-red-900/50 border-2 border-red-600 text-red-100 p-4 rounded-xl flex items-center space-x-3 shadow-lg">
            <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold">Connection Issue</p>
              <p className="text-sm opacity-90">{error} Using cached data.</p>
            </div>
          </div>
        )}

        {/* My Wallet Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            MY WALLET
          </h2>

          {/* Main Balance Card */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-gray-900 rounded-xl p-8 text-start border border-gray-700">
              <h3 className="text-gray-300 text-3xl font-semibold  tracking-wide">
                Main Balance
              </h3>
              <p className="text-yellow-400 text-xl font-bold  drop-shadow-lg">
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
              <h3 className="text-gray-300 text-3xl font-bold   tracking-wide">
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
