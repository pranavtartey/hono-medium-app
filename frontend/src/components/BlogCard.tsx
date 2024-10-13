import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}
const BlogCard = ({
  id,
  authorName,
  content,
  publishedDate,
  title,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-slate-200 pb-4 w-screen max-w-screen-md">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar size={"small"} name={authorName} />
          </div>
          <div className="font-extralight pl-2">{authorName} </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-400 text-sm font-thin">{`${Math.ceil(
          content.length / 100
        )} min read`}</div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name, size = "small" }: { name: string; size: string }) => {
  return (
    // <div
    //   className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    // >
    //   <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">
    //     {name[0]}
    //   </span>
    // </div>
    
<div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>

  );
};

export const Circle = () => {
  return <div className="h-1 w-1 rounded-full bg-slate-600"></div>;
};

export default BlogCard;
