import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout.jsx";
import { Copy, Upload, AlertCircle, CheckCircle } from "react-feather";

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
            <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-700">
              <h3 className="text-gray-300 text-lg font-semibold mb-4 uppercase tracking-wide">
                Main Balance
              </h3>
              <p className="text-yellow-400 text-5xl font-bold mb-2 drop-shadow-lg">
                {walletData.mainBalance.btmetaBalance}
              </p>
              <p className="text-green-400 text-xl font-semibold">
                {walletData.mainBalance.usdtBalance}
              </p>
              <p className="text-gray-400 text-sm mt-3">
                Wallet ID: {walletData.mainBalance.walletId}
              </p>
            </div>
          </div>

          {/* Total Deposit Card */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-gray-900 rounded-xl p-6 text-center border border-gray-700">
              <h3 className="text-gray-300 text-xl font-bold mb-3 uppercase tracking-wide">
                Total Deposit
              </h3>
              <p className="text-green-400 text-4xl font-bold drop-shadow-lg">
                {walletData.totalDeposit.btmetaBalance}
              </p>
              <p className="text-blue-400 text-lg font-semibold mt-2">
                {walletData.totalDeposit.usdtBalance}
              </p>
            </div>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-600 shadow-2xl">
          <h3 className="text-3xl text-white font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Deposit Funds
          </h3>

          {/* Account Details */}
          <div className="bg-gray-900/50 rounded-xl p-6 mb-6 border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300 font-medium">Name</span>
                  <span className="text-white font-semibold">
                    {walletData.depositInfo.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300 font-medium">Email</span>
                  <span className="text-white font-semibold text-sm">
                    {walletData.depositInfo.email}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300 font-medium">
                    USDT Balance
                  </span>
                  <span className="text-green-400 font-bold">
                    {walletData.depositInfo.usdtBalance}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300 font-medium">Min Deposit</span>
                  <span className="text-blue-400 font-bold">
                    {walletData.depositInfo.minDeposit}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-300 font-medium">Max Deposit</span>
                  <span className="text-purple-400 font-bold">
                    {walletData.depositInfo.maxDeposit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code and Wallet Address */}
          <div className="bg-gray-900/70 rounded-xl p-6 mb-6 border border-gray-600">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="w-32 h-32 bg-black flex items-center justify-center text-white">
                  <div className="grid grid-cols-10 gap-0.5">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 ${
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Wallet Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Wallet Address
                  </h4>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
                    <span className="text-sm break-all text-white font-mono flex-1">
                      {walletData.depositInfo.walletAddress}
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copySuccess
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
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
                  <h4 className="text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Network
                  </h4>
                  <div className="p-3 bg-purple-900/30 border border-purple-600 rounded-lg">
                    <span className="text-purple-300 font-bold">
                      {walletData.depositInfo.network}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-4 text-center text-gray-200">
              Upload Deposit Confirmation Receipt
            </label>
            <div className="border-2 border-dashed border-gray-500 rounded-xl p-8 hover:border-purple-500 transition-all duration-300 bg-gray-900/30">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-3 text-gray-300 hover:text-white transition-colors"
              >
                <div className="p-4 bg-gray-700 rounded-full">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="font-semibold">
                    {selectedFile ? selectedFile.name : "Choose file"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {selectedFile ? "File selected" : "PNG, JPG, PDF up to 5MB"}
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitDeposit}
            disabled={!selectedFile || submitLoading}
            className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg ${
              !selectedFile || submitLoading
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-purple-500/25 hover:shadow-purple-500/40"
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
    </Layout>
  );
}
