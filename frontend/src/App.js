import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PriveRoute from "./utils/PriveRoute"
import RootLayout from "./pages/Root";
import DrawMeme, { loader as MemeLoader } from "./pages/DrawMeme";
import ErrorPage from "./pages/ErrorPage";
import Authentication from "./pages/Authentication";
import AddMemePage, {action as newMemeAction} from "./pages/AddMemePage";
import AccountPage, {loader as InfoLoader, action as ChangeUserInfo} from "./pages/AccountPage";
import {action as newComment} from "./pages/DrawMeme"
import BoardPage, {loader as BoardLoader} from "./pages/BoardPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DrawMeme />,
        loader: MemeLoader,
        action: newComment,
        children: [
          {
            path: "authentication",
            element: <Authentication />,
          },
        ],
      },
      {
        path: "tablica",
        element: <BoardPage />,
        loader: BoardLoader,
        action: newComment,
      },
    {
      element: <PriveRoute />,
      children: [
        {
          path: "dodajmema",
          element: <AddMemePage />,
          action: newMemeAction,
        },
        {
          path: "konto",
          element: <AccountPage />,
          loader: InfoLoader,
          action: ChangeUserInfo,
        }
      ]
    }
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
