import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import employees from '../controllers/employees'


export default interface IEmployeesRow extends RowDataPacket{
    id: number;
    name: string;
    full_name:string;
    post:string;
    phone_number:string;
}
interface EmployeesGetOptions {
    id?: number;
    full_name?:string;
    post?:string;
    phone_number?:string;
}


export default class employees_db{
    private static con:Promise<mysql.Connection>
    constructor(){
        employees_db.con = con.get_con();
    }

    public async get(options: EmployeesGetOptions):Promise<IEmployeesRow[]>{
        
        let sql:string = "SELECT * FROM `employees` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.full_name){
            sql+=" AND `full_name` = ?"
            params.push(options.full_name)
        }
        if(options.post){
            sql+=" AND `post` = ?"
            params.push(options.post)
        }
        if(options.phone_number){
            sql+=" AND `phone_number` = ?"
            params.push(options.phone_number)
        }
    
        const [res, fl] = await (await employees_db.con).query(
            sql,
            params
        )
        
        return res as IEmployeesRow[];

    }
    public async insert(obj:employees):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `employees` (`full_name`,`post`,`phone_number`) VALUES (?,?,?)"
        const [results, fields] = await (await employees_db.con).query(sql,[
            obj.get_full_name() == undefined ? '' : obj.get_full_name(),
            obj.get_post() == undefined ? '' : obj.get_post(),
            obj.get_phone_number() == undefined ? '' : obj.get_phone_number(),
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:employees):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `employees` SET ";
        let params = [];
        if(obj.get_full_name() != undefined){
            sql+="`full_name` = ?,";
            params.push(obj.get_full_name());
        }
        if(obj.get_post() != undefined){
            sql+="`post` = ?,";
            params.push(obj.get_post());
        }
        if(obj.get_phone_number() != undefined){
            sql+="`phone_number` = ?,";
            params.push(obj.get_phone_number());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await employees_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }



}