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
const providers_1 = __importDefault(require("../models/providers"));
class provider {
    constructor(options) {
        this.id = options.id;
        this.full_name = options.full_name;
        this.email = options.email;
        this.phone_number = options.phone_number;
        this.db = new providers_1.default();
    }
    to_map(data) {
        let users = [];
        data.forEach(el => {
            let buf = {};
            buf.id = el[0];
            buf.full_name = el[1];
            buf.email = el[2];
            buf.phone_number = el[3];
            users.push(buf);
        });
        return users;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.update(this);
            else
                return Promise.reject("Empty provider id");
        });
    }
    get_by_current_params() {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {};
            if (this.id)
                params.id = this.id;
            if (this.full_name)
                params.full_name = this.full_name;
            if (this.email)
                params.email = this.email;
            if (this.phone_number)
                params.phone_number = this.phone_number;
            if (!params.email && !params.full_name && !params.id && !params.phone_number)
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
                return Promise.reject("Empty provider id");
        });
    }
    get_by_full_name() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.full_name)
                return yield this.db.get({ 'full_name': this.full_name });
            else
                return Promise.reject("Empty provider full_name");
        });
    }
    get_by_email() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.email)
                return yield this.db.get({ 'email': this.email });
            else
                return Promise.reject("Empty provider email");
        });
    }
    get_by_phone_number() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.phone_number)
                return yield this.db.get({ 'phone_number': this.phone_number });
            else
                return Promise.reject("Empty provider phone_number");
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
    get_phone_number() {
        return this.phone_number;
    }
}
exports.default = provider;
