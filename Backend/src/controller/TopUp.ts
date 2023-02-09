import { Request, Response } from "express";
import Routers from "./Router/Router";
import TopUp from "../model/TopUpModel";


class TopupController extends Routers {

    model = new TopUp;

    constructor(){
        super();
        this.router.get('/topup', this.getId.bind(this));
        this.router.get('/topup/:id', this.getById.bind(this));
        this.router.post('/topup', this.createUser.bind(this));
    }

    async getId(req:Request, res:Response){
        try {
            const user = await this.model.getAll();
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async getById(req:Request, res:Response){
        try {
            const id = req.params.id;
            const user = await this.model.getId(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    async createUser(req:Request, res:Response){
        try {
            const {id_game, id_payment, diamond} = req.body
            const user = await this.model.insertTopup(id_game, id_payment, diamond);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
}

export default TopupController;