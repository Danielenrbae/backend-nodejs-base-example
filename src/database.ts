import { Pool } from "pg";


export async function connect(): Promise<Pool> {

    const pool = await new Pool({
        user: 'postgres',
        host: 'localhost',
        password: 'postgres',
        database: 'test',
        port: 5432
    });

    return pool;
}