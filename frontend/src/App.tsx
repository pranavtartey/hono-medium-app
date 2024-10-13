import "./App.css";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Appbar from "./components/Appbar";

function App() {
  return (
    <>
    <Toaster richColors/>
    <Appbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
