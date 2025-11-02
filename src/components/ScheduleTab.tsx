import Image from 'next/image';
// app/components/ScheduleTab.tsx
import { Match } from "@/types/match";
import {
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  Trophy,
} from "lucide-react";

interface ScheduleTabProps {
  matches: Match[];
}

export default function ScheduleTab({ matches }: ScheduleTabProps) {
  // Trận sắp diễn ra: chưa live + chưa có tỉ số
  // const upcomingMatches = matches.filter(
  //   (m) => !m.isLive && m.homeGoals == null && m.awayGoals == null
  // );
const upcomingMatches = matches
  // Group matches by date
  const groupMatchesByDate = (matches: Match[]) => {
    const grouped: { [key: string]: Match[] } = {};

    matches.forEach((match) => {
      if (match.estimateStartTime) {
        const date = new Date(match.estimateStartTime).toDateString();
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(match);
      }
    });

    return grouped;
  };

  const groupedMatches = groupMatchesByDate(upcomingMatches);

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Ngày mai";
    } else {
      return date.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  if (upcomingMatches.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không có trận đấu sắp tới
          </h3>
          <p className="text-gray-500">
            Hãy quay lại sau để xem lịch thi đấu mới nhất
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <CalendarIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lịch thi đấu mùa giải 2025-2026
        </h1>
      </div>

      {/* Matches grouped by date */}
      <div className="space-y-8">
        {Object.entries(groupedMatches).map(([dateString, dayMatches]) => (
          <div key={dateString} className="space-y-4">
            {/* Date Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 pb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {formatMatchDate(dateString)}
              </h3>
            </div>

            {/* Matches for this date */}
            <div className="grid gap-4">
              {dayMatches.map((match) => (
                <div
                  key={match.matchId}
                  className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Teams Section */}
                      <div className="flex-1">
                        <div className="flex items-center justify-center space-x-8">
                          {/* Home Team */}
                          <div className="flex flex-col items-center space-y-3 min-w-[120px]">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm">
                                <Image
                                  src={match.homeLogoPath}
                                  alt={match.homeName}
                                  className="w-10 h-10 object-contain"
                                  width={40}
                                  height={40}
                                />
                              </div>
                            </div>
                            <h3 className="font-semibold text-center text-gray-800 leading-tight">
                              {match.homeName}
                            </h3>
                          </div>
                           
                          {/* VS Divider */}
                          
                          {match.timePlaying === "NS" && (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
      <span className="text-white font-bold text-sm">VS</span>
    </div>
    {match.estimateStartTime && (
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-700">
          {new Date(match.estimateStartTime).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    )}
  </div>
)}

{match.timePlaying === "FT" && (
  <div className="flex flex-col items-center space-y-2">
    <div className={`text-4xl font-bold transition-colors duration-300 ${
      match.isLive ? "text-red-600" : "text-gray-700"
    }`}>
      <span className="text-green-600">
        {match.homeGoals ?? 0}
      </span>
      <span className="text-gray-400 mx-2">-</span>
      <span className="text-green-600" >
        {match.awayGoals ?? 0}
      </span>
    </div>

    <div className="text-center">
      {match.isLive ? (
        <div className="flex items-center space-x-2 text-red-600 font-semibold text-sm">
         
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          <span>Kết thúc</span>
        </div>
      )}
    </div>

    
  </div>
)}

                          {/* Away Team */}
                          <div className="flex flex-col items-center space-y-3 min-w-[120px]">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm">
                                <Image
                                  src={match.awayLogoPath}
                                  alt={match.awayName}
                                  className="w-10 h-10 object-contain"
                                  width={40}
                                  height={40}
                                />
                              </div>
                            </div>
                            <h3 className="font-semibold text-center text-gray-800 leading-tight">
                              {match.awayName}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Match Info Section */}
                      <div className="lg:min-w-[200px]">
                        <div className="flex flex-col space-y-3">
                          {/* League Badge */}
                          {match.leagueName && (
                            <div className="flex items-center justify-center lg:justify-end">
                              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full">
                                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-xs font-medium text-blue-700">
                                  {match.leagueName}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Stadium Info */}
                          {match.stadiumName && (
                            <div className="flex items-center justify-center lg:justify-end space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                              <span className="text-sm font-medium truncate">
                                {match.stadiumName}
                              </span>
                            </div>
                          )}

                          {/* Notification Bell - Interactive element for future features */}
                          {/* <div className="flex items-center justify-center lg:justify-end">
                            <button className="inline-flex items-center space-x-2 px-3 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm">
                              <Users className="w-4 h-4" />
                              <span>Theo dõi</span>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
