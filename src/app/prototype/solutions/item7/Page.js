import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <div>
      {!token ? (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <Posts token={token} />
      )}
    </div>
  );
};

export default App;
