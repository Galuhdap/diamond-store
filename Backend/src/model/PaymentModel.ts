import {RowDataPacket} from "mysql2"
import dbMysql from "../config/dbMysql"

class Payment{

    getAll = async () => {
        const Query = `SELECT * FROM payment`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    getId = async (id:String) => {
        const Query = `SELECT * FROM payment WHERE id_payment = '${id}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    insertPayment = async (metode_payment:String , number_player:String , nominal_payment:Number , status_payment:String) => {
        const Query = `INSERT INTO payment SET metode_payment = '${metode_payment}', number_player = ${number_player} , nominal_payment = ${nominal_payment} , status_payment = '${status_payment}'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    deletePayment = async (id:String) => {
        const Query = `DELETE FROM payment WHERE id_payment = '${id}`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }
}

export default Payment;