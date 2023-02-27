import {RowDataPacket} from "mysql2"
import dbMysql from "../config/dbMysql"

class Auth{

    register = async (email:String, hashpassword:String, role:String) =>  {
        const Query = `INSERT INTO users SET email = '${email}', password = '${hashpassword}' , role = '${role}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[] 
    }

    login = async (email:String) => {
        const Query = `SELECT * FROM users WHERE email = '${email}'`;
        const [rows] = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    refreshToken = async (refresh_token:String , id_user:Number) => {
        const Query = `UPDATE users SET refresh_token = '${refresh_token}' WHERE id_user = '${id_user}'`;
        const [rows] = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    logout = async (refresh_token:String ) => {
        const Query = `SELECT * FROM users WHERE refresh_token = '${refresh_token}'`;
        const [rows] = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    clearToken = async (id_user:Number) => {
        const Query = `UPDATE users SET refresh_token = NULL WHERE id_user = '${id_user}'`;
        const [rows] = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    adminOnly = async (id_user:Number) => {
        const Query = `SELECT * FROM users WHERE id_user = '${id_user}'`;
        const [rows] = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

}

export default Auth;