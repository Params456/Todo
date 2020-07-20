import db from "../db.js";
import validater from "../validate.js"
import generate from "../jwt/generate.js"
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
const users = db.collection("users");
console.log("collection created")
export default {
    async write (ctx) {
        var value = await validater.validate(ctx);
        console.log(value)
        if (value){
            await users.insertOne(value)
            ctx.response.body = "Welcome to todo app";

        }
    },
    async login(ctx){
        var value = await validater.validateLogin(ctx);
        if(value){
            var email = (value.email)
            console.log(email)
            const user = await users.findOne({email:email})
            console.log(user)
            if (null != user){
                if (user.password === value.password ){
                    ctx.response.body = await generate.generate(value.email);
                }else{
                    ctx.response.body = {Err:"Oops! your password is wrong!!!"}
                }
            }else{
                ctx.response.body = {Err:"Oops! singup first..!"} 
            }
        }
    },
    async delete(ctx){
        var value = await list.find({_id: ObjectId(ctx.params.id)});
        if (value){
            await users.deleteOne({_id: ObjectId(ctx.params.id)});
            ctx.response.body = "You deleted your Id";
        }
    },
    async rewrite(ctx){
        var value = await validater.validateUpdate(ctx);
        console.log(value,"1")
        var id = ctx.params.id;
        var user = await users.findOne({_id: ObjectId(ctx.params.id)});
        console.log(user,"2")
        if (user != null ){
            var valId = ctx.params.id
            var upDate = await users.updateOne({ _id: { "$oid": valId } },{ $set: value })
            console.log(upDate)
            ctx.response.body = { message : "updated", upDate };
        }else{
            ctx.response.body = {err:"Err u'r not user"}
        }
    }
}