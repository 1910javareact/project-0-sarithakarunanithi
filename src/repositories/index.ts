import { Pool } from 'pg' ;

// our secret data should be hide , so we can assign our data to an in env. var

export const connectionPool: Pool = new Pool({
    user: process.env['PROJECT0_USERNAME'],
    host: process.env['PROJECT0_HOST'],
    database: process.env['PROJECT0_DATABASE'],
    password: process.env['PROJECT0_PASSWORD'],
    port: 5432,
    max: 5,
});


