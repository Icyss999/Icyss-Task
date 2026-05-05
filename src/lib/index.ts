import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import {config} from "dotenv"

config({path: ".env.local"})

const sql = new Pool({
    connectionString : process.env.DATABASE_URL,
    connectionTimeoutMillis : 7000,
    ssl: true,

})


export const db = drizzle(sql)