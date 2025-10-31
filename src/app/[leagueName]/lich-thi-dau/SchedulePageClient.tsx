// "use client";
// import { generateMetadata } from "@/lib/seoGenerator";
// import { useState, useEffect } from "react";
// import { matchApi } from "@/lib/api";
// import ScheduleTab from "@/components/ScheduleTab";
// import { Match } from "@/types/match";
// import Link from "next/link";
// import React from "react";
//  interface SchedulePageClientProps {
//   leagueName: string;
// }
// export default function SchedulePageClient({ leagueName }: SchedulePageClientProps) {
//   // map leagueName -> leagueId nếu cần
// // const leagueId = 1; // tự định nghĩa

//   const [matches, setMatches] = useState<Match[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Danh sách các giải đấu khác
//   const otherLeagues = [
//     { name: "Premier League", slug: "premier-league", id: 1 },
//     { name: "La Liga", slug: "la-liga", id: 2 },
//     { name: "Serie A", slug: "serie-a", id: 3 },
//     { name: "Bundesliga", slug: "bundesliga", id: 4 },
//     { name: "Ligue 1", slug: "ligue-1", id: 5 },
//     { name: "Champions League", slug: "champions-league", id: 6 },
//   ];

//   // Tìm league hiện tại để lấy ID
//   const currentLeague = otherLeagues.find(
//     (league) => league.slug === leagueName
//   );
//   const currentLeagueId = currentLeague?.id || 1;
//  const leagueUrl = leagueName;
//   const fetchMatches = async (date?: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params: { leagueId?: number;leagueUrl?:string; estimateStartTime?: string } = {
//         leagueId: currentLeagueId,
//         leagueUrl: leagueUrl, 
//       };

//       // Thêm estimateStartTime vào params nếu có
//       if (date) {
//         params.estimateStartTime = date;
//       }

//       const fetchedMatches: Match[] = await matchApi.getSchedule(params);
//       setMatches(fetchedMatches);
//     } catch (error: any) {
//       console.error(error);
//       setError(`Không thể tải lịch thi đấu cho ${leagueName}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load matches khi component mount hoặc khi selectedDate thay đổi
//   useEffect(() => {
//     fetchMatches(selectedDate);
//   }, [selectedDate, currentLeagueId]);

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleQuickDateSelect = (value: string) => {
//     const today = new Date();
//     let targetDate = new Date();

//     switch (value) {
//       case "today":
//         targetDate = today;
//         break;
//       case "tomorrow":
//         targetDate = new Date(today);
//         targetDate.setDate(today.getDate() + 1);
//         break;
//       case "weekend":
//         // Tìm thứ 7 tuần này
//         const daysUntilSaturday = (6 - today.getDay()) % 7;
//         targetDate = new Date(today);
//         targetDate.setDate(today.getDate() + daysUntilSaturday);
//         break;
//       case "this-week":
//         // Đầu tuần (thứ 2)
//         const daysUntilMonday =
//           today.getDay() === 0 ? 1 : (8 - today.getDay()) % 7;
//         targetDate = new Date(today);
//         targetDate.setDate(today.getDate() + daysUntilMonday);
//         break;
//     }

//     const dateString = targetDate.toISOString().split("T")[0];
//     setSelectedDate(dateString);
//   };

//   if (error) {
//     return <div className="text-red-600 p-4">{error}</div>;
//   }

//   return (
//     <div className="flex gap-6">
//       {/* Main content */}
//       <div className="flex-1">
//         {/* Date filter */}
//          <div className="mb-6">
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//     {/* Date picker section */}
//     <div className="flex items-center gap-4">
//       <label
//         htmlFor="match-date"
//         className="text-sm font-medium text-gray-700 whitespace-nowrap"
//       >
//         Chọn ngày:
//       </label>
//       <input
//         type="date"
//         id="match-date"
//         className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         value={selectedDate}
//         onChange={handleDateChange}
//       />
//     </div>

//     {/* Quick date shortcuts - horizontal layout */}
//     <div className="flex flex-wrap gap-2">
//       {[
//         { label: "Hôm nay", value: "today" },
//         { label: "Ngày mai", value: "tomorrow" },
//         { label: "Cuối tuần", value: "weekend" },
//         { label: "Tuần này", value: "this-week" },
//       ].map((shortcut) => (
//         <button
//           key={shortcut.value}
//           onClick={() => handleQuickDateSelect(shortcut.value)}
//           className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 whitespace-nowrap"
//         >
//           {shortcut.label}
//         </button>
//       ))}
//     </div>
//   </div>
// </div>
//         {loading ? (
//           <div className="flex justify-center items-center py-8">
//             <div className="text-gray-600">Đang tải...</div>
//           </div>
//         ) : (
//           <ScheduleTab matches={matches} />
//         )}
//       </div>

//       {/* Sidebar */}
//       <div className="w-80 hidden md:block">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Lịch thi đấu khác
//           </h3>

//           <div className="space-y-3">
//             {otherLeagues.map((league) => {
//               const isActive = league.id === currentLeagueId;

//               return (
//                 <Link
//                   key={league.slug}
//                   href={`/${league.slug}/lich-thi-dau`}
//                   className={`block p-3 rounded-lg border transition-colors duration-200 ${
//                     isActive
//                       ? "border-blue-500 bg-blue-50 text-blue-700"
//                       : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`text-sm font-medium ${
//                         isActive ? "text-blue-800" : "text-gray-800"
//                       }`}
//                     >
//                       {league.name}
//                     </span>
//                     <svg
//                       className={`w-4 h-4 ${
//                         isActive ? "text-blue-500" : "text-gray-400"
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>

         
//         </div>
//       </div>
//     </div>
//   );
// }
