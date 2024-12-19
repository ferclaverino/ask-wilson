import { sql } from "@vercel/postgres";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import "dotenv/config";

export async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS sensors (
      timestamp timestamp NOT NULL,
      sensor1_volume DECIMAL(10, 2) NOT NULL,
      sensor1_flow DECIMAL(10, 2) NOT NULL
    );
  `;

  console.log(`Created "sensors" table`);

  const results: any[] = [];
  const csvFilePath = path.join(process.cwd(), "sensors.csv");

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", resolve)
      .on("error", reject);
  });

  for (const row of results) {
    await sql`
      INSERT INTO sensors (timestamp, sensor1_volume, sensor1_flow)
      VALUES (
        ${row["timestamp"]},
        ${row["sensor1_volume"]},
        ${row["sensor1_flow"]}
      );
    `;
  }

  console.log(`Seeded ${results.length} sensors`);

  return {
    createTable,
    sensors: results,
  };
}

seed().catch(console.error);
