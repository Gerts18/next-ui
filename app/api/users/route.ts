import { connectDB } from "@/libs/mongoDB";
import User from "@/models/user"
import { time } from "console";
import next from "next";
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
        const user = await User.findById(id);
        if(!user){
            return NextResponse.json(
                {
                    succes: false,
                    status: 404,
                    message: "User not found",
                    data: null,
                    timestamp: new Date().getTime(),
                    path: `/api/users/?id=${id}`,
                    method: "GET"
                }, {status: 404}
            )
        }

        return NextResponse.json(
            {
                succes: true,
                status: 200,
                message: "User obtained",
                data: user,
                timestamp: new Date().getTime(),
                path: `/api/users/?id=${id}`,
                method: "GET"
            }, {status: 200}
        )

    } catch(error){
        return NextResponse.json(
            {
                succes: false,
                status: 500,
                messsage: "Error in server",
                error: error instanceof Error ? error.message : "EVERYTHING IS BROKEN",
                timestamp: new Date().getTime(),
                path: "api/users",
                method: "GET",
            }, {status: 500}
        )
    }
 }

 export async function POST (request:NextRequest){
    try{
        await connectDB();
        const data = await request.json();
        const user = await User.create(data);
        return NextResponse.json(
            {
                succes: true,
                status: 201,
                message: "User created",
                data: user,
                timestamp: new Date().getTime(),
                path: "api/users",
                method: "POST"
            }
        )
    }catch(error){
        return NextResponse.json(
            {
                succes: true,
                status: 400,
                message: "Error creating user",
                timestamp: new Date().getTime(),
                error: error instanceof Error ? error.message : "Error in data sent",
                path: "api/users",
                method: "POST"
            }, {status: 400}
        )
    }
 }

 