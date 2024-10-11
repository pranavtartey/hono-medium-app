import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@pranavtartey/medium-common-zod";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (context) => {
    const prisma = new PrismaClient({
        datasourceUrl: context.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await context.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        context.status(411);
        return context.json({
            message: "Inputs are not correct"
        })
    }
    try {

        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            },
            select: {
                id: true,
                name: true,
            }
        })

        const jwt = await sign(
            {
                id: user.id
            }, context.env.JWT_SECRET
        )

        return context.text(jwt)
    } catch (error) {
        console.log("Something went wroong in the signup route : ", error)
        context.status(411);
        return context.text("Invalid")
    }
})


userRouter.post("/signin", async (context) => {
    const prisma = new PrismaClient({
        datasourceUrl: context.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await context.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success) {
        context.status(411);
        return context.json({
            message : "Inputs are not correct"
        })
    }
    try {

        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password,
            },
            // select: {
            //   id: true,
            //   name: true,
            // } 
            //if i uncomment this then inside my jwt sign i'll only have the id and the name for the user and if it is commented then I am having the full user object
        })

        console.log("This is the user you found : ", user);

        if (!user) {
            context.status(403)//used for the unauthorized routes
            return context.json({
                "message": "Incorrect Credentials"
            })
        }

        const jwt = await sign(
            {
                id: user.id
            }, context.env.JWT_SECRET
        )

        return context.text(jwt)
    } catch (error) {
        console.log("Something went wroong in the signup route : ", error)
        context.status(411);
        return context.text("Invalid")
    }
})