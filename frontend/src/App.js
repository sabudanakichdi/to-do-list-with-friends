import React from "react";

import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgotpwd from "./pages/auth/Forgotpwd";
import Resetpwd from "./pages/auth/Resetpwd";
import { createTheme, ThemeProvider } from "@mui/material";
import TaskForm from "./components/TaskForm/TaskForm";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import GroupManagement from "./pages/groupManagement";
import { AuthVerify } from "./context/AuthContext";
import Cookies from 'js-cookie';
const theme = createTheme({
  palette: {
    secondary: {
      main: "#DDE1E2",
    },
    primary: {
      main: "#000000",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    this.checklogin();
    console.log("Component mounted")
  }
  checklogin = async () => {
    const token = Cookies.get("authToken");
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    console.log("token", token);
    if (token !== null && userDetails !== null && (await AuthVerify())) {
      // Token exists and is valid
      console.log("this.state.user", this.state.user);
      this.setState({
        user: userDetails,
      });
      // return (<Dashboard/>)
    } else {
      this.setState({
        user: null,
      });
    }
    console.log(this.state.user);
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgotpwd />} />
            <Route path="/reset" element={<Resetpwd />} />
            <Route path="/task" element={<TaskForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Login />} /> 
            <Route path="/group" element={<GroupManagement />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;

