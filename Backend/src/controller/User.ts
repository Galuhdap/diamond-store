import { Request, Response } from "express";
import User from "../model/UserModel";
import Routers from "./Router/Router";
import bcrtpy from "bcrypt";
import VerifyAuth from "../middleware/verifyAuth";


class UserController extends Routers {

    model = new User;
    verify =  new VerifyAuth;

    constructor(){
        super();
        this.router.get('/user', this.verify.verifyToken, this.verify.verfiyRole ,this.getId.bind(this));
        this.router.get('/user/:id', this.getById.bind(this));
        this.router.post('/user', this.verify.verifyToken, this.verify.verfiyRole, this.createUser.bind(this));
        this.router.post('/user/:id', this.verify.verifyToken, this.verify.verfiyRole,  this.updateUser.bind(this));
        this.router.delete('/user/:id', this.verify.verifyToken, this.verify.verfiyRole, this.deleteUser.bind(this));
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
            const {email, password, confPassword, role} = req.body

            if(password != confPassword) return res.json("Password Tidak Cocok");

            const salt = await bcrtpy.genSalt();
            const hashPassword = await bcrtpy.hash(password , salt);

            const user = await this.model.createUser(email, hashPassword, role);

            res.status(200).json({msg: "Succes Create"});

        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    async updateUser(req:Request, res:Response){
        try {
            const id = req.params.id;
            const {email, confPassword,password, role} = req.body;

            let hashPassword;
            
            const user = await this.model.getUserByid(id);

            if(!user.length) return res.json({msg: "User Tidak Di Temukan"});
            if(password != confPassword) return res.json("Password Tidak Cocok");

            if(password == "" && confPassword == null) {
                hashPassword = user[0].password
            } else {
                const salt = await bcrtpy.genSalt();
                hashPassword = await bcrtpy.compare(password , salt);
            }
            
            const row = await this.model.updateUser(email, hashPassword, role, id );
            res.status(200).json({msg: "Update Oke"});
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

export default UserController;