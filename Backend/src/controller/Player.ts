import { Request, Response } from "express";
import Routers from "./Router/Router";
import Player from "../model/PlayerModel";


class PlayerController extends Routers {

    model = new Player;

    constructor(){
        super();
        this.router.get('/player', this.getAll.bind(this));
        this.router.get('/player/:id', this.getById.bind(this));
        this.router.post('/player', this.insertPlayer.bind(this));
    }

    async getAll(req:Request, res:Response){
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
            const user = await this.model.getById(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    async insertPlayer(req:Request, res:Response){
        try {
            const {number_player , nama_player} = req.body
            const user = await this.model.insertPlayer(number_player , nama_player);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
}

export default PlayerController;