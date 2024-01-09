import React, { useEffect } from "react";
import Login from "./Login";
import { useStateValue } from "../utils/StateProvider";
import Hooked from "./Hooked";

function App() {
  const [{ token }, dispatch] = useStateValue(); //dispatch is like a gun we shoot it to data layer in order to change and update data values to use that

  useEffect(() => {
    const hash = window.location.hash; //Here we getting the all tokken format.
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({
        type: "SET_TOKEN",
        token: token,
      });
    }
  }, [token, dispatch]);

  return <div className="App">{token ? <Hooked /> : <Login />}</div>;
}

export default App;
