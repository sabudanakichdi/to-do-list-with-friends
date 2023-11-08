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
import GroupManagement from "./pages/groupManagement"

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

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/forgot" Component={Forgotpwd} />
            <Route path="/reset" Component={Resetpwd} />
            <Route path="/task" element={<TaskForm />} />
            <Route path="/group" element={<GroupManagement />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
}
