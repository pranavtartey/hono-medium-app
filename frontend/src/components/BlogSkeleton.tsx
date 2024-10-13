import { Circle } from "./BlogCard";

const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="border-b-2 border-slate-200 pb-4 w-screen max-w-screen-md">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            {/* <Avatar size={"small"} name={authorName} /> */}
          </div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          {/* <div className="font-extralight pl-2">{authorName} </div> */}
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
          {/* <div className="pl-2 font-thin text-slate-500">{publishedDate}</div> */}
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        {/* <div className="text-xl font-semibold">{title}</div> */}
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
          {/* {content.slice(0, 100) + "..."} */}
        </div>
        <div className="text-slate-400 text-sm font-thin">
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
          {/* {`${Math.ceil(content.length / 100)} min read`} */}
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default BlogSkeleton;
