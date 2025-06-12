import React from 'react';
import Layout from "../../components/Layout.jsx";


export default function Transaction() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">This is the Transaction page</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Transaction content goes here...</p>
        </div>
      </div>
    </Layout>
  );
}