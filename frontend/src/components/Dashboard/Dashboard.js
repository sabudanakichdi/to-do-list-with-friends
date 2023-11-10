import React from 'react';
import './Dashboard.css';
import PieChartComponent from './PieChartComponent';
import SelectTextFields from './SelectTextFields';
import TaskCards from './TaskCards';
import Search from './Search'; 
import Tags from './Tags';  
import AddTaskButton from './AddTaskButton'; 

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="task-group-selection">
          <SelectTextFields />
        </div>
        
        <div className="pie-chart-title-container">
          <div className="pie-chart-title">Your Personal Tasks:</div>
        </div>
      </div>
      <div className="pie-charts">
        <PieChartComponent type="group" />
        <PieChartComponent type="personal" />
      </div>
      
      <div className="task-cards-container">
        <TaskCards />
      </div>
      <div className="search-container">
        <Search />
      </div>
      <div className="tags-container">
        <Tags />
      </div>
      <div className="add-task-button-container">
        <AddTaskButton />
      </div>
    </div>
  );
}

export default Dashboard;
