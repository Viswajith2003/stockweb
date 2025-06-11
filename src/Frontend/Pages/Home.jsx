import React, { useState } from 'react';
import { Menu, Home, Settings, User, TrendingUp, Wallet, CreditCard, BarChart3 } from 'lucide-react';

const HomeUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(100);
  const [totalDeposit, setTotalDeposit] = useState(100);
  const [currentPosition, setCurrentPosition] = useState('BASIC');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">HomeUI</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg 
          transition-transform duration-300 ease-in-out md:shadow-none md:border-r border-gray-200`}>
          
          <div className="p-4 border-b border-gray-200 md:hidden">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={toggleMenu} className="p-1 hover:bg-gray-100 rounded">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <Wallet className="w-5 h-5" />
                  <span>Wallet</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span>Transactions</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <BarChart3 className="w-5 h-5" />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    HELLO : USER45720
                  </h1>
                  <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                    (This is enough for everyone)
                  </p>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Main Balance Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">MAIN BALANCE</h3>
                  <div className="text-gray-400 text-sm">(need admin panel for edit)</div>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {userBalance} USDC
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setUserBalance(prev => prev + 10)}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Funds
                  </button>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              </div>

              {/* Total Deposit Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">TOTAL DEPOSIT</h3>
                  <div className="text-gray-400 text-sm">(need admin panel for edit)</div>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {totalDeposit} USDC
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setTotalDeposit(prev => prev + 50)}
                    className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Deposit
                  </button>
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              {/* Current Position Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">CURRENT POSITION</h3>
                  <div className="text-gray-400 text-sm">(need admin panel to edit)</div>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-4">
                  {currentPosition}
                </div>
                <div className="flex items-center justify-between">
                  <select 
                    value={currentPosition}
                    onChange={(e) => setCurrentPosition(e.target.value)}
                    className="text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BASIC">BASIC</option>
                    <option value="PREMIUM">PREMIUM</option>
                    <option value="PRO">PRO</option>
                  </select>
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Chart/Image Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Performance Chart</h3>
                <div className="text-gray-400 text-sm">(picture × 3 to bottom 👇)</div>
              </div>
              
              <div className="bg-gray-900 rounded-xl h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Chart visualization will appear here</p>
                </div>
                
                {/* Animated background elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default HomeUI;