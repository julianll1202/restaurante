import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../config/index.js";

const prisma = new PrismaClient();

export const login = async (req, res) => {
    const {username, password} = req.body;
    let user = await prisma.users.findFirst({
        where: {
            username: username
        },
    })
    if (!user)
        return {"response":"User not found"};
    if (user.password === password){
        const token = jwt.sign({userId: user.userId}, JWT_SECRET_KEY, { expiresIn: '1h'});
        return {"response":"Authorized entry", "user": user, "token": token};
    }
    else
        return {"response":"Invalid password"};
};