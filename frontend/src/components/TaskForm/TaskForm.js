import React, { useState } from 'react';
import './TaskForm.css';
import axios from 'axios';

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    group: '',
    tags: '',
    description: '',
    priority: '',
    status: '',
    assignee: 'unassigned',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleCreateTask = async (event) => {
  
    let missingFields = [];
    if (!formData.title) missingFields.push('Title');
    if (!formData.description) missingFields.push('Description');
    if (!formData.status) missingFields.push('Status');
    if (!formData.priority) missingFields.push('Priority');
  
    if (missingFields.length > 0) {
      alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
      return;
    }
    try {
      event.preventDefault();
      const endpoint = 'http://localhost:8000/api/task';
      const response = await axios.post(endpoint, formData);
      if(response.status === 200){
         alert('Task created successfully');
      }else{ alert('Task not created')}
      console.log('Task created successfully:', response.data);
        
    } catch (error) {
      console.error('Error creating task:', error);
      alert('An error occurred while creating the task. Please try again.');
    }
  };

  return (
    <form className="task-form">
      <div className="header">
        Task Management
        <span className="header-icons">
          <span>←</span>
          <span>×</span>
        </span>
      </div>

      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title of the task" required />

      <div className="group-container">
    <label htmlFor="group">Group</label>
    <div className="group-input-button">
        <select id="group" name="group" value={formData.group} onChange={handleInputChange}>
            <option value="" disabled>Please select</option>
            {/* You can map over your groups here */}
        </select>
        <button type="button" className="add-group-btn">+ New</button>
    </div>
</div>


      <label htmlFor="tags">Tags</label>
      <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Add tags" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description of the task" required></textarea>

      <div className="priority-status-container">
    <div>
        <label htmlFor="priority">Priority</label>
        <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} required>
            <option value="" disabled>Please Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    </div>

    <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
            <option value="" disabled>Please Select</option>
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Done</option>
        </select>
    </div>
</div>


      <div className="right-section">
        <label htmlFor="assignee">Assignee</label>
        <select id="assignee" name="assignee" value={formData.assignee} onChange={handleInputChange}>
          <option value="unassigned">Unassigned</option>
          {/* Add other assignees here */}
        </select>

        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} />

        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} />
      </div>

      <div className="actions">
        <button type="button" className="create-btn" onClick={handleCreateTask}>Create</button>
        <button type="button" className="cancel-btn">Cancel</button>
      </div>
    </form>
  );
}

export default TaskForm;
