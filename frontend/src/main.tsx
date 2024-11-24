import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.tsx"
import Play from "./pages/Play.tsx"
import Guide from "./pages/Guide.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/guide", element: <Guide /> },
  { path: "/matches", element: <Play />}
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
