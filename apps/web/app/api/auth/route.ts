import { NextResponse } from "next/server";
import { GET_USER_WITH_PASS_QUERY, getServerClient } from "../../../lib/api/graphService";
import { authCookieName } from "../../../config";
import { singPayload } from "../../../lib/auth/auth";
import { compare, compareSync } from "bcrypt";

export async function POST(request:Request) {

    try{
        let {email, password} = await request.json();

        console.log(email);

        let bdUser = await (await getServerClient()).query({ //TODO: add error handling
            query: GET_USER_WITH_PASS_QUERY, 
            variables:{
                "email": email
            }
        });        

        console.log(bdUser.data.userWithPass.password);
        
        if(compareSync(password, bdUser.data.userWithPass.password)){
            let response = new NextResponse(JSON.stringify({}), {
                status: 200,
            });

            let payload = {
                auth:true,
                email: bdUser.data.userWithPass.email
            };            

            let token = await singPayload(payload);

            response.cookies.set(authCookieName, token, {
                maxAge: 60*60*24,
                httpOnly: true
            })
            
            return response;
        }

        return new NextResponse(JSON.stringify({
            message: "Auth failed"
        }), {
            status: 403,
            
        });
    } catch (e){ 
        console.log("auth api error",e);
        return new NextResponse(JSON.stringify(e), {
            status: 400,
            
        });
    }
}

export async function DELETE(request) {
    let response = new NextResponse(JSON.stringify({}), {
        status: 200,
    });

    response.cookies.delete(authCookieName);

    return response;
}