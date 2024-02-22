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
}