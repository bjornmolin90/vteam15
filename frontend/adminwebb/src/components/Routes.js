import { useRoutes } from "react-router-dom";
import Home from "./Home";
import Inlogg from "./Inlogg";
import Register from "./Register";
import Customers from "./Customers";
import Elscooters from "./Elscooters";
import Map from "./Map";



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
        path: "customers",
        element: <Customers />,
    },
    {
        path: "elscooters",
        element: <Elscooters />,
    },
    {
        path: "map",
        element: <Map />,
    },
  ]);

  return element;
}

export default Router;