import React from 'react';
import './Dashboard.css';

import PieChartComponent from './PieChartComponent';
import TaskCategories from './TaskCategories';
import SearchAndTags from './SearchAndTags';
import SelectTextFields from './SelectTextFields';
import TaskCards from './TaskCards';


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
        <div>
          <PieChartComponent type="group" />
        </div>
        <div>
          <PieChartComponent type="personal" />
        </div>
      </div>
      
      <div className="task-cards-container">
        <TaskCards />
      </div>
      <SearchAndTags />
      
    </div>
  );
}

export default Dashboard;