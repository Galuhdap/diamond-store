import { Request, Response } from "express";
import Routers from "./Router/Router";
import TopUp from "../model/TopUpModel";
import VerifyAuth from "../middleware/verifyAuth";


class TopupController extends Routers {
 
    model = new TopUp;
    verify =  new VerifyAuth;

    constructor(){
        super();
        this.router.get('/topup', this.verify.verifyToken, this.verify.verfiyRole, this.getId.bind(this));
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