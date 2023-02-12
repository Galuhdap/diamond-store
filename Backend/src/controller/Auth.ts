import { Request, Response } from "express";
import Routers from "./Router/Router";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from "../model/AuthModel";


class AuthController extends Routers {

    model = new Auth; 

    constructor(){
        super();
        this.router.post('/login', this.login.bind(this));
        this.router.delete('/logout', this.logout.bind(this));
        
    }

    async login(req:Request, res:Response){
        try {
            const {email , password} = req.body;
            
            const user = await this.model.login(email);
            console.log(password);
            console.log(user[0].password);
            const match = await bcrypt.compare(password, user[0].password);
            console.log(match);
            if (!match) return res.status(400).json({ berhasil: false, data: null });

            const id = user[0].id_user;
            const eml = user[0].email; 
            const role = user[0].role; 
            
            const accesToken =  jwt.sign({id, eml , role} , "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF" ,{
                expiresIn: "20s"
            })
            
            const refreshToken =  jwt.sign({id , eml , role} , "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23",{
                expiresIn: "1d"
            })

            await this.model.refreshToken(refreshToken , id);

            res.cookie("refreshToken" , refreshToken , {
                httpOnly: true,
                maxAge: 20 * 60 * 60 * 1000
                
            })
            
            res.json({ berhasil: accesToken.length > 0, data: accesToken });

        } catch (error) {
            console.log(error);
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async logout(req:Request, res:Response){
        try {
           const refreshToken = req.cookies.refreshToken;
           if(!refreshToken) return res.status(400);
           const user = await this.model.logout(refreshToken);

           const id = user[0].id_user;

           await this.model.clearToken(id);

           res.clearCookie("refreshToken");

           res.status(200).json({ msg: "Succes Logout" });
        } catch (error) {
            console.log(error);
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    
}

export default AuthController;