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
const goods_in_orders_1 = __importDefault(require("../models/goods_in_orders"));
class goods_in_orders {
    constructor(options) {
        this.id = options.id;
        this.order_id = options.order_id;
        this.good_id = options.good_id;
        this.db = new goods_in_orders_1.default();
    }
    to_map(data) {
        let GoInOr = [];
        data.forEach(el => {
            let buf = {};
            buf.id = el[0];
            buf.order_id = el[1];
            buf.good_id = el[1];
            GoInOr.push(buf);
        });
        return GoInOr;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.update(this);
            else
                return Promise.reject("Empty id");
        });
    }
    get_by_current_params() {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {};
            if (this.id)
                params.id = this.id;
            if (this.order_id)
                params.order_id = this.order_id;
            if (this.good_id)
                params.good_id = this.good_id;
            if (!params.order_id && !params.id && !params.order_id)
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
                return Promise.reject("Empty area id");
        });
    }
    get_by_order_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.order_id)
                return yield this.db.get({ 'order_id': this.order_id });
            else
                return Promise.reject("Empty order_id");
        });
    }
    get_by_good_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.good_id)
                return yield this.db.get({ 'good_id': this.good_id });
            else
                return Promise.reject("Empty good_id");
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
    set_order_id(order_id) {
        this.order_id = order_id;
    }
    set_good_id(good_id) {
        this.good_id = good_id;
    }
    get_id() {
        return this.id;
    }
    get_order_id() {
        return this.order_id;
    }
    get_good_id() {
        return this.good_id;
    }
}
exports.default = goods_in_orders;
