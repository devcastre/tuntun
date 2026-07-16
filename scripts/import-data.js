const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
    // Get arguments from command line
    const [,, filePath, tableName, columnsArg] = process.argv;

    const failedFeatures = [];

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

    for (const [index, feature] of data.features.entries()) {
        const props = feature.properties;
        const geojsonGeom = JSON.stringify(feature.geometry);

        // Build column names and placeholders dynamically
        const colNames = [...columns, 'geom'].join(', ');
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const values = columnMappings.map(m => props[m.property]);

        try {
            await client.query(
                `insert into ${tableName} (${colNames}) 
                values (${placeholders}, ST_MakeValid(ST_SetSRID(ST_GeomFromGeoJSON($${columns.length + 1}), 4326)))`,
                [...values, geojsonGeom]
            );
        } catch (err) {
            console.error(`Failed at feature index ${index}: ${feature.properties[columnMappings[0].property]}`);
            failedFeatures.push({
                index,
                name: props[columnMappings.find(m => m.column === 'name')?.property] || null,
                city: props[columnMappings.find(m => m.column === 'city')?.property] || null,
                province: props[columnMappings.find(m => m.column === 'province')?.property] || null,
                region: props[columnMappings.find(m => m.column === 'region')?.property] || null,
                center_lat: props.center_lat || null,
                center_lon: props.center_lon || null,
                error: err.message
            });
            continue;
        }
    }

    console.log('Done!');

    
    if (failedFeatures.length > 0) {
        fs.writeFileSync(`failed-${tableName}.json`, JSON.stringify(failedFeatures, null, 2));
        console.log(`${failedFeatures.length} features failed — saved to failed-${tableName}.json`);
    } else {
        console.log('No failures — all features imported successfully.');
    }

    await client.end();
    }

    main().catch(err => {
    console.error('Import failed:', err);
    process.exit(1);
    });