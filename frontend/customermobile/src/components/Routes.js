import { useRoutes } from "react-router-dom";
import Home from "./Home";
import Rent from "./Rent";



function Router() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "rent",
        element: <Rent />,
    },
  ]);

  return element;
}

export default Router;