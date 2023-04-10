import { Request, Response } from "express";
import Cards from "../../../model/Dashboard/Home/Cards";
import Routers from "../../Router/Router";


class CardContoller extends Routers {

    model = new Cards;

    constructor(){
        super();
        this.router.get('/cardusers',this.users.bind(this));
        this.router.get('/cardplayer', this.players.bind(this));
        this.router.get('/cardmoney', this.money.bind(this));
        this.router.get('/cardcomplete', this.payment_complete.bind(this));
        this.router.get('/cardpending', this.payment_pending.bind(this));
        this.router.get('/cardin', this.order_in.bind(this));
        this.router.get('/cardout', this.order_out.bind(this));
    }

    async users (req:Request , res:Response){
        const rows = await this.model.card_user();
        res.status(200).json({payload: rows});
    }

    async players (req:Request , res:Response){
        const rows = await this.model.card_player();
        res.status(200).json({payload: rows});
    }

    async money (req:Request , res:Response){
        const rows = await this.model.card_money();
        res.status(200).json({payload: rows});
    }

    async payment_complete (req:Request , res:Response){
        const rows = await this.model.complete_payment();
        res.status(200).json({payload: rows});
    }
    async payment_pending (req:Request , res:Response){
        const rows = await this.model.pending_payment();
        res.status(200).json({payload: rows});
    }

    async order_in (req:Request , res:Response){
        const rows = await this.model.order_in();
        res.status(200).json({payload: rows});
    }

    async order_out (req:Request , res:Response){
        const rows = await this.model.complete_payment();
        res.status(200).json({payload: rows});
    }

    
}

export default CardContoller;