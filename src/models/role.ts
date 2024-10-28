import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import role from "../controllers/role";

export default interface IRoleRow extends RowDataPacket{
    id: number;
    name: string;
}
interface RoleGetOptions {
    id?: number;
    name?:string;
}



export default class role_db{
    // private table = 'clients'
    private static con:Promise<mysql.Connection>
    constructor(){
        role_db.con = con.get_con();
    }

    public async get(options: RoleGetOptions):Promise<IRoleRow[]>{
        
        let sql:string = "SELECT * FROM `roles` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.name){
            sql+=" AND `name` = ?"
            params.push(options.name)
        }
    
        const [res, fl] = await (await role_db.con).query(
            sql,
            params
        )
        
        return res as IRoleRow[];

    }
    public async insert(obj:role):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `roles`(`name`) VALUES (?)"
        const [results, fields] = await (await role_db.con).query(sql,[
            obj.get_name() == undefined ? '' : obj.get_name()
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:role):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `roles` SET ";
        let params = [];
        if(obj.get_name() != undefined){
            sql+="`name` = ?,";
            params.push(obj.get_name());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await role_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }



}