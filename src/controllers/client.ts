import { ResultSetHeader } from "mysql2";
import client_db from "../models/client";
import IClientRow from '../models/client';

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


export default class client{

    private id?:number;
    private full_name?: string;
    private email?:string;
    private address?:string;
    private phone_number?:string;

    private role?:number;
    private balance?:number;
    private pass?:string;

    private db:client_db;

    constructor(options:ClientGetOptions){
        this.id = options.id;
        this.full_name = options.full_name;
        this.email = options.email;
        this.address = options.address;
        this.phone_number = options.phone_number;

        this.role = options.role;
        this.balance = options.balance;
        this.pass = options.pass;

        this.db = new client_db();
    }

    public static to_map(data:IClientRow[]):Array<ClientGetOptions>{
        let users:Array<ClientGetOptions> = [];
        
        data.forEach(el => {
            let buf:ClientGetOptions={};
            buf.id = el[0];
            buf.full_name = el[1];
            buf.email = el[2];
            buf.address = el[3];
            buf.phone_number = el[4];

            buf.role = el[5];
            buf.balance = el[6];
            buf.pass = el[7];
            users.push(buf)

        });
        return users;
    }

    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty user id")
    }

    public async get_by_current_params():Promise<IClientRow[]>{
        var params:ClientGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.full_name)
            params.full_name = this.full_name
        if(this.email)
            params.email = this.email
        if(this.address)
            params.address = this.address
        if(this.phone_number)
            params.phone_number = this.phone_number

        if(this.role)
            params.role = this.role
        if(this.balance)
            params.balance = this.balance
        if(this.pass)
            params.pass = this.pass
            
        
        if(!params.pass&&!params.balance&&!params.role&&!params.address&&!params.email&&!params.full_name&&!params.id&&!params.phone_number)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as ClientGetOptions);
    }
    public async get_all():Promise<IClientRow[]>{
        return await this.db.get({});
    }
    public async get_by_id():Promise<IClientRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty user id")
    }
    public async get_by_full_name():Promise<IClientRow[]>{
        if(this.full_name)
            return await this.db.get({'full_name':this.full_name});
        else
            return Promise.reject("Empty user full_name")
    }
    public async get_by_email():Promise<IClientRow[]>{
        if(this.email)
            return await this.db.get({'email':this.email});
        else
            return Promise.reject("Empty user email")
    }
    public async get_by_address():Promise<IClientRow[]>{
        if(this.address)
            return await this.db.get({'address':this.address});
        else
            return Promise.reject("Empty user address")
    }
    public async get_by_phone_number():Promise<IClientRow[]>{
        if(this.phone_number)
            return await this.db.get({'phone_number':this.phone_number});
        else
            return Promise.reject("Empty user phone_number")
    }

    public async get_by_role():Promise<IClientRow[]>{
        if(this.role)
            return await this.db.get({'role':this.role});
        else
            return Promise.reject("Empty user role")
    }
    public async get_by_balance():Promise<IClientRow[]>{
        if(this.balance)
            return await this.db.get({'balance':this.balance});
        else
            return Promise.reject("Empty user balance")
    }
    public async get_by_pass():Promise<IClientRow[]>{
        if(this.pass)
            return await this.db.get({'pass':this.pass});
        else
            return Promise.reject("Empty user pass")
    }
    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }
    

    public set_id(id:number):void{
        this.id = id;
    }
    public set_full_name(full_name:string):void{
        this.full_name = full_name;
    }
    public set_email(email:string):void{
        this.email = email;
    }
    public set_address(address:string):void{
        this.address = address;
    }
    public set_phone_number(phone_number:string):void{
        this.phone_number = phone_number;
    }

    public set_balance(balance:number):void{
        this.balance = balance;
    }
    public set_role(role:number):void{
        this.role = role;
    }
    public set_pass(pass:string):void{
        this.pass = pass;
    }

    public get_id():number|undefined{
        return this.id;
    }
    public get_full_name():string|undefined{
        return this.full_name;
    }
    public get_email():string|undefined{
        return this.email;
    }
    public get_address():string|undefined{
        return this.address;
    }
    public get_phone_number():string|undefined{
        return this.phone_number;
    }

    public get_balance():number|undefined{
        return this.balance;
    }
    public get_role():number|undefined{
        return this.role;
    }
    public get_pass():string|undefined{
        return this.pass;
    }


}