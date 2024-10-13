
import { createBlogInput, updateBlogInput } from "@pranavtartey/medium-common-zod";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (context, next) => {
    const authHeader = context.req.header("Authorization") || ""

    const user = await verify(authHeader, context.env.JWT_SECRET);
    if (user) {
        context.set("userId", user.id as string);
        console.log("Hello")
        await next();
    } else {
        context.status(403);
        return context.json({
            message: "You are not logged in"
        })
    }
})

blogRouter.post("/", async (context) => {
    try {
        const body = await context.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            context.status(411);
            return context.json({
                message: "create blog inputs are not correct"
            })
        }

        const authorId = context.get("userId")
        const prisma = new PrismaClient({
            datasourceUrl: context.env.DATABASE_URL
        }).$extends(withAccelerate())
        console.log("Hello from inside")
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)
            }
        })
        return context.json({
            id: blog.id
        })

    } catch (error) {
        console.log("Error while posting the blog : ", error);
        context.status(411);
        return context.json({
            message: "Error while posting the blog"
        })
    }

})


blogRouter.put("/", async (context) => {
    try {
        const body = await context.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            context.status(411);
            return context.json({
                message: "update blog inputs are not correct"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl: context.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return context.json({
            id: blog.id
        })

    } catch (error) {
        console.log("Error while putting the data in the blogs : ", error);
        context.status(411);
        return context.json({
            message: "Error while putting the data in the blogs"
        })
    }

})

//scope for adding the pagination to this route
blogRouter.get("/bulk", async (context) => {
    const prisma = new PrismaClient({
        datasourceUrl: context.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return context.json({
        blogs
    })
})


blogRouter.get("/:id", async (context) => {
    try {
        const id = context.req.param("id");
        const prisma = new PrismaClient({
            datasourceUrl: context.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return context.json({
            blog
        })

    } catch (error) {
        console.log("Something went wrong in the get blogs route : ", error)
        context.status(411)
        return context.json({
            message: "Error while fetching the post"
        })
    }

})

