import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import PriveRoute from "./utils/PriveRoute";

import RootLayout from "./pages/Root";
import DrawMeme, { loader as MemeLoader } from "./pages/DrawMeme";
import ErrorPage from "./pages/ErrorPage";
import Authentication from "./pages/Authentication";
import AddMemePage, { action as newMemeAction } from "./pages/AddMemePage";
import AccountPage from "./pages/Account/AccountPage";
import BoardPage, { loader as BoardLoader } from "./pages/BoardPage";
import DetailMemePage, { loader as DetailLoader } from "./pages/DetailMemePage";
import UserInfoPage,{
  loader as UserInfoLoader,
  action as UserInfoAction,
} from "./pages/Account/UserInfoPage";
import MyMemesPage from "./pages/Account/MyMemesPage";

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
      },
      {
        path: "meme/:id",
        element: <DetailMemePage />,
        loader: DetailLoader,
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
            element: <AccountPage />,
            path: "konto",
            children: [
              {
                index: true,
                element: <UserInfoPage />,
                loader: UserInfoLoader,
                action: UserInfoAction,
              },
              {
                path: "mojememy",
                element: <MyMemesPage/ >
              }
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <MessageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MessageProvider>
    </>
  );
}

export default App;
