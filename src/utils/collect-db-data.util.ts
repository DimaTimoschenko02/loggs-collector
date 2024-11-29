import {
  getChartCoeefsByFixtureId,
  getInplayEventsByMatchId,
  getInplayLeaguesByFixtureId,
  getInplayMainIsportsByMatchId,
  getInplayStatsByMatchId,
  getInplayTeamsByfixtureId,
  getMatchById,
  getPrematchAsian,
  getPrematchTotal,
  getPrematchWin,
} from "../database/database.service";

const collectDbData = async (fixtureId: string) => {
  const fixture: any = await getMatchById(fixtureId);

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
    getInplayEventsByMatchId(fixtureId),
    getInplayStatsByMatchId(fixtureId),
    getInplayMainIsportsByMatchId(fixtureId),
    getInplayTeamsByfixtureId(fixture.homeTeamId),
    getInplayTeamsByfixtureId(fixture.awayTeamId),
    getChartCoeefsByFixtureId(fixtureId),
    getInplayLeaguesByFixtureId(fixture.competitionId),
    getPrematchAsian(fixtureId),
    getPrematchWin(fixtureId),
    getPrematchTotal(fixtureId),
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

export default collectDbData;
