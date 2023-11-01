import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./App.scss";
import TaskForm from "./components/TaskForm/TaskForm";

const App = () =>{
  return (
    
    <Router>
      <div>
        <Routes>
          <Route path='/api/task' element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
