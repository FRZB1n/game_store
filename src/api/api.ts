import Router, { Request, Response } from 'express';
import client from '../controllers/client';
import area from '../controllers/area';
import employees from '../controllers/employees';





const router = Router();

router.get('/', async (req:Request,res:Response)=>{

    let new_empl = new employees({"full_name":"NEW EMPL", "phone_number":"NEW PHONE", "post":"MUZHIK"})
    // await new_empl.insert().then((data)=>{
    //     if(data.affectedRows > 0)
    //         res.send("WELL DONE")
    // })
    // await new_empl.update().then((data)=>{
    //     if(data.affectedRows > 0)
    //         res.send("E")
    // })

    // await new_empl.insert().then((data)=>{
    //     console.log(data)
    //     if(data.affectedRows > 0)
    //         res.send("Ed");
    // })
    
    await new_empl.get_by_post().then((data)=>{
        let empls = new_empl.to_map(data);
        console.log(empls)
    })

















    // let mb_area = new area({'id':1, "name":"Молочная продукция"})
    // await mb_area.get_by_id().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // await mb_area.insert().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_all().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_by_current_params().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_by_name().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.update().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // let mb_user = new client({});
    // let user = await mb_user.get_by_current_params().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err)
    // });
    
    // let user = new client({'id':1,"full_name":"new full_name"})
    // user.set_full_name("New full_name");
    // user.set_full_name("las");
    // user.update();
    // let user = new client({'full_name':"Insert test", 'address':'aaa','phone_number':'909090'});
    // await user.get_by_id().then((data)=>{
    //     console.log(data[0][1])
    // }).catch(async (err)=>{
    //     console.log(err)
    //     return;
    // });
    // try{
    //     let users = await user.get_by_id();
    //     console.log(users)
    // }catch(err){
    //     console.log(err)
    // }
    
    // let all_users = await user.get_all();
    // all_users.forEach(el => {
    //     console.log(el);
    // });
    // let result = await user.insert();
    // console.log(result.affectedRows)
    
    // console.log(user);
    // user.set_id(result.insertId);
    // console.log(user);
    // let us = await user.get_by_id().catch((err)=>{
    //     console.log(err);
    //     return;
    // });
        
    // console.log(us)
  


})

export default router;