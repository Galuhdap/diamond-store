import { Request, Response } from "express";
import User from "../model/UserModel";
import Routers from "./Router/Router";


class AuthController extends Routers {

    model = new User; 

    constructor(){
        super();
        this.router.get('/user', this.getId.bind(this));
        this.router.get('/user/:id', this.getById.bind(this));
        this.router.post('/user', this.createUser.bind(this));
        this.router.post('/user/:id', this.updateUser.bind(this));
        this.router.delete('/user/:id', this.deleteUser.bind(this));
    }

    async getId(req:Request, res:Response){
        try {
            const user = await this.model.getUser();
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async getById(req:Request, res:Response){
        try {
            const id = req.params.id;
            const user = await this.model.getUserByid(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    async createUser(req:Request, res:Response){
        try {
            const {email, hashpassword, role} = req.body
            const user = await this.model.createUser(email, hashpassword, role);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    async updateUser(req:Request, res:Response){
        try {
            const id = req.params.id;
            const {email, hashpassword, role} = req.body
            const user = await this.model.updateUser(email, hashpassword, role, id );
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async deleteUser(req:Request, res:Response){
        try {
            const id = req.params.id;
            const user = await this.model.deleteUser(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
}

export default AuthController;