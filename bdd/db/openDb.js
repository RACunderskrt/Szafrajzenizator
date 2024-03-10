import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function connectSQlite(){
    const db = await open({
        filename: '../db/dbSafra.db',
        driver: sqlite3.Database
    })

    return db
}
