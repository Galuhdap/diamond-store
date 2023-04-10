import { RowDataPacket } from "mysql2";
import dbMysql from "../../../config/dbMysql";

class Cards{

    card_player = async () =>  {
        let Query:string
        Query = `SELECT COUNT(number_player) AS player FROM players`;
        const Rows = await dbMysql.DB!.execute(Query);
        return Rows as RowDataPacket[];
    }

    card_user = async () => {
        let Query:string
        Query = `SELECT COUNT(email) AS users FROM users`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    card_money = async () => {
        let Query:string
        Query = `SELECT SUM(nominal_payment) AS money FROM payment WHERE status_payment = 'succes'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    complete_payment = async () => {
        let Query:string;
        Query = `SELECT count(nominal_payment) AS complete FROM payment WHERE status_payment = 'succes'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    pending_payment = async () => {
        let Query:string;
        Query = `SELECT count(nominal_payment) AS pending FROM payment WHERE status_payment = 'pending'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

    order_in = async ()=> {
        let Query:string;
        Query = `SELECT count(status_payment) AS orderIn FROM payment WHERE status_payment = 'succes' OR status_payment ='pending'`;
        const rows = await dbMysql.DB!.execute(Query);
        return rows as RowDataPacket[];
    }

}

export default Cards;