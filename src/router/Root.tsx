import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Layout from "../layout/Layout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Detail from "../components/Detail";

const routers = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/detail/:id",
                element: <Detail />,
            },
        ]
    }
]);


export default routers