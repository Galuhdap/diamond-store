import { Request, Response } from "express";
import Routers from "./Router/Router";
import Payment from "../model/PaymentModel";
import VerifyAuth from "../middleware/verifyAuth";


class PaymentController extends Routers {

    model = new Payment;
    verify =  new VerifyAuth;

    constructor(){
        super();
        this.router.get('/payment', this.verify.verifyToken, this.verify.verfiyRole, this.getId.bind(this));
        this.router.get('/payment/:id', this.getById.bind(this));
        this.router.post('/payment', this.createUser.bind(this));
        this.router.delete('/payment/:id', this.verify.verifyToken, this.verify.verfiyRole, this.deletePayment.bind(this));
    }

    async getId(req:Request, res:Response){
        try {
            const user = await this.model.getAll();
            console.log(user)
            res.json({user})
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
            const {metode_payment , number_player , nominal_payment , status_payment} = req.body
            const user = await this.model.insertPayment(metode_payment , number_player , nominal_payment , status_payment);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async deletePayment(req:Request, res:Response){
        try {
            const id = req.params.id;
            const user = await this.model.deletePayment(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
}

export default PaymentController;