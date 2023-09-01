import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";
import { authCookieName, secret } from "./constants";

export function isAuthenticated(request: NextRequest) {

    let authCookie = request.cookies.get(authCookieName);

    if(authCookie == undefined){
        return false;
    }

    let result = jwt.verify(authCookie.value, secret);

    console.log(result);
    

    return true;

}
