import { Pool } from 'pg' ;

//import { Pool } from 'pg';

console.log({
    user: process.env[''],
    host: process.env[''],
    database: process.env[''],
    password: process.env[''],
    port: 5432,
    max: 5,
});

export const connectionPool: Pool = new Pool({
    user: process.env[''],
    host: process.env[''],
    database: process.env[''],
    password: process.env[''],
    port: 5432,
    max: 5,
});


