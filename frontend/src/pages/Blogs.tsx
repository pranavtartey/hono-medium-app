// import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

interface Blog {
  content: string;
  id: number;
  title: string;
  author: {
    name: string;
  };
}
const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <Appbar /> */}
      <div className="flex justify-center p-4">
        <div className="">
          {blogs.map((blog: Blog) => {
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name}
                content={blog.content}
                publishedDate={"21/11/1999"}
                title={blog.title}
              />
            );
          })}
          {/* <BlogCard
            authorName={"Pranav Tartey"}
            content={
              "How a Ugly single website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"21/11/1999"}
            title={
              "How a Ugly single website makes $5000 a month without affiliate marketing"
            }
          />
          <BlogCard
            authorName={"Pranav Tartey"}
            content={
              "How a Ugly single website makes $5000 a month without affiliate marketing"
            }
            publishedDate={"21/11/1999"}
            title={
              "How a Ugly single website makes $5000 a month without affiliate marketing"
            }
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
