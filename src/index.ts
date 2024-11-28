import fs from "fs";
import * as readline from "node:readline";
import path from "path";
import { getArgvArgumentUtil } from "./utils/get-argv-argument.util";
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
} from "./database/database.service";

const logsFolder = getArgvArgumentUtil("logs_path", false);
const fixtureId = getArgvArgumentUtil("fixture_id", false);
const outputFile = getArgvArgumentUtil("res_path", true)
  ? `${fixtureId}-${getArgvArgumentUtil("res_path", true)}.json`
  : `${fixtureId}-data.json`;
const outputFolderPath = `./match-logs/${outputFile}`;

const matchingLogs: any[] = [];

const processLogFile = async (filePath: string): Promise<void> => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    try {
      const log = JSON.parse(line);
      if (
        log?.fixture_id === fixtureId ||
        log?.["0"] === fixtureId ||
        log?.fixture?.id === fixtureId
      ) {
        matchingLogs.push(log);
      }
    } catch (error) {
      console.error("Некорректный JSON:", line);
    }
  }
  console.log(`Файл ${filePath} обработан.`);
};

const processLogsFolder = async (folderPath: string): Promise<void> => {
  try {
    const files = fs.readdirSync(folderPath);

    const logFiles = files.filter((file) => file.endsWith(".log"));

    for (const file of logFiles) {
      const filePath = path.join(folderPath, file);
      await processLogFile(filePath);
    }

    const [
      fixture,
      events,
      stats,
      main_isports,
      teams,
      chart_coeff,
      leagues,
      prematch_asian,
      prematch_win,
      prematch_total,
    ] = await Promise.all([
      getMatchById(fixtureId),
      getInplayEventsByMatchId(fixtureId),
      getInplayStatsByMatchId(fixtureId),
      getInplayMainIsportsByMatchId(fixtureId),
      getInplayTeamsByfixtureId(fixtureId),
      getChartCoeefsByFixtureId(fixtureId),
      getInplayLeaguesByFixtureId(fixtureId),
      getPrematchAsian(fixtureId),
      getPrematchWin(fixtureId),
      getPrematchTotal(fixtureId),
    ]);

    const fileData = {
      fixture,
      events,
      stats,
      main_isports,
      teams,
      chart_coeff,
      leagues,
      prematch_asian,
      prematch_win,
      prematch_total,
      logs: matchingLogs,
    };

    fs.writeFileSync(outputFolderPath, JSON.stringify(fileData, null, 2));
    console.log(`Results saved - ${outputFolderPath}`);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

processLogsFolder(logsFolder).then(() => console.log("finished"));
