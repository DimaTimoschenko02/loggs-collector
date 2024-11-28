export interface RedisInplayPrematchAsianEntity {
  fixture_id: string;
  change_time: number;
  asian_home: number;
  asian_away: number;
  asian_home_cf: number;
  asian_away_cf: number;
  asian_home_cf_dynamic: number | null;
  asian_away_cf_dynamic: number | null;
}

export interface RedisInplayPrematchTotalEntity {
  fixture_id: string;
  change_time: number;
  goal_total: number;
  goal_over: number;
  goal_under: number;
  goal_over_dynamic: number | null;
  goal_under_dynamic: number | null;
}

export interface RedisInplayPrematchWinEntity {
  fixture_id: string;
  change_time: number;
  odd_win_home: number;
  odd_draw: number;
  odd_win_away: number;
  odds_point_home: number;
  odds_point_away: number;
  odd_win_away_dynamic: number | null;
  odd_win_home_dynamic: number | null;
  odd_draw_dynamic: number | null;
}
