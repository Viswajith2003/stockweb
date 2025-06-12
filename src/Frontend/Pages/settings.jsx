import React from "react";
import Layout from "../../components/Layout.jsx";


export default function Settings() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          This is the Settings page
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Settings content goes here...</p>
        </div>
      </div>
    </Layout>
  );
}
