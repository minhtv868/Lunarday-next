'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Target,PiggyBank } from 'lucide-react';

//const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316'];

export default function Dashboard() {
  const [user] = useState({
    name: 'Minh Anh',
    totalBalance: 15500000,
    monthlyIncome: 8000000,
    monthlySavings: 2000000,
  });

  const expenseData = [
    { name: 'Ăn uống', value: 2500000, color: '#3B82F6' },
    { name: 'Mua sắm', value: 1800000, color: '#EF4444' },
    { name: 'Giải trí', value: 1200000, color: '#10B981' },
    { name: 'Di chuyển', value: 800000, color: '#F59E0B' },
    { name: 'Học tập', value: 500000, color: '#8B5CF6' },
  ];

  const monthlyTrend = [
    { month: 'T1', income: 7500000, expense: 5200000 },
    { month: 'T2', income: 8200000, expense: 5800000 },
    { month: 'T3', income: 7800000, expense: 6200000 },
    { month: 'T4', income: 8500000, expense: 5500000 },
    { month: 'T5', income: 8000000, expense: 6800000 },
    { month: 'T6', income: 8200000, expense: 6200000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <section id="dashboard" className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Xin chào, {user.name}! 👋
          </h2>
          <p className="text-gray-600">Hôm nay là ngày tuyệt vời để quản lý tài chính của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6 card-hover animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Wallet className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Tổng số dư</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(user.totalBalance)}</p>
            <p className="text-xs text-green-600 mt-1">+12% so với tháng trước</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 card-hover animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Thu nhập tháng</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(user.monthlyIncome)}</p>
            <p className="text-xs text-green-600 mt-1">+5% so với tháng trước</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 card-hover animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <PiggyBank className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Tiết kiệm tháng</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(user.monthlySavings)}</p>
            <p className="text-xs text-green-600 mt-1">+25% so với tháng trước</p>
          </div>

          <div className="glass-effect rounded-2xl p-6 card-hover animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Target className="text-orange-600" size={24} />
              </div>
              <TrendingDown className="text-red-500" size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Chi tiêu tháng</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(6800000)}</p>
            <p className="text-xs text-red-600 mt-1">+8% so với tháng trước</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Breakdown */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Chi tiêu theo danh mục</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Xu hướng thu chi</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Thu nhập" />
                  <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} name="Chi tiêu" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-effect rounded-2xl p-6 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Thao tác nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="p-3 bg-blue-500 rounded-full mb-2">
                <TrendingUp className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Thêm thu nhập</span>
            </button>
            
            <button className="flex flex-col items-center p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors">
              <div className="p-3 bg-red-500 rounded-full mb-2">
                <TrendingDown className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Thêm chi tiêu</span>
            </button>
            
            <button className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="p-3 bg-green-500 rounded-full mb-2">
                <Target className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Đặt mục tiêu</span>
            </button>
            
            <button className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="p-3 bg-purple-500 rounded-full mb-2">
                <PiggyBank className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-700">Tiết kiệm</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
