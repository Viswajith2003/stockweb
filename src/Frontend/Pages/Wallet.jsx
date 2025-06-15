import React, { useState, useEffect } from "react";
import {
  Copy,
  CheckCircle,
  CreditCard,
  Wallet as WalletIcon,
} from "lucide-react";
import Layout from "../../components/Layout.jsx";

// QR Code Placeholder
const QRCode = () => (
  <div className="w-20 h-20 bg-white p-1 rounded shadow-sm flex items-center justify-center">
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
);

// ✅ File Upload Form (integrated)
const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      alert("File must be under 5MB (PNG, JPG, or PDF)");
    }
  };

  const handleSubmitDeposit = async () => {
    if (!selectedFile) return;

    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        setSelectedFile(null);
        document.getElementById("file-upload").value = "";
      } else {
        alert("Upload failed. Try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3 text-gray-700">
          Upload Deposit Receipt
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
            selectedFile
              ? "border-green-400 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
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
            {selectedFile && (
              <span className="text-sm text-green-600 mt-2">
                ✅ File ready to submit
              </span>
            )}
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmitDeposit}
        disabled={!selectedFile || submitLoading}
        className={`w-full font-medium py-4 px-6 rounded-lg transition-all duration-300 ${
          !selectedFile || submitLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-black shadow-lg"
        }`}
      >
        {submitLoading ? (
          <div className="flex items-center justify-center space-x-2 text-black">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            <span className="text-black">Submitting...</span>
          </div>
        ) : (
          "Submit Receipt"
        )}
      </button>
    </div>
  );
};

export default function Wallet() {
  const [walletData, setWalletData] = useState({
    mainBalance: {},
    totalDeposit: {},
    depositInfo: {},
  });
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
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
    }, 1000);
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletData.depositInfo.walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert("Failed to copy address");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto mb-4" />
          <div className="text-gray-700 text-lg">Loading wallet data...</div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wallet</h1>
          <p className="text-gray-600">Manage your BTMETA and USDT balances</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Balance */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-white rounded-xl p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Main Balance
                </h3>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex justify-center items-center">
                  <WalletIcon className="w-6 h-6 text-white" />
                </div>
              </div>
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

          {/* Total Deposit */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-1 rounded-2xl shadow-xl">
            <div className="bg-white rounded-xl p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Total Deposit
                </h3>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex justify-center items-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {walletData.totalDeposit.btmetaBalance}
              </p>
              <p className="text-lg font-semibold text-blue-600">
                {walletData.totalDeposit.usdtBalance}
              </p>
            </div>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">Make a Deposit</h3>
            <p className="text-gray-600 mt-1">
              Upload your deposit confirmation receipt
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Account Information
              </h4>
              {[
                ["Name", walletData.depositInfo.name],
                ["Email", walletData.depositInfo.email],
                ["USDT Balance", walletData.depositInfo.usdtBalance],
                ["Minimum Deposit", walletData.depositInfo.minDeposit],
                ["Maximum Deposit", walletData.depositInfo.maxDeposit],
              ].map(([label, value]) => (
                <div
                  className="flex justify-between py-2 border-b border-gray-100"
                  key={label}
                >
                  <span className="text-gray-600 text-sm">{label}</span>
                  <span className="text-gray-900 text-sm font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Wallet + File Upload */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <QRCode />
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">
                        Wallet Address
                      </h4>
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-3">
                        <span className="text-xs break-all font-mono flex-1 text-gray-700">
                          {walletData.depositInfo.walletAddress}
                        </span>
                        <button
                          onClick={handleCopyAddress}
                          className={`p-2 rounded ${
                            copySuccess
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                          }`}
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
                      <h4 className="text-sm font-medium text-gray-700">
                        Network
                      </h4>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900">
                        {walletData.depositInfo.network}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Integrated File Upload Form */}
              <FileUploadForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
