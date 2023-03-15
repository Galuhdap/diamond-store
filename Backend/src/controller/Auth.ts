import { Request, Response } from "express";
import Routers from "./Router/Router";
import bcrypt, { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from "../model/AuthModel";
import "dotenv/config";
import config from "../web/config";



class AuthController extends Routers {

    model = new Auth; 

    constructor(){
        super();
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.delete('/logout', this.logout.bind(this));
        
    }

    async register(req:Request , res:Response){
        try {
            
            const {email, password, confPassword, role} = req.body;
            
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
            if(!email || !password || !confPassword) return res.status(400).json({msg: "Harus diisi"});
            
            if(!pattern.test(email)) return res.status(401).json({msg: "Check Your Email!!"});
            
            const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    
            const passwordLength = password.length;
            
            if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
            if(passwordLength < 8) return res.status(401).json({msg: "Password must be at least 8 characters long."});
            if(!regex.test(password)) return res.status(401).json({msg: "Password must contain at least one letter and one number"});
    
            
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password , salt);
    
            await this.model.register(email, hashPassword, role);
    
            res.status(200).json({msg: "Succes Create"});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }

    }

    async login(req:Request, res:Response){
        try {
            const {email , password} = req.body;

            
            const user = await this.model.login(email);

            if(!user[0]) res.status(400).json({ berhasil: false, data: null , msg:"Email Not Found" });

            const match = await bcrypt.compare(password, user[0].password);

            if (!match) return res.status(400).json({ berhasil: false, data: null,  msg:"Password Not Found"  });

            const id = user[0].id_user;
            const eml = user[0].email; 
            const role = user[0].role; 
            
            const accesToken =  jwt.sign({id, eml , role} , process.env.ACCESTOKEN as string ,{
                expiresIn: "20s"
            });
            
            const refreshToken =  jwt.sign({id , eml , role} , process.env.REFRESHTOKEN as string ,{
                expiresIn: "1d"
            });

            await this.model.refreshToken(refreshToken , id);

            res.cookie("refreshToken" , refreshToken , {
                httpOnly: true,
                maxAge: 20 * 60 * 60 * 1000
                
            })
            
            res.json({ berhasil: accesToken.length > 0, data: accesToken });

        } catch (error) {
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
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    
}

export default AuthController;