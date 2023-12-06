import React,{useState} from "react";
import "./Dashboard.css";
import PieChartComponent from "./PieChartComponent";
import SelectTextFields from "./SelectTextFields";
import TaskCards from "./TaskCards";
import {getLoggedinUser} from '../../context/AuthContext';
import AddTaskButton from "./AddTaskButton";

function Dashboard() {
  let loggedinuser = getLoggedinUser();
  console.log("loggedinuser",loggedinuser);
  const [selectedGroup, setSelectedGroup] = useState(''); // [selectedGroup, setSelectedGroup
  const handleGroupChange = (group) => {
    console.log("Selected group Dashboard", group);
    setSelectedGroup(group);
  };


function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="task-group-selection">
          <SelectTextFields onGroupChange={handleGroupChange}/>
        </div>

        <div className="pie-chart-title-container">
          <div className="pie-chart-title">Your Personal Tasks:</div>
        </div>
      </div>
      <div className="pie-charts">
        <PieChartComponent type="group" group={selectedGroup}/>
        <PieChartComponent type="personal" />
      </div>

      <div className="task-cards-container">
        <TaskCards />
      </div>
      <div className="add-task-button-container">
        <AddTaskButton />
      </div>
    </div>
  );
}

export default Dashboard;
