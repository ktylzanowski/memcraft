import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import PriveRoute from "./utils/PriveRoute";

import RootLayout from "./pages/Root";
import DrawMemePage from "./pages/DrawMemePage";
import ErrorPage from "./pages/ErrorPage";
import Authentication from "./pages/Authentication";
import AddMemePage, { action as newMemeAction } from "./pages/AddMemePage";
import AccountPage from "./pages/Account/AccountPage";
import BoardPage, { loader as BoardLoader } from "./pages/BoardPage";
import DetailMemePage, { loader as DetailLoader } from "./pages/DetailMemePage";
import UserInfoPage, {
  loader as UserInfoLoader,
  action as UserInfoAction,
} from "./pages/Account/UserInfoPage";
import UserMemesPage, {
  loader as UserMemesLoader,
} from "./pages/Account/UserMemesPage";
import MemeUserLikesPage, {
  loader as MemesUserLikesLoader,
} from "./pages/Account/MemesUserLikesPage";
import MemesUserDislikesPage, {
  loader as MemesUserDislikesLoader,
} from "./pages/Account/MemesUserDislikesPage";
import UserCommentsPage, {
  loader as UserCommentsLoader,
} from "./pages/Account/UserCommentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DrawMemePage />,
      },
      {
        path: "/authentication",
        element: <Authentication />,
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
        ],
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
            element: <UserMemesPage />,
            loader: UserMemesLoader,
          },
          {
            path: "polajkowane",
            element: <MemeUserLikesPage />,
            loader: MemesUserLikesLoader,
          },
          {
            path: "zdislikowane",
            element: <MemesUserDislikesPage />,
            loader: MemesUserDislikesLoader,
          },
          {
            path: "komentarze",
            element: <UserCommentsPage />,
            loader: UserCommentsLoader,
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
