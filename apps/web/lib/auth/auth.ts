import { NextRequest } from "next/server";
import { authCookieName, secret } from "../../config";
import { SignJWT, jwtVerify } from "jose";

const secretEncoded = new TextEncoder().encode(
    secret,
)

export async function isAuthenticated(request: NextRequest) {

    let authCookie = request.cookies.get(authCookieName);    

    if(authCookie == undefined){
        return false;
    }

    try{
        let verifyResult = await verifyToken(authCookie.value);
        return verifyResult.auth;

    } catch(e) {
        console.log("Verification error", e);
        return false;
    }
}

export async function isApiAuthenticated(request: NextRequest) {

    let auth = request.headers.get("Authorization");

    if(auth == undefined){
        return false;
    }    

    try{
        let verifyResult = await verifyToken(auth);
        return verifyResult.auth;

    } catch(e) {
        console.log("Verification error", e);
        return false;
    }
}

export async function singPayload(payload):Promise<string> {    
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime("1 day")
    .sign(secretEncoded)
}

export async function verifyToken(token:string) {

    return (await jwtVerify(token, secretEncoded)).payload;
}