import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PriveRoute from "./utils/PriveRoute"
import RootLayout from "./pages/Root";
import DrawMeme, { loader as MemeLoader } from "./pages/DrawMeme";
import ErrorPage from "./pages/ErrorPage";
import Authentication from "./pages/Authentication";
import AddMemePage, {action as newMemeAction} from "./pages/AddMemePage";
import AccountPage, {loader as InfoLoader, action as ChangeUserInfo} from "./pages/AccountPage";

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
