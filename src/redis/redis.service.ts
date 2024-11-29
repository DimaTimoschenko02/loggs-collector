import jsonRedis from "./index";

export const getInplayMainIsports = async (fixtureId: string) => {
  const response = [];
  for (let i = 0; i < 90; i++) {
    response.push(await jsonRedis.get(`inplay_main_isports:${fixtureId}:${i}`));
  }

  return response;
};

export const getInplayStats = async (fixtureId: string) => {
  const response = [];
  for (let i = 0; i < 90; i++) {
    response.push(await jsonRedis.get(`inplay_stats:${fixtureId}:${i}`));
  }

  return response;
};

export const getInplayEvents = async (fixtureId: string) => {
  const response = [];
  for (let i = 0; i < 90; i++) {
    response.push(await jsonRedis.get(`inplay_events:${fixtureId}:${i}`));
  }

  return response;
};

export const getRedisPrematchAsian = (fixtureId: string, timestamp: number) => {
  return jsonRedis.get(`inplay_prematch_asian:${fixtureId}:${timestamp}`);
};

export const getRedisPrematchTotal = (fixtureId: string, timestamp: number) => {
  return jsonRedis.get(`inplay_prematch_total:${fixtureId}:${timestamp}`);
};

export const getRedisPrematchWin = (fixtureId: string, timestamp: number) => {
  return jsonRedis.get(`inplay_prematch_win:${fixtureId}:${timestamp}`);
};

export const getChartCoeff = (fixtureId: string) => {
  return jsonRedis.get(`inplay_chart_coeff:${fixtureId}`);
};

export const getInplayTeams = async (teamId: string) => {
  return jsonRedis.get(`inplay_teams:${teamId}`);
};

export const getInplayLeagues = async (competitionId: string) => {
  return jsonRedis.get(`inplay_leagues:${competitionId}`);
};
