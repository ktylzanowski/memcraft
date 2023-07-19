import { Route, Riderect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  console.log("PRIVATE");
  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
