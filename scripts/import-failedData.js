const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const failed = JSON.parse(fs.readFileSync('failed-barangays.json'));

  const client = new Client({ connectionString: process.env.SUPABASE_DB_URL });
  await client.connect();

  let inserted = 0;
  let skipped = 0;

  for (const item of failed) {
    if (!item.center_lat || !item.center_lon) {
      console.log(`Skipping ${item.name} — no center coordinates available`);
      skipped++;
      continue;
    }

    await client.query(
      `insert into barangays (name, city, province, region, geom)
       values ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($5, $6), 4326))`,
      [item.name, item.city, item.province, item.region, item.center_lon, item.center_lat]
    );
    console.log(`Inserted point for: ${item.name}`);
    inserted++;
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);
  await client.end();
}

main();