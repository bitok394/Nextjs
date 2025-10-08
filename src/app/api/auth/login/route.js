import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { PrismaClient } from "@/src/generated/prisma";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST (request) {
    try {
        const {email,password} = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                {message:"email and password are required"},
                {status:400}
            )
        } 
        // query the db to find user with this email
        const user = await prisma.user.findUnique({
            where:{
                email:email.toLowerCase()
            }
        })
        if (!user) {
            return NextResponse.json(
                {message:"invalid email or password"},
                {status:400}
            )
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                {message:"invalid email or password"},
                {status:400}
            )
        }
        // creating jwt token for authetication
        const token = jwt.sign(
            {
                userId:user.id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'7d'
            }
        )
        const response = NextResponse.json(
            {
                message:'Login successful',
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    createdAt:user.createdAt
                }
            },
            {
                Status:200
            }
        )
        // extra protection protocols
        response.cookies.set('token', token, {
            httpOnly: true,
            secure:processed.env.NODE_ENV === "production",
            sameSite:'lax',
            maxAge:7*24*60*60*1000
        })
        return response
    }
    catch (error) {
            if (error.code && error.code.startsWith('P')) {
                 return NextResponse.json(
                    {message:'Database error occured !'},
                    {status:500}
                )
            }
             return NextResponse.json(
                    {message:'Internal sever error !'},
                    {status:500}
                )
        } finally {
            await prisma.$disconnect
        }
}