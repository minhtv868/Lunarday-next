"use client";

import Link from "next/link";
import CalendarCalculator from "viet-lunar-calendar";
import { XemNgayTotXauModel } from "@/types/xemngay";
import { xemNgayApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { THANG } from "@/constants/config";

interface DailyCalendarProps {
  date?: string; // "dd-mm-yyyy"
}

export default function DailyCalendar({ date }: DailyCalendarProps) {
  const [resulDay, setDataHomNay] = useState<XemNgayTotXauModel | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (date) {
      const [dd, mm, yyyy] = date.split("-");
      return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }
    return new Date();
  });

  useEffect(() => {
    async function fetchData() {
      const dd = String(currentDate.getDate()).padStart(2, "0");
      const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
      const yyyy = currentDate.getFullYear();
      const formattedDate = `${dd}-${mm}-${yyyy}`;

      const result = await xemNgayApi.getLichNgay({
        date: formattedDate,
        NumbDay: 0,
        type: 0,
      });

      setDataHomNay(result);
      console.log("Dữ liệu lịch:", result);
    }

    fetchData();
  }, [currentDate]);

  const changeDay = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const changeMonth = (months: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + months);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  if (!resulDay) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl">
        <div className="animate-pulse text-rose-600 font-semibold">Đang tải...</div>
      </div>
    );
  }

  const weekday = resulDay?.solarDate
    ? new Date(resulDay.solarDate).toLocaleDateString("vi-VN", { weekday: "long" })
    : "??";
  const dayNumber = resulDay?.solarDate ? new Date(resulDay.solarDate).getDate() : "?";

  return (
    <div className="w-full max-w-md mx-auto p-3 sm:p-4">
      {/* Navigation Controls */}
      <div className="mb-4 flex items-center justify-between gap-2">
        {/* Month Navigation */}
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 sm:p-2.5 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-rose-50 transition-all active:scale-95 border border-rose-100"
          title="Tháng trước"
        >
          <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Today Button */}
        <button
          onClick={goToToday}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all active:scale-95 font-semibold text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">Hôm nay</span>
          <span className="sm:hidden">Nay</span>
        </button>

        {/* Month Navigation */}
        <button
          onClick={() => changeMonth(1)}
          className="p-2 sm:p-2.5 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-rose-50 transition-all active:scale-95 border border-rose-100"
          title="Tháng sau"
        >
          <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Main Calendar Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white py-4 sm:py-5 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-95">
              Tháng {resulDay?.lunarMonth ?? "?"} Năm {resulDay?.lunarYear ?? "?"}
            </h3>
            <p className="text-base sm:text-lg font-medium mt-1 capitalize">{weekday}</p>
          </div>
        </div>

        {/* Day Number */}
        <div className="py-6 sm:py-8 text-center bg-gradient-to-b from-white to-rose-50/50">
          <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-600 via-pink-500 to-orange-500 drop-shadow-sm">
            {dayNumber}
          </div>
        </div>

        {/* Lunar Info Card */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-br from-rose-50/80 to-orange-50/80">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg"
              src={resulDay?.srcImage}
              alt="Con giáp"
            />
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-rose-700">
                {resulDay?.lunarDay ?? "??"}
              </p>
              <p className="text-xs uppercase tracking-wide text-rose-600 font-semibold mt-1">
                Tháng {THANG[resulDay?.lunarMonth - 1]}
                {resulDay?.lunarLeap === 1 && <span className="ml-1">(Nhuận)</span>}
              </p>
            </div>
          </div>

          <div className="text-center mb-4">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                resulDay?.ngayHoangDao === 1
                  ? "bg-gradient-to-r from-yellow-200 to-amber-200 text-yellow-900 border-2 border-yellow-400"
                  : "bg-gradient-to-r from-gray-200 to-slate-200 text-gray-900 border-2 border-gray-400"
              }`}
            >
              ★ Ngày {resulDay?.ngayHoangDao === 1 ? "Hoàng" : "Hắc"} Đạo
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 py-5 sm:py-6 bg-white">
          {/* Left Column */}
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-bold text-rose-700 mb-3 pb-2 border-b-2 border-rose-200 text-sm sm:text-base">
              Can Chi
            </p>
            <div className="space-y-1.5">
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Năm:</span>
                <span className="font-semibold text-gray-800">{resulDay?.canChiInfo?.[2] ?? "?"}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Tháng:</span>
                <span className="font-semibold text-gray-800">{resulDay?.canChiInfo?.[1] ?? "?"}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Ngày:</span>
                <span className="font-semibold text-gray-800">{resulDay?.canChiInfo?.[0] ?? "?"}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Giờ:</span>
                <span className="font-semibold text-gray-800">{resulDay?.canChiInfo?.[3] ?? "?"}</span>
              </p>
            </div>
            {resulDay?.tietKhi && (
              <p className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-gray-600">Tiết khí:</span>
                <span className="font-semibold text-rose-600 text-xs sm:text-sm">{resulDay.tietKhi}</span>
              </p>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-bold text-rose-700 mb-3 pb-2 border-b-2 border-rose-200 text-sm sm:text-base">
              Giờ Hoàng Đạo
            </p>
            <div className="space-y-1.5">
              {resulDay?.l_GioHoangDao?.map((g: string, i: number) => {
                const [tenGio] = g.split("@");
                return (
                  <p key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                    <span className="font-medium text-gray-700">{tenGio}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Day Navigation Footer */}
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-rose-50/80 to-orange-50/80 border-t border-rose-100">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => changeDay(-1)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-rose-50 transition-all active:scale-95 text-xs sm:text-sm font-semibold text-rose-700 border border-rose-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Hôm qua</span>
              <span className="sm:hidden">Qua</span>
            </button>

            <p className="text-xs sm:text-sm text-gray-600 font-medium px-2">
              {currentDate.toLocaleDateString("vi-VN")}
            </p>

            <button
              onClick={() => changeDay(1)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-rose-50 transition-all active:scale-95 text-xs sm:text-sm font-semibold text-rose-700 border border-rose-100"
            >
              <span className="hidden sm:inline">Ngày mai</span>
              <span className="sm:hidden">Mai</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Info Text */}
      <p className="text-center text-xs text-gray-500 mt-4 px-4">
        Lịch vạn niên Việt Nam - Xem ngày tốt xấu
      </p>
    </div>
  );
}


// "use client";

// import Link from "next/link";
// import CalendarCalculator from "viet-lunar-calendar";
// import { XemNgayTotXauModel } from "@/types/xemngay";
// import { xemNgayApi } from "@/lib/api";
// import { useEffect, useState } from "react";
// import { THANG } from "@/constants/config";

// interface DailyCalendarProps {
//   date?: string; // "dd-mm-yyyy"
// }

// export default function DailyCalendar({ date }: DailyCalendarProps) {
//   const [resulDay, setDataHomNay] = useState<XemNgayTotXauModel | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       let formattedDate = date;

//       if (!formattedDate) {
//         // Nếu không truyền, lấy ngày hôm nay
//         const today = new Date();
//         const dd = String(today.getDate()).padStart(2, "0");
//         const mm = String(today.getMonth() + 1).padStart(2, "0");
//         const yyyy = today.getFullYear();
//         formattedDate = `${dd}-${mm}-${yyyy}`;
//       }

//       const result = await xemNgayApi.getLichNgay({
//         date: formattedDate || "", // đảm bảo luôn là string
//         NumbDay: 0,
//         type: 0,
//       });

//       setDataHomNay(result);
//       console.log("Dữ liệu lịch:", result);
//     }

//     fetchData();
//   }, [date]);

//   if (!resulDay) return <p>Đang tải...</p>;
//   return (
//     <div className="p-6 bg-gradient-to-b from-pink-50 to-white shadow-lg rounded-2xl text-center border border-pink-200 max-w-2xl mx-auto">
//       {/* Header tháng/năm */}
//       <h3 className="text-sm font-bold text-pink-700 uppercase">
//         THÁNG {resulDay?.lunarMonth ?? "??"} NĂM {resulDay?.lunarYear ?? "????"}
//       </h3>

//       {/* Ngày dương */}
//       <p className="text-lg font-semibold mt-1">
//         {resulDay?.solarDate
//           ? (() => {
//               const date = new Date(resulDay.solarDate);
//               return date.toLocaleDateString("vi-VN", { weekday: "long" }); // "Chủ nhật", "Thứ hai"...
//             })()
//           : "??"}
//       </p>

//       <div className="text-6xl font-extrabold text-pink-600 mt-2">
//         {resulDay?.solarDate
//           ? new Date(resulDay.solarDate).getDate() // chỉ lấy ngày dương
//           : "?"}
//       </div>

//       {/* Quote */}
//       {/* <p className="italic text-xs text-gray-600 mt-3">
//     {resulDay?.quote ?? "Bí mật của một cuộc hôn nhân tốt đẹp là tha thứ cho bạn đời vì đã lấy mình."}
//   </p>
//   <p className="italic text-xs text-gray-500 mb-3">
//     {resulDay?.quoteAuthor ?? "- Sacha Guitry -"}
//   </p> */}

//       {/* Grid thông tin ngày */}
//       <div className="grid grid-cols-2 gap-4 text-left text-sm border-t pt-3">
//         {/* Cột 1: Ngày âm, Can Chi, Tiết khí */}
//         <div className="space-y-1">
//           <p className="font-bold text-pink-700 text-center flex items-center justify-center gap-2">
//             <img
//               className=" w-6 h-6"
//               src={resulDay?.srcImage}
//               alt="12 con giáp"
//             />
//             <span>{resulDay?.lunarDay ?? "??"}</span>
//           </p>

//           <p>
//             Ngày{" "}
//             <strong>{resulDay?.ngayHoangDao === 1 ? "Hoàng" : "Hắc"}</strong>{" "}
//             đạo
//           </p>
//           <p>Năm {resulDay?.canChiInfo?.[2] ?? "??"}</p>
//           <p>Tháng {resulDay?.canChiInfo?.[1] ?? "??"}</p>
//           <p>Ngày {resulDay?.canChiInfo?.[0] ?? "??"}</p>
//           <p>{new Date().toLocaleTimeString("vi-VN")}</p>
//           <p>Giờ {resulDay?.canChiInfo?.[3] ?? "??"}</p>
//           {resulDay?.tietKhi && <p>Tiết khí: {resulDay.tietKhi}</p>}
//         </div>

//         {/* Cột 2: Giờ Hoàng đạo */}
//         <div className="space-y-1">
//           <div className="">
//             THÁNG {THANG[resulDay?.lunarMonth - 1].toUpperCase()}
//             {resulDay?.lunarLeap === 1 && <span className=""> (NHUẬN)</span>}
//           </div>

//           <p className="font-bold text-pink-700 text-center">Giờ Hoàng đạo</p>
//           {resulDay?.l_GioHoangDao?.map((g: string, i: number) => {
//             const [tenGio] = g.split("@");
//             return <p key={i}>{tenGio}</p>;
//           })}
//         </div>
//       </div>

//       {/* Button điều hướng */}
//       <div className="flex justify-between text-xs text-pink-600 font-medium mt-3">
//         <button className="hover:underline">Hôm qua</button>
//         <button className="hover:underline">Hôm nay</button>
//         <button className="hover:underline">Ngày mai</button>
//       </div>
//     </div>
//   );
// }
