// // app/components/StandingsTab.tsx
// import { Standing } from '../types';
// import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

// interface StandingsTabProps {
//   standings: Standing[];
// }

// export default function StandingsTab({ standings }: StandingsTabProps) {
//   const getPositionColor = (position: number) => {
//     if (position <= 4) return 'text-green-600 bg-green-50';
//     if (position <= 6) return 'text-blue-600 bg-blue-50';
//     if (position >= standings.length - 2) return 'text-red-600 bg-red-50';
//     return 'text-gray-600 bg-gray-50';
//   };

//   const getPositionIcon = (position: number) => {
//     if (position === 1) return <Trophy className="text-yellow-500" size={16} />;
//     if (position <= 4) return <TrendingUp className="text-green-500" size={16} />;
//     if (position >= standings.length - 2) return <TrendingDown className="text-red-500" size={16} />;
//     return null;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold gradient-text mb-2">
//           Bảng Xếp Hạng Premier League
//         </h2>
//         <p className="text-gray-600">Cập nhật mới nhất</p>
//       </div>

//       <div className="glass-effect rounded-2xl overflow-hidden">
//         {/* Desktop Table */}
//         <div className="hidden lg:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//               <tr>
//                 <th className="px-6 py-4 text-left">Hạng</th>
//                 <th className="px-6 py-4 text-left">Đội</th>
//                 <th className="px-6 py-4 text-center">Trận</th>
//                 <th className="px-6 py-4 text-center">Thắng</th>
//                 <th className="px-6 py-4 text-center">Hòa</th>
//                 <th className="px-6 py-4 text-center">Thua</th>
//                 <th className="px-6 py-4 text-center">Bàn Thắng</th>
//                 <th className="px-6 py-4 text-center">Bàn Thua</th>
//                 <th className="px-6 py-4 text-center">Hiệu Số</th>
//                 <th className="px-6 py-4 text-center">Điểm</th>
//               </tr>
//             </thead>
//             <tbody>
//               {standings.map((standing, index) => (
//                 <tr
//                   key={standing.team.id}
//                   className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${
//                     index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'
//                   }`}
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <span
//                         className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionColor(
//                           standing.position
//                         )}`}
//                       >
//                         {standing.position}
//                       </span>
//                       {getPositionIcon(standing.position)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{standing.team.logo}</span>
//                       <span className="font-semibold">{standing.team.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-center">{standing.played}</td>
//                   <td className="px-6 py-4 text-center text-green-600 font-medium">
//                     {standing.won}
//                   </td>
//                   <td className="px-6 py-4 text-center text-yellow-600 font-medium">
//                     {standing.drawn}
//                   </td>
//                   <td className="px-6 py-4 text-center text-red-600 font-medium">
//                     {standing.lost}
//                   </td>
//                   <td className="px-6 py-4 text-center">{standing.goalsFor}</td>
//                   <td className="px-6 py-4 text-center">{standing.goalsAgainst}</td>
//                   <td className="px-6 py-4 text-center font-medium">
//                     <span
//                       className={
//                         standing.goalDifference > 0
//                           ? 'text-green-600'
//                           : standing.goalDifference < 0
//                           ? 'text-red-600'
//                           : 'text-gray-600'
//                       }
//                     >
//                       {standing.goalDifference > 0 ? '+' : ''}
//                       {standing.goalDifference}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <span className="text-xl font-bold text-blue-600">
//                       {standing.points}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Cards */}
//         <div className="lg:hidden space-y-4 p-4">
//           {standings.map((standing) => (
//             <div
//               key={standing.team.id}
//               className="bg-white/70 rounded-xl p-4 card-hover"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center space-x-3">
//                   <span
//                     className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionColor(
//                       standing.position
//                     )}`}
//                   >
//                     {standing.position}
//                   </span>
//                   <span className="text-2xl">{standing.team.logo}</span>
//                   <span className="font-semibold">{standing.team.name}</span>
//                 </div>
//                 <span className="text-xl font-bold text-blue-600">
//                   {standing.points}
//                 </span>
//               </div>
              
//               <div className="grid grid-cols-3 gap-4 text-sm">
//                 <div className="text-center">
//                   <div className="text-gray-500">Trận</div>
//                   <div className="font-medium">{standing.played}</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-gray-500">T-H-T</div>
//                   <div className="font-medium">
//                     <span className="text-green-600">{standing.won}</span>-
//                     <span className="text-yellow-600">{standing.drawn}</span>-
//                     <span className="text-red-600">{standing.lost}</span>
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-gray-500">Hiệu số</div>
//                   <div
//                     className={`font-medium ${
//                       standing.goalDifference > 0
//                         ? 'text-green-600'
//                         : standing.goalDifference < 0
//                         ? 'text-red-600'
//                         : 'text-gray-600'
//                     }`}
//                   >
//                     {standing.goalDifference > 0 ? '+' : ''}
//                     {standing.goalDifference}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
