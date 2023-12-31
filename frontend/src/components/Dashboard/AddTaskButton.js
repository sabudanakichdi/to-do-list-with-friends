import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

function AddTaskButton() {


  const navigate = useNavigate();
  const handleAddTaskClick = () => {
    navigate("/task");
  };
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "20px",
        padding: "10px 25px",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
      startIcon={<AddIcon />}
      onClick={handleAddTaskClick}
    >
      ADD TASK
    </Button>
  );
}

export default AddTaskButton;
