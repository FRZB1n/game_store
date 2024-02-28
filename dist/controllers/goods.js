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
const goods_1 = __importDefault(require("../models/goods"));
class goods {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.provider_id = options.provider_id;
        this.unit_price = options.unit_price;
        this.unit = options.unit;
        this.area_id = options.area_id;
        this.amount = options.amount;
        this.db = new goods_1.default();
    }
    to_map(data) {
        let goods = [];
        data.forEach(el => {
            let buf = {};
            buf.id = el[0];
            buf.name = el[1];
            buf.provider_id = el[2];
            buf.unit_price = el[3];
            buf.unit = el[4];
            buf.area_id = el[5];
            buf.amount = el[6];
            goods.push(buf);
        });
        return goods;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.update(this);
            else
                return Promise.reject("Empty good id");
        });
    }
    get_by_current_params() {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {};
            if (this.id)
                params.id = this.id;
            if (this.name)
                params.name = this.name;
            if (this.provider_id)
                params.provider_id = this.provider_id;
            if (this.unit_price)
                params.unit_price = this.unit_price;
            if (this.unit)
                params.unit = this.unit;
            if (this.area_id)
                params.area_id = this.area_id;
            if (this.amount)
                params.amount = this.amount;
            if (!params.name && !params.id && !params.provider_id && !params.unit_price && !params.unit && !params.area_id && !params.amount)
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
                return Promise.reject("Empty good id");
        });
    }
    get_by_name() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.name)
                return yield this.db.get({ 'name': this.name });
            else
                return Promise.reject("Empty good name");
        });
    }
    get_by_provider_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.provider_id)
                return yield this.db.get({ 'provider_id': this.provider_id });
            else
                return Promise.reject("Empty good provider_id");
        });
    }
    get_by_unit_price() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.unit_price)
                return yield this.db.get({ 'unit_price': this.unit_price });
            else
                return Promise.reject("Empty good unit_price");
        });
    }
    get_by_unit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.unit)
                return yield this.db.get({ 'unit': this.unit });
            else
                return Promise.reject("Empty good unit");
        });
    }
    get_by_area_id() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.area_id)
                return yield this.db.get({ 'area_id': this.area_id });
            else
                return Promise.reject("Empty good area_id");
        });
    }
    get_by_amount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.unit_price)
                return yield this.db.get({ 'amount': this.amount });
            else
                return Promise.reject("Empty good amount");
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
    set_name(name) {
        this.name = name;
    }
    set_provider_id(provider_id) {
        this.provider_id = provider_id;
    }
    set_unit(unit) {
        this.unit = unit;
    }
    set_area_id(area_id) {
        this.area_id = area_id;
    }
    set_amount(amount) {
        this.amount = amount;
    }
    get_id() {
        return this.id;
    }
    get_name() {
        return this.name;
    }
    get_provider_id() {
        return this.provider_id;
    }
    get_unit_price() {
        return this.unit_price;
    }
    get_unit() {
        return this.unit;
    }
    get_area_id() {
        return this.area_id;
    }
    get_amount() {
        return this.amount;
    }
}
exports.default = goods;
