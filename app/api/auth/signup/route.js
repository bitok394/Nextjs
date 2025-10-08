import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

export async function POST (request) {
    try {
        // extra email name and password from request body json
        const {name, email, password} = await request.json()
        // check if all the required fields have values
        if (!name || !email || !password) {
            // returns an error message if any field is missing 
            return NextResponse.json(
                {message:'All fields are required!'},
                {status:400}
            )
        }
        // query the data base to see if the user with this email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email:email.toLowerCase()
            }
        })
        // if user already exists return conflict error
        if (existingUser) {
             return NextResponse.json(
                {message:'A user with this email already exists!'},
                {status:409}
            )
        } 
        // set saltrounds fro brycpt hashing to 12
        const saltRounds = 12 
        // hash the password with the specified saltRound
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        // create anew user in the db
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
        await prisma.$disconnect()
    }
}