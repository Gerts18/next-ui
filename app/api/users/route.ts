import { connectDB } from "@/libs/mongoDB";
import User from "@/models/user"
import { time } from "console";
import { NextResponse, NextRequest } from "next/server";
import path from "path";


export async function GET (request:NextRequest){
    try{
        await connectDB();
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if(!id){
            const users = await User.find();
            return NextResponse.json( 
                {
                    succes:true,
                    status: 200,
                    message: "Users found",
                    data: users,
                    count: users.length,
                    timestamp: new Date().getTime(),
                    path: "api/users",
                    method: "GET"
                }, {status: 200}
            )
        }
    } catch(error){

    }
 }