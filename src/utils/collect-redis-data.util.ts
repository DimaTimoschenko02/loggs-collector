import jsonRedis from "../redis";
import {
  getChartCoeff,
  getInplayEvents,
  getInplayLeagues,
  getInplayMainIsports,
  getInplayStats,
  getInplayTeams,
  getRedisPrematchAsian,
  getRedisPrematchWin,
} from "../redis/redis.service";

const collectRedisData = async (fixtureId: string) => {
  const fixture = await jsonRedis.get(`inplay_fixtures:${fixtureId}`);

  const lastPrematchTotalTimestamp =
    fixture.prematch_odds_total?.length > 0
      ? fixture.prematch_odds_total[fixture.prematch_odds_total.length - 1]
      : null;

  const lastPrematchAsianTimestamp =
    fixture.prematch_odds_asian?.length > 0
      ? fixture.prematch_odds_asian[fixture.prematch_odds_asian.length - 1]
      : null;

  const lastPrematchWinTimestamp =
    fixture.prematch_odds_win?.length > 0
      ? fixture.prematch_odds_win[fixture.prematch_odds_win.length - 1]
      : null;

  const [
    events,
    stats,
    main_isports,
    homeTeam,
    awayTeam,
    chart_coeff,
    leagues,
    prematch_asian,
    prematch_win,
    prematch_total,
  ] = await Promise.all([
    getInplayEvents(fixtureId),
    getInplayStats(fixtureId),
    getInplayMainIsports(fixtureId),
    getInplayTeams(fixture.homeTeamId),
    getInplayTeams(fixture.awayTeamId),
    getChartCoeff(fixtureId),
    getInplayLeagues(fixture.competitionId),
    lastPrematchAsianTimestamp
      ? getRedisPrematchAsian(fixtureId, lastPrematchAsianTimestamp)
      : null,
    lastPrematchWinTimestamp
      ? getRedisPrematchWin(fixtureId, lastPrematchWinTimestamp)
      : null,
    lastPrematchTotalTimestamp
      ? getRedisPrematchWin(fixtureId, lastPrematchTotalTimestamp)
      : null,
  ]);

  return {
    fixture,
    events,
    stats,
    main_isports,
    teams: { homeTeam, awayTeam },
    chart_coeff,
    leagues,
    prematch_asian,
    prematch_win,
    prematch_total,
  };
};

export default collectRedisData;
