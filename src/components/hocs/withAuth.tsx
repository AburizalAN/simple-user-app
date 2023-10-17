import Login from "../reusable/Login";
import Cookies from "js-cookie";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const WithAuth = (props: P) => {
    const jwtToken = Cookies.get("jwtToken") ?? null
    return jwtToken ? (
      <Component {...props} />
    ) : (
      <Login {...props} />
    );
  };
  return WithAuth;
};

export default withAuth;