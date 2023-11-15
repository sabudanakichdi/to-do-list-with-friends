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



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }
  // const [user, setUser] = React.useState(null);
  componentDidMount() {
    this.checklogin();
  }
  checklogin = async () => {
    const token = localStorage.getItem('authToken');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (token!==null && userDetails!==null && await AuthVerify()) {
      // Token exists and is valid
      console.log("this.state.user");
      this.setState({
        user: userDetails,
      });
      
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
export default App;
