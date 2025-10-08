import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@/src/generated/prisma";

const prisma = new PrismaClient()

export async function GET (request) {
    try {
        const token = request.cookies.get('token')?.value
        if (!token) {
            return NextResponse.json(
                {message:'Not authenticated'},
                {status:401}
            )
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where:{id:decoded.userId},
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true
            }
        })
        if (!user) {
            return NextResponse.json(
                {message:'User not found'},
                {status:401}
            )
        }
        return NextResponse.json(
            {
                message:'Successfully authenticated',
                user:user
            },
            {status:200}
        )
    }
    catch(error) {
        if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return NextResponse.json(
                {message:'invalid or expired token'},
                {status:401}
            )
        }
         if (error.code && error.code.startsWith('P')) {
                 return NextResponse.json(
                    {message:'Database error occured !'},
                    {status:500}
                )
            }
             return NextResponse.json(
                    {message:'Internal server error !'},
                    {status:500}
                )
    }finally {
            await prisma.$disconnect
        }
}