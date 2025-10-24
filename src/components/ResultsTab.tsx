// app/components/ResultsTab.tsx
import { Match } from '@/types/match'
import { Trophy, MapPin, Calendar as CalendarIcon, Play, Clock, TrendingUp, Users, Star } from 'lucide-react'

interface ResultsTabProps {
  matches: Match[]
}

export default function ResultsTab({ matches }: ResultsTabProps) {
  const finishedMatches = matches.filter(m => !m.isLive && (m.homeGoals != null && m.awayGoals != null))
  const liveMatches = matches.filter(m => m.isLive)

  // Group finished matches by date
  const groupMatchesByDate = (matches: Match[]) => {
    const grouped: { [key: string]: Match[] } = {}
    
    matches.forEach(match => {
      if (match.estimateStartTime) {
        const date = new Date(match.estimateStartTime).toDateString()
        if (!grouped[date]) {
          grouped[date] = []
        }
        grouped[date].push(match)
      }
    })
    
    return grouped
  }

  const groupedFinishedMatches = groupMatchesByDate(finishedMatches)

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hôm nay'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hôm qua'
    } else {
      return date.toLocaleDateString('vi-VN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  }

  const getWinnerStatus = (match: Match) => {
    // if (match.homeGoals === null || match.awayGoals === null) return 'none'
    // if (match.homeGoals > match.awayGoals) return 'home'
    // if (match.awayGoals > match.homeGoals) return 'away'
    return 'draw'
  }

  const renderMatchCard = (match: Match, isLive = false) => {
    const winnerStatus = getWinnerStatus(match)
    
    return (
      <div
        key={match.matchId}
        className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
          isLive 
            ? 'border-red-200 shadow-red-100/50 shadow-lg' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {/* Status indicator */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          isLive 
            ? 'bg-gradient-to-r from-red-500 via-orange-500 to-red-500' 
            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
        }`}></div>
        
        {/* Live pulse indicator */}
        {isLive && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <span>LIVE</span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Teams and Score Section */}
            <div className="flex-1">
              <div className="flex items-center justify-center space-x-8">
                {/* Home Team */}
                <div className={`flex flex-col items-center space-y-3 min-w-[120px] transition-all duration-300 ${
                  winnerStatus === 'home' ? 'scale-105' : winnerStatus === 'away' ? 'opacity-75' : ''
                }`}>
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      winnerStatus === 'home' 
                        ? 'bg-gradient-to-br from-green-100 to-emerald-200 ring-2 ring-green-400 ring-offset-2' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <img
                        src={match.homeLogoPath}
                        alt={match.homeName}
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                    {winnerStatus === 'home' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className={`font-semibold text-center leading-tight transition-colors duration-300 ${
                    winnerStatus === 'home' ? 'text-green-700' : 'text-gray-800'
                  }`}>
                    {match.homeName}
                  </h3>
                </div>

                {/* Score Section */}
                <div className="flex flex-col items-center space-y-2">
                  <div className={`text-4xl font-bold transition-colors duration-300 ${
                    isLive ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    <span className={winnerStatus === 'home' ? 'text-green-600' : ''}>
                      {match.homeGoals ?? 0}
                    </span>
                    <span className="text-gray-400 mx-2">-</span>
                    <span className={winnerStatus === 'away' ? 'text-green-600' : ''}>
                      {match.awayGoals ?? 0}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    {isLive ? (
                      <div className="flex items-center space-x-2 text-red-600 font-semibold text-sm">
                        <Play className="w-4 h-4 animate-pulse" />
                        <span>Đang diễn ra</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Kết thúc</span>
                      </div>
                    )}
                  </div>

                  {/* Match result indicator */}
                  {!isLive && winnerStatus !== 'none' && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      winnerStatus === 'draw' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {winnerStatus === 'draw' ? 'Hòa' : 'Thắng'}
                    </div>
                  )}
                </div>

                {/* Away Team */}
                <div className={`flex flex-col items-center space-y-3 min-w-[120px] transition-all duration-300 ${
                  winnerStatus === 'away' ? 'scale-105' : winnerStatus === 'home' ? 'opacity-75' : ''
                }`}>
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      winnerStatus === 'away' 
                        ? 'bg-gradient-to-br from-green-100 to-emerald-200 ring-2 ring-green-400 ring-offset-2' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <img
                        src={match.awayLogoPath}
                        alt={match.awayName}
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                    {winnerStatus === 'away' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className={`font-semibold text-center leading-tight transition-colors duration-300 ${
                    winnerStatus === 'away' ? 'text-green-700' : 'text-gray-800'
                  }`}>
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

                {/* Date Info */}
                {match.estimateStartTime && (
                  <div className="flex items-center justify-center lg:justify-end space-x-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {new Date(match.estimateStartTime).toLocaleDateString('vi-VN')}
                    </span>
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

                {/* Action Buttons */}
                <div className="flex items-center justify-center lg:justify-end space-x-2">
                  <button className="inline-flex items-center space-x-1 px-2 py-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-xs">
                    <TrendingUp className="w-3 h-3" />
                    <span>Stats</span>
                  </button>
                  <button className="inline-flex items-center space-x-1 px-2 py-1 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200 text-xs">
                    <Star className="w-3 h-3" />
                    <span>Lưu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isLive 
            ? 'bg-gradient-to-r from-red-500/5 to-orange-500/5' 
            : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
        }`}></div>
      </div>
    )
  }

  // Empty state
  if (liveMatches.length === 0 && finishedMatches.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Chưa có kết quả trận đấu
          </h3>
          <p className="text-gray-500">
            Kết quả các trận đấu sẽ hiển thị tại đây
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Kết Quả Trận Đấu
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Theo dõi kết quả các trận đấu đang diễn ra và đã kết thúc
        </p>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-2xl font-bold text-gray-800">Đang Diễn Ra</h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>{liveMatches.length} trận</span>
            </div>
          </div>

          <div className="grid gap-4">
            {liveMatches.map(match => renderMatchCard(match, true))}
          </div>
        </div>
      )}

      {/* Finished Matches */}
      {Object.keys(groupedFinishedMatches).length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-800">Kết Quả Gần Đây</h3>
          </div>

          {Object.entries(groupedFinishedMatches).map(([dateString, dayMatches]) => (
            <div key={dateString} className="space-y-4">
              {/* Date Header */}
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 pb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {formatMatchDate(dateString)}
                </h4>
              </div>

              {/* Matches for this date */}
              <div className="grid gap-4">
                {dayMatches.map(match => renderMatchCard(match, false))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}