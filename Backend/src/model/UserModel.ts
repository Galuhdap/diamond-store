import { RowDataPacket } from "mysql2";
import dbMysql from "../config/dbMysql";

class User {
    
    getUser = async () =>  {
        const Query = `SELECT * FROM users`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[] 
    }

    getUserByid = async (id:String) =>  {
        const Query = `SELECT * FROM users WHERE id_user = '${id}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[] 
    }

    createUser = async (email:String, hashpassword:String, role:String) =>  {
        const Query = `INSERT INTO users SET email = '${email}', password = '${hashpassword}' , role = '${role}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[] 
    }

    updateUser = async (email:String, hashpassword:String, role:String , id:String) =>  {
        const Query = `UPDATE users SET email = '${email}', password = '${hashpassword}', role = '${role}' WHERE id_user = '${id}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[] 
    }

    deleteUser = async (id:String) =>  {
        const Query = `DELETE FROM users WHERE id_user = '${id}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[] 
    }
}

export default User;