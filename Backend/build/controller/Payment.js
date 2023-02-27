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
const PaymentModel_1 = __importDefault(require("../model/PaymentModel"));
class PaymentController extends Router_1.default {
    constructor() {
        super();
        this.model = new PaymentModel_1.default;
        this.router.get('/payment', this.getId.bind(this));
        this.router.get('/payment/:id', this.getById.bind(this));
        this.router.post('/payment', this.createUser.bind(this));
        this.router.delete('/payment/:id', this.deletePayment.bind(this));
    }
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.getAll();
                console.log(user);
                res.json({ user });
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
                const user = yield this.model.getId(id);
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
                const { metode_payment, number_player, nominal_payment, status_payment } = req.body;
                const user = yield this.model.insertPayment(metode_payment, number_player, nominal_payment, status_payment);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.model.deletePayment(id);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
}
exports.default = PaymentController;
