import pkg from 'pg';
const {Pool} = pkg;
import 'dotenv/config'
//Connect to the db on the server
export const pool = new Pool({
    connectionString: process.env.DB_LINK,
    ssl: {
        rejectUnauthorized: false
    }
});