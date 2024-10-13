import FullBlog from "../components/FullBlog"
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";

const Blog = () => {
    const {id} = useParams();
    const {blog, loading} = useBlog({
        id : id || ""
    }
    );
    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}

export default Blog