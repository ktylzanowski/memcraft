import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import DrawMeme, { loader as MemeLoader } from "./pages/DrawMeme";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./context/AuthContext";
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
