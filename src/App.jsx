import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Frontend/Pages/Home.jsx";
import Wallet from "./Frontend/Pages/Wallet.jsx";
import Transaction from "./Frontend/Pages/Transaction.jsx";
import Settings from "./Frontend/Pages/settings.jsx";


function App() {
  return (
    <div className="flex-1 p-4">
      <Routes>
        <Route path="/dashbord" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
