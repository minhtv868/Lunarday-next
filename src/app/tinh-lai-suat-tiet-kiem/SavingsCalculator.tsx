"use client";
// pages/savings-calculator.tsx
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, PiggyBank, TrendingUp, Calendar, DollarSign } from 'lucide-react'
import { formatNumber } from '../utils/format';
export default function SavingsCalculator() {
  const [principal, setPrincipal] = useState<string>('100000000')
  const [interestRate, setInterestRate] = useState<string>('6.5')
  const [term, setTerm] = useState<string>('12')
  const [compoundFrequency, setCompoundFrequency] = useState<string>('12')
  const [results, setResults] = useState({
    finalAmount: 0,
    totalInterest: 0,
    monthlyGrowth: [] as Array<{month: number, amount: number, interest: number}>
  })

  const calculateSavings = () => {
    const p = parseFloat(principal) || 0
    const r = parseFloat(interestRate) / 100 || 0
    const t = parseFloat(term) || 0
    const n = parseFloat(compoundFrequency) || 1

    if (p <= 0 || r <= 0 || t <= 0) return

    const finalAmount = p * Math.pow(1 + r/n, n * t/12)
    const totalInterest = finalAmount - p

    // Calculate monthly growth
    const monthlyGrowth = []
    for (let month = 1; month <= t; month++) {
      const amount = p * Math.pow(1 + r/n, n * month/12)
      const interest = amount - p
      monthlyGrowth.push({ month, amount, interest })
    }

    setResults({
      finalAmount,
      totalInterest,
      monthlyGrowth
    })
  }

  useEffect(() => {
    calculateSavings()
  }, [principal, interestRate, term, compoundFrequency])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount)
  }



  return (
    <>
      <Head>
        <title>Tính Lãi Suất Tiết Kiệm - FinanceCalc</title>
        <meta name="description" content="Công cụ tính lãi suất tiết kiệm chính xác" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-white hover:text-green-400 transition-colors mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Trang chủ
              </Link>
              <PiggyBank className="w-8 h-8 text-green-400 mr-3" />
              <h1 className="text-2xl font-bold text-white">Tính Lãi Suất Tiết Kiệm</h1>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-green-400" />
                  Thông Tin Tiết Kiệm
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Số tiền gửi ban đầu (VND)
                    </label>
                    <input
                      type="text"
                      value={formatNumber(principal)}
                      onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="100,000,000"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Lãi suất (%/năm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="6.5"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Thời hạn (tháng)
                    </label>
                    <input
                      type="number"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tần suất tính lãi
                    </label>
                    <select
                      value={compoundFrequency}
                      onChange={(e) => setCompoundFrequency(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    >
                      <option value="1">Hàng năm</option>
                      <option value="4">Hàng quý</option>
                      <option value="12">Hàng tháng</option>
                      <option value="365">Hàng ngày</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Số tiền nhận được</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.finalAmount)}</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Tổng lãi nhận được</p>
                      <p className="text-3xl font-bold">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <Calendar className="w-12 h-12 text-blue-200" />
                  </div>
                </div>
              </div>

              {/* Monthly Growth Chart */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Biểu Đồ Tăng Trưởng Theo Tháng</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-300 border-b border-white/10">
                        <th className="text-left py-3 px-2">Tháng</th>
                        <th className="text-right py-3 px-2">Số tiền tích lũy</th>
                        <th className="text-right py-3 px-2">Lãi tích lũy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.monthlyGrowth.slice(0, 12).map((row) => (
                        <tr key={row.month} className="text-gray-200 border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2">{row.month}</td>
                          <td className="text-right py-2 px-2 text-green-400">{formatCurrency(row.amount)}</td>
                          <td className="text-right py-2 px-2 text-blue-400">{formatCurrency(row.interest)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}