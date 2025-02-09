import { AppDataSource } from "../database/data-source";
import { Earthquake } from "../database/entities/Earthquake";
import csv from "csv-parser";
import * as fs from "fs";

async function seedData() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established.");

    const repository = AppDataSource.getRepository(Earthquake);

    if (!fs.existsSync(process.env.CSV_FILE_PATH)) {
      console.error("Error: CSV file not found.");
      process.exit(1);
    }

    await new Promise<void>((resolve, reject) => {
      const savePromises: Promise<void>[] = [];

      fs.createReadStream(process.env.CSV_FILE_PATH)
        .pipe(csv())
        .on("data", (row: any) => {
          const earthquake = new Earthquake();
          earthquake.location = `${row.Latitude}, ${row.Longitude}`;
          earthquake.magnitude = parseFloat(row.Magnitude);
          earthquake.date = new Date(row.DateTime);

          console.log("Saving earthquake:", earthquake);

          savePromises.push(
            repository
              .save(earthquake)
              .then((savedEarthquake) => {
                console.log("Earthquake saved:", savedEarthquake.id);
              })
              .catch((error) => {
                console.error("Error saving earthquake:", error);
                reject(error);
              })
          );
        })
        .on("end", async () => {
          console.log(
            "All earthquakes processed. Waiting for saves to complete..."
          );
          await Promise.all(savePromises);
          console.log("Seeding completed.");
          resolve();
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log("Database connection closed.");
  }
}

seedData();
