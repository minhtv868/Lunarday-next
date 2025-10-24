export interface Match {
  matchId: number;
  estimateStartTime?: string;   // DateTime? → string ISO
  lSMatchId?: number;
  timePlaying?: string;
  homeId?: number;
  awayId?: number;
  leagueId?: number;
  homeName?: string;
  awayName?: string;
  homeLogoPath?: string;
  awayLogoPath?: string;
  homeGoals?: number;
  awayGoals?: number;
  stadiumName?: string;
  leagueName?: string;
  leagueImage?: string;
  isLive?: boolean;
  status?: number;
  isHot?: boolean;
  crUserId?: number;
  crDateTime?: string;
  updUserId?: number;
  updDateTime?: string;
  lastUpdateTime?: string;
}
