import { useRoutes } from "react-router-dom";
import Home from "./Home";
import Inlogg from "./Inlogg";
import Register from "./Register";
import Rides from "./Rides";
import Account from "./Account";
import Payment from "./Payment";

function Router() {
    let element = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "inlogg",
            element: <Inlogg />,
        },
        {
            path: "registera",
            element: <Register />,
        },
        {
            path: "rides",
            element: <Rides />,
        },
        {
            path: "account",
            element: <Account />,
        },
        {
            path: "payment",
            element: <Payment />,
        },
    ]);

    return element;
}
//test git
export default Router;
