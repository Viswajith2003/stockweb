import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeUI from "./Frontend/Pages/Home.jsx";
import Wallet from "./Frontend/Pages/Wallet.jsx";
import Transaction from "./Frontend/Pages/Transaction.jsx";
import Settings from "./Frontend/Pages/settings.jsx";
import Analytics from "./Frontend/Pages/Analysis.jsx";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomeUI />} />
        <Route path="/dashboard" element={<HomeUI />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
