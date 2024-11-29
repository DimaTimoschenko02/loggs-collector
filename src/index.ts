import fs from "fs";
import * as readline from "node:readline";
import path from "path";
import { getArgvArgumentUtil } from "./utils/get-argv-argument.util";
import collectDbData from "./utils/collect-db-data.util";
import collectRedisData from "./utils/collect-redis-data.util";

console.log(process.argv);

const outputFilePath = getArgvArgumentUtil("res_path", true);
const logsFolder = path.resolve(
  process.cwd(),
  `../${getArgvArgumentUtil("logs_path", false)}`,
);
const fixtureId = getArgvArgumentUtil("fixture_id", false);
const outputFile = outputFilePath
  ? `${fixtureId}-${outputFilePath}.json`
  : `${fixtureId}-data.json`;
const outputFolderPath = `./match-logs/${outputFile}-${Date.now()}.json`;

console.log({
  logsFolder,
  fixtureId,
  outputFile,
  outputFilePath,
  outputFolderPath,
});

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

    const [dbData, redisData] = await Promise.all([
      collectDbData(fixtureId),
      collectRedisData(fixtureId),
    ]);

    const fileData = {
      fixtureId,
      logs: logFiles,
      redis: redisData,
      db: dbData,
    };

    // console.dir(fileData, { depth: null });

    fs.writeFileSync(outputFolderPath, JSON.stringify(fileData, null, 2));
    console.log(`Results saved - ${outputFolderPath}`);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

// collectDbData("zp5rzgh5dnylq82").then((data) =>
//   console.dir({ db: data }, { depth: null }),
// );
// collectRedisData("zp5rzgh5dnylq82").then((data) =>
//   console.dir({ redis: data }, { depth: null }),
// );

processLogsFolder(logsFolder).then(() => console.log("finished"));
