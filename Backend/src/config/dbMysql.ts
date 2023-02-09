import mysql from 'mysql2/promise'

class dbMysql {

    static DB:mysql.Connection;

    static async init(){
        this.DB = await mysql.createConnection({
            host: 'localhost',
            user:'root',
            database: 'diamond_store'
        })
    }
}

export default dbMysql;