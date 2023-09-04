import { PrismaClient } from "@prisma/client";
import User from "../entities/user";
import bcrypt from "bcrypt"
import { hashValue } from "../../config";

const prisma = new PrismaClient();//TODO: set up no recreation of prisma client

export async function addUser(user:User):Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}> {
    let dbUser = await prisma.user.create({data: {
        email: user.email,
        name: user.name,
        password: bcrypt.hashSync(
            user.password, 
            bcrypt.genSaltSync(Number(hashValue))
            ) 
    }});

    dbUser.password = "";

    return dbUser;
}

export async function getUsers() {

    return (await getUsersWithPasswords()).map(user=>{
        user.password = "";
        return user;
    });
}

export async function getUsersWithPasswords() {
    let users = await prisma.user.findMany();
    
    return users;
}

