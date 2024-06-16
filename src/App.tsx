import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import Game from "./Pages/Game/Game.tsx";
import Result from "./Pages/Result/Result.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play",
    element: <Game />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

const App = () => {

  return <RouterProvider router={router} />;
};

export default App;
