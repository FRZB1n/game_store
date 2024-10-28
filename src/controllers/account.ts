import { ResultSetHeader } from "mysql2/promise";

import acc_db from "../models/account"
import IAccountRow from "../models/account"

interface AccountGetOptions {
    id?: number;
    name?: string;
    pass?: string;
    email?: string;
    cost?:number;
    game?: number;
    description?: string;
    seller?: number;
    buyer?:number;
}

/**Area controller class */
export default class account{

    private id?:number;
    private name?: string;
    private pass?: string;
    private email?: string;
    private cost?:number;
    private game?: number;
    private description?: string;
    private seller?: number;
    private buyer?:number;

    private db:acc_db;

    constructor(options:AccountGetOptions){
        this.id = options.id;
        this.name = options.name;
        this.pass = options.pass;
        this.email = options.email;
        this.cost = options.cost;
        this.game = options.game;
        this.description = options.description;
        this.seller = options.seller;
        this.buyer = options.buyer;

        this.db = new acc_db();
    }
    public to_map(data:IAccountRow[]):Array<AccountGetOptions>{
        let accs:Array<AccountGetOptions> = [];
        
       
         
        data.forEach(el => {
            let buf:AccountGetOptions={};
            buf.id = el[0],
            buf.name = el[1],
            buf.pass = el[2],
            buf.email = el[3],
            buf.cost = el[4],
            buf.game = el[5],
            buf.description = el[6]
            buf.seller = el[7]
            buf.buyer = el[8]
            accs.push(buf)

            
        });

        return accs;

    }

    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty acc id")
    }
    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }
    public async get_by_current_params():Promise<IAccountRow[]>{
        var params:AccountGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.name)
            params.name = this.name
        if(this.pass)
            params.pass = this.pass
        if(this.email)
            params.email = this.email
        if(this.cost)
            params.cost = this.cost
        if(this.game)
            params.game = this.game
        if(this.description)
            params.description = this.description
        if(this.seller)
            params.seller = this.seller
        if(this.buyer)
            params.buyer = this.buyer
        
            
        
        if(!params.buyer&&!params.seller&&!params.description&&!params.game&&!params.cost&&!params.email&&!params.pass&&!params.name&&!params.id)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as AccountGetOptions);
    }
    public async get_all():Promise<IAccountRow[]>{
        return await this.db.get({});
    }
    public async get_by_id():Promise<IAccountRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty acc id")
    }
    public async get_by_name():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'name':this.name});
        else
            return Promise.reject("Empty acc name")
    }
    public async get_by_email():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'email':this.email});
        else
            return Promise.reject("Empty acc email")
    }
    public async get_by_pass():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'pass':this.pass});
        else
            return Promise.reject("Empty acc pass")
    }
    public async get_by_cost():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'cost':this.cost});
        else
            return Promise.reject("Empty acc cost")
    }
    public async get_by_game():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'game':this.game});
        else
            return Promise.reject("Empty acc game")
    }
    public async get_by_description():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'description':this.description});
        else
            return Promise.reject("Empty acc description")
    }
    public async get_by_seller():Promise<IAccountRow[]>{
        if(this.name)
            return await this.db.get({'seller':this.seller});
        else
            return Promise.reject("Empty acc seller")
    }
    public async get_by_buyer():Promise<IAccountRow[]>{
        if(this.buyer)
            return await this.db.get({'buyer':this.buyer});
        else
            return Promise.reject("Empty acc buyer")
    }


    public set_id(id:number):void{
        this.id = id;
    }
    public set_name(name:string):void{
        this.name = name;
    }
    public set_pass(pass:string):void{
        this.pass = pass;
    }
    public set_email(email:string):void{
        this.email = email;
    }
    public set_cost(cost:number):void{
        this.cost = cost;
    }
    public set_game(game:number):void{
        this.game = game;
    }
    public set_description(description:string):void{
        this.description = description
    }
    public set_seller(seller:number):void{
        this.seller = seller;
    }
    public set_buyer(buyer:number):void{
        this.buyer = buyer;
    }

    public get_id():number|undefined{
        return this.id;
    }
    public get_name():string|undefined{
        return this.name;
    }
    public get_pass():string|undefined{
        return this.pass;
    }
    public get_email():string|undefined{
        return this.email;
    }
    public get_cost():number|undefined{
        return this.cost;
    }
    public get_game():number|undefined{
        return this.game;
    }
    public get_description():string|undefined{
        return this.description;
    }
    public get_seller():number|undefined{
        return this.seller;
    }
    public get_buyer():number|undefined{
        return this.buyer;
    }
}