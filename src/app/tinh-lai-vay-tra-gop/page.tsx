"use client";
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Calculator, Calendar, TrendingDown } from 'lucide-react'

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('1000000000')
  const [interestRate, setInterestRate] = useState<string>('8.5')
  const [loanTerm, setLoanTerm] = useState<string>('240')
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    paymentSchedule: [] as Array<{month: number, payment: number, principal: number, interest: number, balance: number}>
  })

  const calculateLoan = () => {
    const p = parseFloat(loanAmount) || 0
    const r = parseFloat(interestRate) / 100 / 12 || 0
    const n = parseFloat(loanTerm) || 0

    if (p <= 0 || r <= 0 || n <= 0) return

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - p

    // Calculate payment schedule
    let balance = p
    const paymentSchedule = []
    
    for (let month = 1; month <= Math.min(n, 120); month++) { // Show max 120 months
      const interestPayment = balance * r
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment
      
      paymentSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      })
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentSchedule
    })
  }

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm])

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
        <title>Tính Lãi Vay Trả Góp - FinanceCalc</title>
        <meta name="description" content="Công cụ tính lãi vay và số tiền trả góp hàng tháng" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-white hover:text-purple-400 transition-colors mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Trang chủ
              </Link>
              <CreditCard className="w-8 h-8 text-purple-400 mr-3" />
              <h1 className="text-2xl font-bold text-white">Tính Lãi Vay Trả Góp</h1>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-purple-400" />
                  Thông Tin Khoản Vay
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Số tiền vay (VND)
                    </label>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder="1,000,000,000"
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder="8.5"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Thời hạn vay (tháng)
                    </label>
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder="240"
                    />
                  </div>

                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Lưu ý:</h4>
                    <p className="text-gray-300 text-sm">
                      Kết quả tính toán chỉ mang tính chất tham khảo. Lãi suất thực tế có thể khác nhau tùy theo chính sách của từng ngân hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Trả hàng tháng</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.monthlyPayment)}</p>
                    </div>
                    <Calendar className="w-10 h-10 text-purple-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Tổng tiền trả</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.totalPayment)}</p>
                    </div>
                    <TrendingDown className="w-10 h-10 text-red-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Tổng lãi phải trả</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <Calculator className="w-10 h-10 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Bảng Trả Nợ Chi Tiết (12 tháng đầu)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-300 border-b border-white/10">
                        <th className="text-left py-3 px-2">Tháng</th>
                        <th className="text-right py-3 px-2">Trả hàng tháng</th>
                        <th className="text-right py-3 px-2">Gốc</th>
                        <th className="text-right py-3 px-2">Lãi</th>
                        <th className="text-right py-3 px-2">Dư nợ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.paymentSchedule.slice(0, 12).map((row) => (
                        <tr key={row.month} className="text-gray-200 border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-2">{row.month}</td>
                          <td className="text-right py-2 px-2 text-purple-400">{formatCurrency(row.payment)}</td>
                          <td className="text-right py-2 px-2 text-green-400">{formatCurrency(row.principal)}</td>
                          <td className="text-right py-2 px-2 text-red-400">{formatCurrency(row.interest)}</td>
                          <td className="text-right py-2 px-2 text-blue-400">{formatCurrency(row.balance)}</td>
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