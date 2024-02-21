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
const client_1 = __importDefault(require("../models/client"));
class client {
    constructor(options) {
        this.id = options.id;
        this.full_name = options.full_name;
        this.email = options.email;
        this.address = options.address;
        this.phone_number = options.phone_number;
        this.db = new client_1.default();
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.update(this);
            else
                return Promise.reject("Empty user id");
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
                return Promise.reject("Empty user id");
        });
    }
    get_by_full_name() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.full_name)
                return yield this.db.get({ 'full_name': this.full_name });
            else
                return Promise.reject("Empty user id");
        });
    }
    get_by_email() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.email)
                return yield this.db.get({ 'email': this.email });
            else
                return Promise.reject("Empty user email");
        });
    }
    get_by_address() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.address)
                return yield this.db.get({ 'address': this.address });
            else
                return Promise.reject("Empty user address");
        });
    }
    get_by_phone_number() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.phone_number)
                return yield this.db.get({ 'address': this.address });
            else
                return Promise.reject("Empty user phone_number");
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
    set_full_name(full_name) {
        this.full_name = full_name;
    }
    set_email(email) {
        this.email = email;
    }
    set_address(address) {
        this.address = address;
    }
    set_phone_number(phone_number) {
        this.phone_number = phone_number;
    }
    get_id() {
        return this.id;
    }
    get_full_name() {
        return this.full_name;
    }
    get_email() {
        return this.email;
    }
    get_address() {
        return this.address;
    }
    get_phone_number() {
        return this.phone_number;
    }
}
exports.default = client;
