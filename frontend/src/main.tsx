import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
// import Blogs from "./pages/Blogs";
// import Publish from "./pages/Publish";
const Publish = lazy(() => import("./pages/Publish"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Blog = lazy(() => import("./pages/Blog"));
// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";
// import Blog from "./pages/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Ha ye karlo pehele</div>,
    children: [
      {
        index: true,
        element: <div>Hello from pata nahi konsa children</div>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/publish",
        element: <Publish />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
