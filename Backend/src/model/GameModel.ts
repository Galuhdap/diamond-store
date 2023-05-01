import {RowDataPacket} from "mysql2"
import dbMysql from "../config/dbMysql"

class Game{

    getAll = async () => {
        const Query = `SELECT * FROM games`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    getId = async (id:Number) => {
        const Query = `SELECT * FROM games WHERE id_games = ?`;
        const rows = await dbMysql.DB!.execute(Query, [id]);
        return rows as RowDataPacket[];
    }

    insertGame = async (name_game:String) => {
        const Query = `INSERT INTO games SET name_game = '${name_game}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    deleteGame = async (id:String) => {
        const Query = `DELETE FROM games WHERE id_games = '${id}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
}

export default Game;