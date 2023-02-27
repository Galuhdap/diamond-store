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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthModel_1 = __importDefault(require("../model/AuthModel"));
class VerifyAuth {
    constructor() {
        this.model = new AuthModel_1.default();
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeaders = req.headers['authorization'];
                console.log(authHeaders);
                const token = authHeaders && authHeaders.split(' ')[1];
                if (token == null)
                    return res.status(401);
                jsonwebtoken_1.default.verify(token, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", (err, decoded) => {
                    if (err)
                        return res.status(401).json("Token Expaied");
                    req.body.email = decoded;
                    next();
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshtoken = req.cookies.refreshToken;
                if (!refreshtoken)
                    return res.status(401);
                const user = yield this.model.logout(refreshtoken);
                if (!user[0])
                    return res.status(401);
                jsonwebtoken_1.default.verify(refreshtoken, "KDMKFMSDMFPK203I23NPJJV4I5IDF37H5HHHICJEWKMFCCIRIR3R23", (err, decoded) => {
                    if (err)
                        return res.status(401);
                    const id = user[0].id_user;
                    const eml = user[0].email;
                    const role = user[0].role;
                    const accesToken = jsonwebtoken_1.default.sign({ id, eml, role }, "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF", {
                        expiresIn: "20s"
                    });
                    res.status(200).json({ payload: accesToken });
                });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
}
exports.default = VerifyAuth;
