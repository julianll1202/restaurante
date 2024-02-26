import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const login = async (req, res) => {
    const {username, password} = req.body;
    let user = await prisma.user.findFirst({
        where: {
            username: username
        },
    })
    console.log(user.username);
    if (!user)
        return "User not found";
    if (user.password === password){
        console.log("Password");
        res.status(200);
    }
    else
        return "Invalid password";
};