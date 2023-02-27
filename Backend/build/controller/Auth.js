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
const Router_1 = __importDefault(require("./Router/Router"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthModel_1 = __importDefault(require("../model/AuthModel"));
class AuthController extends Router_1.default {
    constructor() {
        super();
        this.model = new AuthModel_1.default;
        this.router.post('/login', this.login.bind(this));
        this.router.delete('/logout', this.logout.bind(this));
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, confPassword, role } = req.body;
            if (password != confPassword)
                return res.status(401);
            const salt = yield bcrypt_1.default.genSalt();
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(req.body);
                const user = yield this.model.login(email);
                const match = yield bcrypt_1.default.compare(password, user[0].password);
                if (!match)
                    return res.status(400).json({ berhasil: false, data: null });
                const id = user[0].id_user;
                const eml = user[0].email;
                const role = user[0].role;
                const accesToken = jsonwebtoken_1.default.sign({ id, eml, role }, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", {
                    expiresIn: "20s"
                });
                const refreshToken = jsonwebtoken_1.default.sign({ id, eml, role }, "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23", {
                    expiresIn: "1d"
                });
                yield this.model.refreshToken(refreshToken, id);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 20 * 60 * 60 * 1000
                });
                res.json({ berhasil: accesToken.length > 0, data: accesToken });
            }
            catch (error) {
                console.log(error);
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken)
                    return res.status(400);
                const user = yield this.model.logout(refreshToken);
                const id = user[0].id_user;
                yield this.model.clearToken(id);
                res.clearCookie("refreshToken");
                res.status(200).json({ msg: "Succes Logout" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
}
exports.default = AuthController;
