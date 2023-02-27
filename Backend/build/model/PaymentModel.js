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
const dbMysql_1 = __importDefault(require("../config/dbMysql"));
class Payment {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM payment`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.getId = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM payment WHERE id_payment = '${id}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.insertPayment = (metode_payment, number_player, nominal_payment, status_payment) => __awaiter(this, void 0, void 0, function* () {
            const Query = `INSERT INTO payment SET metode_payment = '${metode_payment}', number_player = ${number_player} , nominal_payment = ${nominal_payment} , status_payment = '${status_payment}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.deletePayment = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `DELETE FROM payment WHERE id_payment = '${id}`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
    }
}
exports.default = Payment;
