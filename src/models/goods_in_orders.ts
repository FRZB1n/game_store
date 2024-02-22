import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import goods_in_orders from "../controllers/goods_in_orders";

export default interface IGoodsInOrdersRow extends RowDataPacket{
    id: number;
    order_id: number;
    good_id: number;
}
interface GoodsInOrdersGetOptions {
    id?: number;
    order_id?: number;
    good_id?: number;
}



export default class goods_in_orders_db{
    private static con:Promise<mysql.Connection>
    constructor(){
        goods_in_orders_db.con = con.get_con();
    }
    public async get(options: GoodsInOrdersGetOptions):Promise<IGoodsInOrdersRow[]>{
        
        let sql:string = "SELECT * FROM `goods_in_orders` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.order_id){
            sql+=" AND `order_id` = ?"
            params.push(options.order_id)
        }
        if(options.good_id){
            sql+=" AND `good_id` = ?"
            params.push(options.good_id)
        }
    
        const [res, fl] = await (await goods_in_orders_db.con).query(
            sql,
            params
        )
        
        return res as IGoodsInOrdersRow[];

    }
    public async insert(obj:goods_in_orders):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `goods_in_orders`(`order_id`,`good_id`) VALUES (?, ?)"
        const [results, fields] = await (await goods_in_orders_db.con).query(sql,[
            obj.get_order_id() == undefined ? '' : obj.get_order_id(),
            obj.get_good_id() == undefined ? '' : obj.get_good_id(),
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:goods_in_orders):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `goods_in_orders` SET ";
        let params = [];
        if(obj.get_order_id() != undefined){
            sql+="`good_id` = ?,";
            params.push(obj.get_good_id());
        }
        if(obj.get_order_id() != undefined){
            sql+="`order_id` = ?,";
            params.push(obj.get_order_id());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await goods_in_orders_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }


}