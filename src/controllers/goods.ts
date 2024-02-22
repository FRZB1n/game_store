import { ResultSetHeader } from "mysql2/promise";
import goods_db from "../models/goods"
import IGoodsRow from "../models/goods";


interface GoodsGetOptions {
    id?: number;
    name?: string;
    provider_id?:number;
    unit_price?:number;
    unit?:string;
    area_id?:number;
    amount?:number;
}



export default class goods{
    private id?: number;
    private name?: string;
    private provider_id?:number;
    private unit_price?:number;
    private unit?:string;
    private area_id?:number;
    private amount?:number;
    

    private db:goods_db;

    constructor(options:GoodsGetOptions){
        this.id = options.id;
        this.name = options.name;
        this.provider_id = options.provider_id;
        this.unit_price = options.unit_price;
        this.unit = options.unit;
        this.area_id = options.area_id;
        this.amount = options.amount;
      
        this.db = new goods_db();
    }
    public to_map(data:IGoodsRow[]):Array<GoodsGetOptions>{
        let goods:Array<GoodsGetOptions> = [];
        
        data.forEach(el => {
            let buf:GoodsGetOptions={};
            buf.id = el[0];
            buf.name = el[1];
            buf.provider_id = el[2];
            buf.unit_price = el[3];
            buf.unit = el[4];
            buf.area_id = el[5];
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
        if(this.provider_id)
            params.provider_id = this.provider_id
        if(this.unit_price)
            params.unit_price = this.unit_price
        if(this.unit)
            params.unit = this.unit
        if(this.area_id)
            params.area_id = this.area_id
        if(this.amount)
            params.amount = this.amount
        
            
        
        if(!params.name&&!params.id&&!params.provider_id&&!params.unit_price&&!params.unit&&!params.area_id&&!params.amount)
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
            return Promise.reject("Empty employee id")
    }
    public async get_by_name():Promise<IGoodsRow[]>{
        if(this.name)
            return await this.db.get({'name':this.name});
        else
            return Promise.reject("Empty good name")
    }
    public async get_by_provider_id():Promise<IGoodsRow[]>{
        if(this.provider_id)
            return await this.db.get({'provider_id':this.provider_id});
        else
            return Promise.reject("Empty good provider_id")
    }
    public async get_by_unit_price():Promise<IGoodsRow[]>{
        if(this.unit_price)
            return await this.db.get({'unit_price':this.unit_price});
        else
            return Promise.reject("Empty good unit_price")
    }
    public async get_by_unit():Promise<IGoodsRow[]>{
        if(this.unit)
            return await this.db.get({'unit':this.unit});
        else
            return Promise.reject("Empty good unit")
    }
    public async get_by_area_id():Promise<IGoodsRow[]>{
        if(this.area_id)
            return await this.db.get({'area_id':this.area_id});
        else
            return Promise.reject("Empty good area_id")
    }
    public async get_by_amount():Promise<IGoodsRow[]>{
        if(this.unit_price)
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
    public set_provider_id(provider_id:number):void{
        this.provider_id = provider_id;
    }

    public set_unit(unit:string):void{
        this.unit = unit;
    }
    public set_area_id(area_id:number):void{
        this.area_id = area_id;
    }
    
    public set_amount(amount:number):void{
        this.amount = amount;
    }
    


    public get_id():number|undefined {
        return this.id
    }
    public get_name():string|undefined {
        return this.name
    }
    public get_provider_id():number|undefined {
        return this.provider_id
    }
    public get_unit_price():number|undefined {
        return this.unit_price
    }
    public get_unit():string|undefined {
        return this.unit
    }
    public get_area_id():number|undefined {
        return this.area_id
    }
    public get_amount():number|undefined {
        return this.amount
    }

}