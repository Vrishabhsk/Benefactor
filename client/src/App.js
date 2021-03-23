import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { indigo, red } from "@material-ui/core/colors";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo,
  },
  typography: {
    fontFamily: "Space Mono, monospace",
  },
});

function App() {
  const [isAuth, setIsAuth] = useState(false);

  function setAuth(boolean) {
    setIsAuth(boolean);
  }

  function checkAuth() {
    axios
      .get("/verified", {
        headers: { token: localStorage.token },
      })
      .then((res) => {
        res.data === true ? setIsAuth(true) : setIsAuth(false);
      });
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home isAuth={isAuth} />} />
          <Route
            path="/Register"
            render={(props) =>
              !isAuth ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/Dashboard" />
              )
            }
          />
          <Route
            path="/Login"
            render={(props) =>
              !isAuth ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/Dashboard" />
              )
            }
          />
          <Route
            path="/Dashboard"
            render={(props) =>
              isAuth ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/Login" />
              )
            }
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
