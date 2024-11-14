import { connectDB } from "@/libs/mongoDB";
import User from "@/models/user"
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    await connectDB();
    const data = await request.json();

    const user = await User.create(data);
    return NextResponse.json(user);
}