import client from "../controllers/client";
import con from '../Services/Connect';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface ClientGetOptions {
    id?: number;
    full_name?: string;
    email?: string;
    address?: string;
    phone_number?: string;

    role?:number;
    balance?:number;
    pass?:string;
}



export default interface IClientRow extends RowDataPacket{
    id: number;
    full_name: string;
    email: string;
    address: string;
    phone_number: string;

    role:number;
    balance:number;
    pass:string;
}

export default class client_db{
    // private table = 'clients'
    private static con:Promise<mysql.Connection>
    constructor(){
        client_db.con = con.get_con();
    }
    public async update (obj:client):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `clients` SET ";
        let params = [];
        if(obj.get_full_name() != undefined){
            sql+="`full_name` = ?,";
            params.push(obj.get_full_name());
        }
        if(obj.get_email() != undefined){
            sql+="`email` = ?,";
            params.push(obj.get_email());
        }
        if(obj.get_address() != undefined){
            sql+="`address` = ?,";
            params.push(obj.get_address());
        }
        if(obj.get_phone_number() != undefined){
            sql+="`phone_number` = ?,";
            params.push(obj.get_phone_number());
        }

        if(obj.get_role() != undefined){
            sql+="`role` = ?,";
            params.push(obj.get_role());
        }
        if(obj.get_pass() != undefined){
            sql+="`pass` = ?,";
            params.push(obj.get_pass());
        }
        if(obj.get_balance() != undefined){
            sql+="`balance` = ?,";
            params.push(obj.get_balance());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await client_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }
    public async insert(obj:client):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `clients`(`full_name`, `email`, `address`, `phone_number`,`role`,`balance`,`pass`) VALUES (?,?,?,?,?,?,?)"
        const [results, fields] = await (await client_db.con).query(sql,[
            obj.get_full_name() == undefined ? '' : obj.get_full_name(),
            obj.get_email()== undefined ? '' : obj.get_email(),
            obj.get_address()== undefined ? '' : obj.get_address(),
            obj.get_phone_number()== undefined ? '' : obj.get_phone_number(),

            obj.get_role()== undefined ? '' : obj.get_role(),
            obj.get_balance()== undefined ? '' : obj.get_balance(),
            obj.get_pass()== undefined ? '' : obj.get_pass(),
        ])
        return results as ResultSetHeader;
   
        
    }
    
    public async get(options: ClientGetOptions):Promise<IClientRow[]>{
        
        let sql:string = "SELECT * FROM `clients` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.full_name){
            sql+=" AND `full_name` = ?"
            params.push(options.full_name)
        }
        if(options.email){
            sql+=" AND `email` = ?"
            params.push(options.email)
        }
        if(options.address){
            sql+=" AND `address` = ?"
            params.push(options.address)
        }
        if(options.phone_number){
            sql+=" AND `phone_number` = ?"
            params.push(options.phone_number)
        }

        if(options.role){
            sql+=" AND `role` = ?"
            params.push(options.role)
        }
        if(options.balance){
            sql+=" AND `balance` = ?"
            params.push(options.balance)
        }
        if(options.pass){
            sql+=" AND `pass` = ?"
            params.push(options.pass)
        }
        
        const [res, fl] = await (await client_db.con).query(
            sql,
            params
        )
        
        return res as IClientRow[];

    }
}