import { ResultSetHeader } from "mysql2/promise";
import goods_db from "../models/goods"
import IGoodsRow from "../models/goods";


interface GoodsGetOptions {
    id?: number;
    name?: string;
    seller?:number;
    description?:string;
    cost?:number;
    game_id?:number;
    amount?:number;
}



export default class goods{
    private id?: number;
    private name?: string;
    private seller?:number;
    private description?:string;
    private cost?:number;
    private game_id?:number;
    private amount?:number;
    

    private db:goods_db;

    constructor(options:GoodsGetOptions){
        this.id = options.id;
        this.name = options.name;
        this.seller = options.seller;
        this.description = options.description;
        this.cost = options.cost;
        this.game_id = options.game_id;
        this.amount = options.amount;
      
        this.db = new goods_db();
    }
    public to_map(data:IGoodsRow[]):Array<GoodsGetOptions>{
        let goods:Array<GoodsGetOptions> = [];
        
        data.forEach(el => {
            let buf:GoodsGetOptions={};
            buf.id = el[0];
            buf.name = el[1];
            buf.seller = el[2];
            buf.description = el[3];
            buf.cost = el[4];
            buf.game_id = el[5];
            buf.amount = el[6];
            goods.push(buf)

            
        });
        return goods;
    }
    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty good id")
    }


    public async get_by_current_params():Promise<IGoodsRow[]>{
        var params:GoodsGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.name)
            params.name = this.name
        if(this.seller)
            params.seller = this.seller
        if(this.description)
            params.description = this.description
        if(this.cost)
            params.cost = this.cost
        if(this.game_id)
            params.game_id = this.game_id
        if(this.amount)
            params.amount = this.amount
        
            
        
        if(!params.name&&!params.id&&!params.seller&&!params.description&&!params.cost&&!params.game_id&&!params.amount)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as GoodsGetOptions);
    }

    public async get_all():Promise<IGoodsRow[]>{
        return await this.db.get({});
    }

    public async get_by_id():Promise<IGoodsRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty good id")
    }
    public async get_by_name():Promise<IGoodsRow[]>{
        if(this.name)
            return await this.db.get({'name':this.name});
        else
            return Promise.reject("Empty good name")
    }
    public async get_by_seller_id():Promise<IGoodsRow[]>{
        if(this.seller)
            return await this.db.get({'seller':this.seller});
        else
            return Promise.reject("Empty good seller")
    }
    public async get_by_description():Promise<IGoodsRow[]>{
        if(this.description)
            return await this.db.get({'description':this.description});
        else
            return Promise.reject("Empty good description")
    }
    public async get_by_cost():Promise<IGoodsRow[]>{
        if(this.cost)
            return await this.db.get({'cost':this.cost});
        else
            return Promise.reject("Empty good cost")
    }
    public async get_by_game_id():Promise<IGoodsRow[]>{
        if(this.game_id)
            return await this.db.get({'game_id':this.game_id});
        else
            return Promise.reject("Empty good game_id")
    }
    public async get_by_amount():Promise<IGoodsRow[]>{
        if(this.amount)
            return await this.db.get({'amount':this.amount});
        else
            return Promise.reject("Empty good amount")
    }

    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }


    public set_id(id:number):void{
        this.id = id;
    }
    public set_name(name:string):void{
        this.name = name;
    }
    public set_seller(seller:number):void{
        this.seller = seller;
    }

    public set_description(description:string):void{
        this.description = description;
    }
    public set_game_id(game_id:number):void{
        this.game_id = game_id;
    }
    
    public set_cost(cost:number):void{
        this.cost = cost;
    }
    public set_amount(cost:number):void{
        this.cost = cost;
    }


    public get_id():number|undefined {
        return this.id
    }
    public get_name():string|undefined {
        return this.name
    }
    public get_seller():number|undefined {
        return this.seller
    }
    public get_cost():number|undefined {
        return this.cost
    }
    public get_amount():number|undefined {
        return this.amount
    }
    public get_game_id():number|undefined {
        return this.game_id
    }
    public get_description():string|undefined {
        return this.description
    }

}