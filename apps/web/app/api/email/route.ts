import { NextRequest, NextResponse } from "next/server";
import { authCookieName } from "../../../config";
import { verifyToken } from "../../../lib/auth/auth";
import { GET_USER_QUERY, getServerClient } from "../../../lib/api/graphService";

export async function GET(request:NextRequest) {

    let token = request.cookies.get(authCookieName);

    if(token===undefined) {
        return new NextResponse(JSON.stringify({
            message: "No auth token cookie"
        }), {
            status:400
        });
    }

    let {email} = await verifyToken(token.value);    

    let user = await (await getServerClient()).query({
        query: GET_USER_QUERY,
        variables: {
            "email": email
        }
    })    

    return new NextResponse(JSON.stringify(user.data.user), {
        status:200
    });
}