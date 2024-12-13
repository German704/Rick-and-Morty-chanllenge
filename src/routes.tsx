import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/home";
import Detail from "./pages/detail";

const createBrowser = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "/",element: <Home/>},
            {path: "/character/:id",element: <Detail/>}
        ]
    },
])

export default createBrowser;