import {RowDataPacket} from "mysql2"
import dbMysql from "../config/dbMysql"

class TopUp{

    getAll = async () => {
        const Query = `SELECT * FROM topup`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    getId = async (id:String) => {
        const Query = ` SELECT * FROM topup WHERE id_topup = '${id}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    insertTopup = async (id_game:Number , id_payment:Number , diamond:Number) => {
        const Query = `INSERT INTO topup SET id_game = ${id_game} , id_payment = ${id_payment}, diamond = ${diamond}`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
}

export default TopUp;