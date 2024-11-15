import { connectDB } from "@/libs/mongoDB";
import User from "@/models/user"
import { pagination } from "@nextui-org/theme";
import { time, timeStamp } from "console";
import { stat } from "fs";
import next from "next";
import { NextResponse, NextRequest } from "next/server";
import path, { parse } from "path";


export async function GET (request:NextRequest){
    try{
        await connectDB();
        const searchParmams = request.nextUrl.searchParams;
        const page = parseInt(searchParmams.get("page") || "1");
        const perPage = parseInt(searchParmams.get("perPage") || "10");
        const limit = Math.min(perPage, 20);
        const skip = (page - 1) * limit;   

        const [users, total] = await Promise.all(
            [
                User.find().skip(skip).limit(limit).select("-password"),
                User.countDocuments()
            ]
        )

        return NextResponse.json(
            {
                success: true,
                status: 200,
                data: users,
                pagination:{
                    currentPage: page,
                    totalPage: Math.ceil(total / perPage),
                    totalItems: total,
                    itemsPerPage: limit,
                    hasNextPage: page < Math.ceil(total / limit) ,
                    hasPrevPage: page > 1
                },
                timeStamp: new Date().toISOString(),
                path: 'api/users',
                method: 'GET'
            },{status: 200}
        )

    }catch (error) {
        return NextResponse.json(
            {
                success: false,
                status: 500,
                message: "Error fetching users",
                error: error instanceof Error ? error.message : "Error in server",
                timeStamp: new Date().getTime(),
                path: 'api/users',  
                method: 'GET'
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

 export async function PUT (request:NextRequest){
    try{
        await connectDB();
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if(!id){
            return NextResponse.json(
                {
                    succes: false,
                    status: 400,
                    message: "Id is required",
                    timestamp: new Date().getTime(),
                    path: "api/users",
                    method: "PUT"
                }, {status: 400}
            )
        }

        const data = await request.json();
        const user = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })

        if(!user){
            return NextResponse.json(
                {
                    succes: false,
                    status: 404,
                    message: "User not found",
                    data: null,
                    timestamp: new Date().getTime(),
                    path: `/api/users/?id=${id}`,
                    method: 'PUT'
                }, {status: 404}
            )
        }

        return NextResponse.json(
            {
                succes: true,
                status: 200,
                message: "User updated",
                data: user,
                timestamp: new Date().getTime(),
                path: `/api/users/?id=${id}`,
                method: "PUT"
            }, {status: 200}
        )

    }catch(error){
        return NextResponse.json(
            {
                succes: true,
                status: 500,
                message: "Error updating user",
                timestamp: new Date().getTime(),
                error: error instanceof Error ? error.message : "Error in server",
                path: "api/users",
                method: "POST"
            }, {status: 500}
        )
    }
 }

 export async function DELETE (request:NextRequest){
    try{
        await connectDB();
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        if(!id){
            return NextResponse.json(
                {
                    success: false,
                    status: 400,
                    message: "Id is required",
                    timestamp: new Date().getTime(),
                    path: "api/users",
                    method: "DELETE"
                }, {status: 400}
            )
        }
        const user = await User.findByIdAndDelete(id);

        if(!user){
            return NextResponse.json(
                {
                    succcess: false,
                    status: 404,
                    message: "User not found",
                    data: null,
                    timestamp: new Date().getTime(),
                    path: `/api/users/?id=${id}`,
                    method: "DELETE"
                }, {status: 404}
            )
        }

        return NextResponse.json(
            {
                success: true,
                status: 200,
                message: "User deleted",
                data: null,
                timestamp: new Date().getTime(),
                path: `/api/users/?id=${id}`,
                method: "DELETE"
            }, {status: 200}
        )

    }catch(error){
        return NextResponse.json(
            {
                sucess: false,
                status: 500,
                message: "Error deleting user",
                timestamp: new Date().getTime(),
                error: error instanceof Error ? error.message : "Error in server",
                path: "api/users",
                method: "DELETE"
            }, {status: 500}
        )
    }
 }