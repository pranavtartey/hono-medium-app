import axios from "axios";
import { useEffect, useState } from "react"


export interface Blog {
    content: string;
    id: number;
    title: string;
    author: {
        name: string;
    };
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        ).then((response) => {
            console.log(response.data.blog)
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, [id])
    return {
        loading,
        blog

    }

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }

        }
        ).then((response) => {
            console.log(response.data.blogs)
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, [])
    return {
        loading,
        blogs

    }
}