import { ResultSetHeader } from "mysql2";
import provider_db from "../models/providers";
import IProviderRow from '../models/providers';

interface ProviderGetOptions {
    id?: number;
    full_name?: string;
    email?: string;
    phone_number?: string;
}


export default class provider{

    private id?:number;
    private full_name?: string;
    private email?:string;
    private phone_number?:string;

    private db:provider_db;

    constructor(options:ProviderGetOptions){
        this.id = options.id;
        this.full_name = options.full_name;
        this.email = options.email;
        this.phone_number = options.phone_number;

        this.db = new provider_db();
    }

    public to_map(data:IProviderRow[]):Array<ProviderGetOptions>{
        let users:Array<ProviderGetOptions> = [];
        
        data.forEach(el => {
            let buf:ProviderGetOptions={};
            buf.id = el[0];
            buf.full_name = el[1];
            buf.email = el[2];
            buf.phone_number = el[3];
            users.push(buf)

        });
        return users;
    }

    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty provider id")
    }

    public async get_by_current_params():Promise<IProviderRow[]>{
        var params:ProviderGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.full_name)
            params.full_name = this.full_name
        if(this.email)
            params.email = this.email
        if(this.phone_number)
            params.phone_number = this.phone_number
            
        
        if(!params.email&&!params.full_name&&!params.id&&!params.phone_number)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as ProviderGetOptions);
    }
    public async get_all():Promise<IProviderRow[]>{
        return await this.db.get({});
    }
    public async get_by_id():Promise<IProviderRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty provider id")
    }
    public async get_by_full_name():Promise<IProviderRow[]>{
        if(this.full_name)
            return await this.db.get({'full_name':this.full_name});
        else
            return Promise.reject("Empty provider full_name")
    }
    public async get_by_email():Promise<IProviderRow[]>{
        if(this.email)
            return await this.db.get({'email':this.email});
        else
            return Promise.reject("Empty provider email")
    }
    public async get_by_phone_number():Promise<IProviderRow[]>{
        if(this.phone_number)
            return await this.db.get({'phone_number':this.phone_number});
        else
            return Promise.reject("Empty provider phone_number")
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
    public set_phone_number(phone_number:string):void{
        this.phone_number = phone_number;
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

    public get_phone_number():string|undefined{
        return this.phone_number;
    }


}