"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
const Router_1 = __importDefault(require("./Router/Router"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyAuth_1 = __importDefault(require("../middleware/verifyAuth"));
class UserController extends Router_1.default {
    constructor() {
        super();
        this.model = new UserModel_1.default;
        this.verify = new verifyAuth_1.default;
        this.router.get('/user', this.verify.verifyToken, this.getId.bind(this));
        this.router.get('/user/:id', this.getById.bind(this));
        this.router.post('/user', this.createUser.bind(this));
        this.router.post('/user/:id', this.updateUser.bind(this));
        this.router.delete('/user/:id', this.deleteUser.bind(this));
    }
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.getUser();
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.model.getUserByid(id);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, confPassword, role } = req.body;
                if (password != confPassword)
                    return res.json("Password Tidak Cocok");
                const salt = yield bcrypt_1.default.genSalt();
                const hashPassword = yield bcrypt_1.default.hash(password, salt);
                const user = yield this.model.createUser(email, hashPassword, role);
                res.status(200).json({ msg: "Succes Create" });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { email, confPassword, password, role } = req.body;
                let hashPassword;
                const user = yield this.model.getUserByid(id);
                if (!user.length)
                    return res.json({ msg: "User Tidak Di Temukan" });
                if (password != confPassword)
                    return res.json("Password Tidak Cocok");
                if (password == "" && confPassword == null) {
                    hashPassword = user[0].password;
                }
                else {
                    const salt = yield bcrypt_1.default.genSalt();
                    hashPassword = yield bcrypt_1.default.compare(password, salt);
                }
                const row = yield this.model.updateUser(email, hashPassword, role, id);
                res.status(200).json({ msg: "Update Oke" });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.model.deleteUser(id);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
}
exports.default = UserController;
