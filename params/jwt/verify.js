import { validateJwt } from "https://deno.land/x/djwt/validate.ts";


var key = "Paranthaman";

const jwtToken =async (ctx,next)=>{
    var header = await ctx.request.headers;
    var authorization1 =  header.get("Authorization");
    var jwt = await (await validateJwt(authorization1, key)).isValid
    if (jwt){
        await next();       
    }else{
        ctx.response.body = {error : "Oops! you are not admin!!!"}
    }
}
export default jwtToken;