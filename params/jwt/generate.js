import { makeJwt, setExpiration } from "https://deno.land/x/djwt/create.ts";

var key = "Paranthaman";

const header = {
  alg: "HS256",
  typ: "JWT",
};

export default { generate(login)  {
    if (login){        
        const payload = {
        iss: "joe",
        // exp: setExpiration(new Date().getTime() + 60000),
    }
    const jwt = makeJwt({key,header,payload});
    if (jwt){
        return jwt;
    }else{
        ctx.response.body = "Error";
    }
  }}
}