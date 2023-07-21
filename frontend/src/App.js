import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import DrawMeme, { loader as MemeLoader } from "./pages/DrawMeme";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./context/AuthContext";
import PriveRoute from "./utils/PriveRoute"
import AddMemePage, {action as newMemeAction} from "./pages/AddMemePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
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
