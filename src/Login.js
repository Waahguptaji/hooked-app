import "./Login.css";
import { loginUrl } from "./spotify";
const Login = () => {
  return (
    <div className="login">
      <img src="../images/logo.png" alt="" />
      <a href={loginUrl}>Login With Spotify</a>
    </div>
  );
};

export default Login;
