import { MatchState } from "../enums/match-state.enum";

export interface RedisMatchEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
  start_time?: number;
  first_half_start: number;
  second_half_start: number | null;
  overtime_start: number | null;
  state: MatchState;
  minute: number;
  minute_string: string;
  inplay_events: number[];
  score: number[];
  stats: number[];
  odds_win: number[];
  odds_asian: number[];
  odds_total: number[];
  prematch_odds_win: number[];
  prematch_odds_asian: number[];
  prematch_odds_total: number[];
  inplay_main_isports: number[];
  inplay_stats: number[];
  prematch_odds_win_first: number | null;
  prematch_odds_win_count: number | null;
  prematch_odds_asian_first: number | null;
  prematch_odds_asian_count: number | null;
  prematch_odds_total_first: number | null;
  prematch_odds_total_count: number | null;
  state_array_fixtures: Array<MatchState>;
  state_array_scores: Array<MatchState>;
  inplay_events_1: number;
  inplay_events_2: number;
  inplay_events_3: number;
  inplay_events_4: number;
  inplay_events_5: number;
  inplay_events_6: number;
  is_database: boolean;
}
