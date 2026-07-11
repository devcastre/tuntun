const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
    // Get arguments from command line
    const [,, filePath, tableName, columnsArg] = process.argv;

    if (!filePath || !tableName || !columnsArg) {
        console.error('Usage: node scripts/import-layer.js <filePath> <tableName> <columns>');
        console.error('Example: node scripts/import-layer.js public/data/regions.json regions name');
        console.error('Example (multiple columns): node scripts/import-layer.js public/data/provinces.json provinces name,region');
        process.exit(1);
    }

    // columnsArg is comma-separated, e.g. "name,region,province"
    const columnMappings = columnsArg.split(',').map(pair => {
        const [column, property] = pair.split(':');
        return { column, property: property || column };
    });
    const columns = columnMappings.map(m => m.column);

    const data = JSON.parse(fs.readFileSync(filePath));

    const client = new Client({
        connectionString: process.env.SUPABASE_DB_URL,
    });
    await client.connect();

    console.log(`Importing ${data.features.length} features into "${tableName}"...`);

    for (const feature of data.features) {
        const props = feature.properties;
        const geojsonGeom = JSON.stringify(feature.geometry);

        // Build column names and placeholders dynamically
        const colNames = [...columns, 'geom'].join(', ');
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const values = columnMappings.map(m => props[m.property]);

        await client.query(
        `insert into ${tableName} (${colNames}) 
        values (${placeholders}, ST_SetSRID(ST_GeomFromGeoJSON($${columns.length + 1}), 4326))`,
        [...values, geojsonGeom]
        );
    }

    console.log('Done!');
    await client.end();
    }

    main().catch(err => {
    console.error('Import failed:', err);
    process.exit(1);
    });