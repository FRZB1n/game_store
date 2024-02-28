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
const order_1 = __importDefault(require("../models/order"));
class orders {
    constructor(options) {
        this.id = options.id;
        this.employee_id = options.employee_id;
        this.client_id = options.client_id;
        this.db = new order_1.default();
    }
    to_map(data) {
        let ord = [];
        data.forEach(el => {
            let buf = {};
            buf.id = el[0];
            buf.employee_id = el[1];
            buf.client_id = el[1];
            ord.push(buf);
        });
        return ord;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.update(this);
            else
                return Promise.reject("Empty order id");
        });
    }
    get_by_current_params() {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {};
            if (this.id)
                params.id = this.id;
            if (this.employee_id)
                params.employee_id = this.employee_id;
            if (this.client_id)
                params.client_id = this.client_id;
            if (!params.employee_id && !params.id && !params.client_id)
                return Promise.reject("No params set");
            else
                return yield this.db.get(params);
        });
    }
    get_all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({});
        });
    }
    get_by_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.get({ 'id': this.id });
            else
                return Promise.reject("Empty order id");
        });
    }
    get_by_employee_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.employee_id)
                return yield this.db.get({ 'employee_id': this.employee_id });
            else
                return Promise.reject("Empty order employee_id");
        });
    }
    get_by_client_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client_id)
                return yield this.db.get({ 'client_id': this.client_id });
            else
                return Promise.reject("Empty order client_id");
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insert(this);
        });
    }
    set_id(id) {
        this.id = id;
    }
    set_employee_id(employee_id) {
        this.employee_id = employee_id;
    }
    set_client_id(client_id) {
        this.client_id = client_id;
    }
    get_id() {
        return this.id;
    }
    get_employee_id() {
        return this.employee_id;
    }
    get_client_id() {
        return this.client_id;
    }
}
exports.default = orders;
