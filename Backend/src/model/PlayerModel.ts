import {RowDataPacket} from "mysql2"
import dbMysql from "../config/dbMysql"

class Player{

    getAll = async () => {
        const Query = `SELECT * FROM players`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    insertPlayer = async (number_player:String , nama_player:String) => {
        const Query = `INSERT INTO players SET number_player = '${number_player}' , nama_player = '${nama_player}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
}

export default Player;