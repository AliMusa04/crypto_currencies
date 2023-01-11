import Favourites from "../page/Favourites/Favourites";
import Home from "../page/Home/Home";
import MainComp from "../page/MainComp";

export const ROUTES = [
  {
    path: "/",
    element: <MainComp />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
    ],
  },
];
