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
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../controllers/client"));
const employees_1 = __importDefault(require("../controllers/employees"));
const goods_1 = __importDefault(require("../controllers/goods"));
const goods_in_orders_1 = __importDefault(require("../controllers/goods_in_orders"));
const order_1 = __importDefault(require("../controllers/order"));
const providers_1 = __importDefault(require("../controllers/providers"));
const router = (0, express_1.default)();
router.post('/kl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    let good = new goods_1.default({ "id": id });
    yield good.get_by_id().then((data) => __awaiter(void 0, void 0, void 0, function* () {
        let f_good = good.to_map(data);
        console.log("------------------------\nGOODS ELEMS:\n");
        f_good.forEach(el => {
            console.log(el);
        });
        let prov = new providers_1.default({ "id": f_good[0].provider_id });
        yield prov.get_by_id().then((data) => __awaiter(void 0, void 0, void 0, function* () {
            let n_prov = prov.to_map(data);
            console.log("------------------\nProviders:\n");
            n_prov.forEach(el => {
                console.log(el);
            });
        }));
        let need_ord = new goods_in_orders_1.default({ "good_id": f_good[0].id });
        yield need_ord.get_by_good_id().then((data) => __awaiter(void 0, void 0, void 0, function* () {
            let f_orders = need_ord.to_map(data);
            console.log("-----------------\ng_in_ord:\n");
            f_orders.forEach(el => {
                console.log(el);
            });
            let mb_order = new order_1.default({ "id": f_orders[0].order_id });
            yield mb_order.get_by_id().then((data) => __awaiter(void 0, void 0, void 0, function* () {
                let order = mb_order.to_map(data);
                console.log("-----------------\nORDER:\n");
                order.forEach(el => {
                    console.log(el);
                });
                let mb_employee = new employees_1.default({ "id": order[0].employee_id });
                yield mb_employee.get_by_id().then((data) => __awaiter(void 0, void 0, void 0, function* () {
                    let employee = mb_employee.to_map(data);
                    console.log("-----------------\nEmployee:\n");
                    employee.forEach(el => {
                        console.log(el.full_name);
                    });
                }));
                let mb_client = new client_1.default({ "id": order[0].client_id });
                yield mb_client.get_by_id().then((data) => __awaiter(void 0, void 0, void 0, function* () {
                    let client = mb_client.to_map(data);
                    console.log("-----------------\nClient:\n");
                    client.forEach(el => {
                        console.log(el);
                    });
                }));
            }));
        }));
    })).catch((err) => {
        console.log(err);
    });
    // let new_empl = new employees({"full_name":"NEW EMPL", "phone_number":"NEW PHONE", "post":"MUZHIK"})
    // await new_empl.insert().then((data)=>{
    //     if(data.affectedRows > 0)
    //         res.send("WELL DONE")
    // })
    // await new_empl.update().then((data)=>{
    //     if(data.affectedRows > 0)
    //         res.send("E")
    // })
    // await new_empl.insert().then((data)=>{
    //     console.log(data)
    //     if(data.affectedRows > 0)
    //         res.send("Ed");
    // })
    // await new_empl.get_by_post().then((data)=>{
    //     let empls = new_empl.to_map(data);
    //     console.log(empls)
    // })
    // let mb_area = new area({'id':1, "name":"Молочная продукция"})
    // await mb_area.get_by_id().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    // await mb_area.insert().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_all().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_by_current_params().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_by_name().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.update().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // let mb_user = new client({});
    // let user = await mb_user.get_by_current_params().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err)
    // });
    // let user = new client({'id':1,"full_name":"new full_name"})
    // user.set_full_name("New full_name");
    // user.set_full_name("las");
    // user.update();
    // let user = new client({'full_name':"Insert test", 'address':'aaa','phone_number':'909090'});
    // await user.get_by_id().then((data)=>{
    //     console.log(data[0][1])
    // }).catch(async (err)=>{
    //     console.log(err)
    //     return;
    // });
    // try{
    //     let users = await user.get_by_id();
    //     console.log(users)
    // }catch(err){
    //     console.log(err)
    // }
    // let all_users = await user.get_all();
    // all_users.forEach(el => {
    //     console.log(el);
    // });
    // let result = await user.insert();
    // console.log(result.affectedRows)
    // console.log(user);
    // user.set_id(result.insertId);
    // console.log(user);
    // let us = await user.get_by_id().catch((err)=>{
    //     console.log(err);
    //     return;
    // });
    // console.log(us)
}));
exports.default = router;
