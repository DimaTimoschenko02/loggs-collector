import { knexInstance } from "./index";

export const getInplayMainIsportsByMatchId = async (fixtureId: string) => {
  return knexInstance("inplay_main_isports")
    .where("fixture_id", fixtureId)
    .orderBy("minute", "DESC");
};

export const getMatchById = async (id: string) => {
  return knexInstance("inplay_fixtures").where("id", id).first();
};

export const getInplayStatsByMatchId = async (matchId: string) => {
  return knexInstance("inplay_stats")
    .where("fixture_id", matchId)
    .orderBy("minute");
};

export const getInplayEventsByMatchId = async (matchId: string) => {
  return knexInstance("inplay_events")
    .where("fixture_id", matchId)
    .orderBy("minute");
};

export const getPrematchAsian = async (id: string) => {
  return knexInstance("inplay_prematch_asian")
    .where("fixture_id", id)
    .orderBy("createdAt")
    .first();
};

export const getPrematchTotal = async (id: string) => {
  return knexInstance("inplay_prematch_total")
    .where("fixture_id", id)
    .orderBy("createdAt", "desc")
    .first();
};

export const getPrematchWin = async (id: string) => {
  return knexInstance("inplay_prematch_win")
    .where("fixture_id", id)
    .orderBy("createdAt", "desc")
    .first();
};

export const getInplayTeamsByfixtureId = async (teamId: string) => {
  return knexInstance("inplay_teams").where("team_id", teamId).first();
};

export const getInplayLeaguesByFixtureId = async (competitionId: string) => {
  return knexInstance("inplay_leagues").where("league_id", competitionId);
};

export const getChartCoeefsByFixtureId = async (fixtureId: string) => {
  return knexInstance("inplay_chart_coeff").where("fixture_id", fixtureId);
};
