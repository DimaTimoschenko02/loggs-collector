export interface RedisAsianOddsEntity {
  type: string;
  fixture_id: string;
  bookmaker_id: number;
  change_time: number;
  asian_home: number;
  asian_away: number;
  asian_home_cf: number;
  asian_away_cf: number;
  home_goals: number;
  away_goals: number;
  match_status: number;
}
