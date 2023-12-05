import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import config from "../../config.json";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import AssigneeComponent from "./AssigneeComponet";
import { Link } from "react-router-dom";
const backendUrl = config.backendUrl;
function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    group: "",
    tags: [""],
    description: "",
    priority: "",
    status: "",
    assignee: "unassigned",
    startDate: "",
    endDate: "",
  });
  const [options, setOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  
  
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewGroupName("");
  };

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get(backendUrl + "/api/group") // Replace with your API endpoint
      .then((response) => {
        const data = response.data.data;

        // Transform the object into an array of objects
        const optionsArray = Object.keys(data).map((key) => ({
          _id: key,
          name: data[key],
        }));
        setOptions(optionsArray);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  const handleAssinee = (user) => {
    setSelectedUser(user);
    formData.assignee = user._id;
    console.log("Task Form User", user);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleTagAdd = (event) => {
    if (tagInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };
  const handleTagDelete = (tagToDelete) => () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleNewGroup = async (event) => {
    event.preventDefault();
    openDialog();
  };
  const handleAddGroup = async () => {
    if (newGroupName) {
      const createdGroup = await axios.post(backendUrl + "/api/group", {
        name: newGroupName,
      });
      if (createdGroup) {
        closeDialog();
        setOptions((prevOptions) => [
          ...prevOptions,
          {
            _id: createdGroup.data.data._id,
            name: createdGroup.data.data.name,
          },
        ]);
      }
    }
  };
  const handleCreateTask = async (event) => {
    let missingFields = [];
    if (!formData.title) missingFields.push("Title");
    if (!formData.description) missingFields.push("Description");
    if (!formData.status) missingFields.push("Status");
    if (!formData.priority) missingFields.push("Priority");

    if (missingFields.length > 0) {
      alert(
        `Please fill out the following fields: ${missingFields.join(", ")}`
      );
      return;
    }
    try {
      event.preventDefault();
      const endpoint = backendUrl + "/api/task";
      const response = await axios.post(endpoint, formData);
      console.log("Form Data", formData);
      if (response.status === 200) {
        alert("Task created successfully");
      } else {
        alert("Task not created");
      }
      console.log("Task created successfully:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("An error occurred while creating the task. Please try again.");
    }
  };

  return (
    <form className="task-form">
      <div className="header">
        Task Management
        <span className="header-icons">
          <Link to="/" style={ {color:"inherit", textDecoration:"none"}}>
            <span>←</span>
            <span>×</span>
          </Link>
        </span>
      </div>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title of the task"
        required
      />

      <div className="group-container">
        <label htmlFor="group">Group</label>
        <div className="group-input-button">
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            value={selectedGroup}
            onChange={(event, newValue) => {
              setSelectedGroup(newValue);
              setFormData((prevFormData) => ({
                ...prevFormData,
                group: newValue ? newValue._id : "", // Set to an empty string if newValue is null
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select a group" />
            )}
            className="group-options"
            isOptionEqualToValue={(option, value) => option.name === value.name}
          />

          <button
            type="button"
            className="add-group-btn"
            onClick={handleNewGroup}
          >
            + New
          </button>
        </div>
      </div>
      <div className="tags-container">
        <label htmlFor="tags">Tags</label>
        <div className="tags-input">
          {formData.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={handleTagDelete(tag)}
              color="primary"
              variant="outlined"
              size="small"
              className="tag-chip"
            />
          ))}
          <TextField
            label="Add a tag"
            variant="outlined"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTagAdd();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleTagAdd}
            className="add-tag-button"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="description-area">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description of the task"
          required
        ></textarea>
      </div>
      <div className="priority-status-container">
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Please Select
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Please Select
            </option>
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div>
        {selectedGroup ? (
          <AssigneeComponent
            username={handleAssinee}
            groupName={selectedGroup.name}
          />
        ) : null}
      </div>
      <div className="right-section">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
      </div>

      <div className="actions">
        <button type="button" className="create-btn" onClick={handleCreateTask}>
          Create
        </button>
        <button type="button" className="cancel-btn">
          Cancel
        </button>
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Add a New Group</DialogTitle>
        <DialogContent>
          <TextField
            label="Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddGroup} color="primary">
            Add
          </Button>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default TaskForm;
