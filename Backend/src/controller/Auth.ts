import { Request, Response } from "express";
import Routers from "./Router/Router";
import bcrypt from 'bcrypt';
import jswt from 'jsonwebtoken';
import Auth from "../model/AuthModel";


class AuthController extends Routers {

    model = new Auth; 

    constructor(){
        super();
        this.router.get('/user', this.login.bind(this));
        
    }

    async login(req:Request, res:Response){
        try {
            const user = await this.model.login()
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async logout(req:Request, res:Response){
        try {
           
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    
}

export default AuthController;