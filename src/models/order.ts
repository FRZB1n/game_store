import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import orders from "../controllers/order";

export default interface IOrdersRow extends RowDataPacket{
    id: number;
    employee_id: number;
    client_id: number;
}
interface OrdersGetOptions {
    id?: number;
    employee_id?: number;
    client_id?: number;
}




export default class orders_db{
    // private table = 'orders'
    private static con:Promise<mysql.Connection>
    constructor(){
        orders_db.con = con.get_con();
    }
    public async get(options: OrdersGetOptions):Promise<IOrdersRow[]>{
        
        let sql:string = "SELECT * FROM `orders` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.employee_id){
            sql+=" AND `employee_id` = ?"
            params.push(options.employee_id)
        }
        if(options.client_id){
            sql+=" AND `client_id` = ?"
            params.push(options.client_id)
        }
    
        const [res, fl] = await (await orders_db.con).query(
            sql,
            params
        )
        
        return res as IOrdersRow[];

    }
    public async insert(obj:orders):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `orders`(`employee_id`,`client_id`) VALUES (?, ?)"
        const [results, fields] = await (await orders_db.con).query(sql,[
            obj.get_employee_id() == undefined ? '' : obj.get_employee_id(),
            obj.get_client_id() == undefined ? '' : obj.get_client_id(),
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:orders):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `orders` SET ";
        let params = [];
        if(obj.get_employee_id() != undefined){
            sql+="`employee_id` = ?,";
            params.push(obj.get_employee_id());
        }
        if(obj.get_client_id() != undefined){
            sql+="`client_id` = ?,";
            params.push(obj.get_client_id());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await orders_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }


}