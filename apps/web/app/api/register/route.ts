import { NextResponse } from "next/server";
import { REGISTER_MUTATION, getServerClient } from "../../../lib/api/graphService";

export async function POST(request:Request) {

    try{

        let res = await request.json();

        let {name, password, email} = res;

        let bdUser = await (await getServerClient()).mutate({ //TODO: add error handling
            mutation: REGISTER_MUTATION, 
            variables:{
                "user": {
                    "name": name,
                    "password": password, 
                    "email": email
                }
            }
        });
    

        if (email === bdUser.data.addUser.email) {
            return new NextResponse(JSON.stringify({
                message: "Registered succesfull"
            }), {
                status: 200,
            });
        } else if(bdUser.data.addUser.email === null) {
            return new NextResponse(JSON.stringify({
                message: "User already registered"
            }), {
                status: 400,
            });
        } else {
            return new NextResponse(JSON.stringify({
                message: "Register error"
            }), {
                status: 400,
            });
        }

        
    } catch (e){ 
        console.log("register api error",e);
        return new NextResponse(JSON.stringify(e), {
            status: 400,
            
        });
    }
}