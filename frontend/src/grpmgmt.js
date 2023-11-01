import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Checkbox } from '@material-ui/core';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>Group: SE Capstone</h1>
      <Paper style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>

              <TableCell>End date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* We'll assume the dummy API returns an array of tasks */}
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.tag}</TableCell>
                <TableCell>{task.owner}</TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          + Add Task
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteGroup}>
          Delete Group
        </Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Members</h3>
        <ul>
          {/* Assume the dummy API returns an array of members */}
          {members.map(member => (
            <li key={member.id}>
              <Checkbox checked={member.checked} onChange={() => handleCheckboxChange(member.id)} />
              {member.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const tasks = [
  // Dummy data returned by an API
  { id: 1, priority: 'High', title: 'Article 1', status: 'In progress', tag: 'Tag 1', owner: 'Akash A', startDate: '10 Jan 2023', endDate: '12 Jan 2023' },
  // ... Add other tasks
];

const members = [
  // Dummy data returned by an API
  { id: 1, name: 'Akash A', checked: false },
  // ... Add other members
];

function handleAddTask() {
  // Implement your logic here, maybe opening a modal for adding tasks
}

function handleDeleteGroup() {
  // Implement your logic here for deleting the group
}

function handleCheckboxChange(id) {
  // Update the checkbox state, for instance:
  const memberToUpdate = members.find(member => member.id === id);
  if (memberToUpdate) memberToUpdate.checked = !memberToUpdate.checked;
  // Force a re-render or use a state management tool or React state
}

export default App;