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
const area_1 = __importDefault(require("../models/area"));
/**Area controller class */
class area {
    /**
     * Class contructor
     *
     * @param options requires id and name.
     *
     *
        */
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.db = new area_1.default();
    }
    /** This is a description of the foo function. */
    to_map(data) {
        let areas = [];
        data.forEach(el => {
            let buf = {};
            buf.id = el[0];
            buf.name = el[1];
            areas.push(buf);
        });
        return areas;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return yield this.db.update(this);
            else
                return Promise.reject("Empty area id");
        });
    }
    get_by_current_params() {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {};
            if (this.id)
                params.id = this.id;
            if (this.name)
                params.name = this.name;
            if (!params.name && !params.id)
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
    get_by_name() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.name)
                return yield this.db.get({ 'name': this.name });
            else
                return Promise.reject("Empty area name");
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
    get_id() {
        return this.id;
    }
    get_name() {
        return this.name;
    }
}
exports.default = area;
