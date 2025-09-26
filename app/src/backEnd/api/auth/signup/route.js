import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient()

export async function POST (request) {
    try {
        const {name, email, password} = await request.json()
        if (!name || !email || !password) {
            return NextResponse.json(
                {message:'All fields are required!'},
                {status:400}
            )
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email:email.toLowerCase()
            }
        })
        if (existingUser) {
             return NextResponse.json(
                {message:'A user with this email already exists!'},
                {status:409}
            )
        }
        const saltRounds = 12 
        const hashedPassword = await bcrypt.hashed(password, saltRounds)
        const newUser = await prisma.user.create({
            data:{
                name:name.trim(),
                email:email.toLowerCase(),
                password:hashedPassword
            },
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true
            }
        })
          return NextResponse.json(
                {message:'User created successfully !',
                    user:newUser
                },
                {status:201}
            )
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