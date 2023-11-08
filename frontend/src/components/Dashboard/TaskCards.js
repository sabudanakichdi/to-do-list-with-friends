import React from 'react';
import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Pagination, Tabs, Tab, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const tasks = {
  groups: [
    { name: 'SE Capstone', inProgress: 5, toDo: 5, completed: 5 },
    { name: 'Dev', inProgress: 5, toDo: 5, completed: 8 },
    { name: 'Testing', inProgress: 3, toDo: 2, completed: 2 },
    { name: 'Personal', inProgress: 1, toDo: 2, completed: 3 },
    { name: 'SE Capstone', inProgress: 5, toDo: 5, completed: 10 }
    // ... other group tasks
  ],
  personal: [
    // personal tasks structured for the table
  ],
};

const ITEMS_PER_PAGE = 4;

export default function TaskCards() {
  const [value, setValue] = useState('groups');
  const [page, setPage] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  // Calculate the current items for the active page
  const indexOfLastItem = page * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = tasks.groups.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="task tabs"
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: 'black',
            },
            '.MuiTab-root': { 
                color: 'black', 
            },
            '.Mui-selected': {
              color: 'black',
              fontWeight: 'bold',
            },
          }}
        >
          <Tab value="groups" label="Groups" />
          <Tab value="personal" label="Personal" />
        </Tabs>
      </Box>
      {value === 'groups' && (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', padding: 2 }}>
            <Grid container spacing={2}>
              {currentItems.map((group, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ minWidth: 275, margin: 1 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {group.name}
                      </Typography>
                      <Stack direction="column" spacing={1} sx={{ my: 1.5 }}>

                        <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Chip 
                                icon={<HourglassEmptyIcon />} 
                                label={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                      <Typography variant="body2">In Progress</Typography>
                                      <Typography variant="body2" sx={{ 
                                        backgroundColor: 'theme.palette.secondary.main', 
                                        borderRadius: '12px', 
                                        padding: '2px 8px',
                                        marginLeft: '8px',
                                        color: 'black' 
                                      }}>
                                        {group.inProgress}
                                      </Typography>
                                    </Box>
                                  }
                                sx={{ width: '100%', justifyContent: 'center' }}
                            />
    
                           
                        </Box>

                        <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Chip 
                                icon={<ListAltIcon />} 
                                label={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                      <Typography variant="body2">To Do</Typography>
                                      <Typography variant="body2" sx={{ 
                                        backgroundColor: 'theme.palette.secondary.main', 
                                        borderRadius: '12px', 
                                        padding: '2px 8px',
                                        marginLeft: '8px',
                                        color: 'black' 
                                      }}>
                                        {group.toDo}
                                      </Typography>
                                    </Box>
                                  }
                                sx={{ width: '100%', justifyContent: 'center' }}
                            />
    
                            
                        </Box>

                        <Box width={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Chip 
                                icon={<CheckCircleOutlineIcon />} 
                                label={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                      <Typography variant="body2">Completed</Typography>
                                      <Typography variant="body2" sx={{ 
                                        backgroundColor: 'theme.palette.secondary.main', 
                                        borderRadius: '12px', 
                                        padding: '2px 8px',
                                        marginLeft: '8px',
                                        color: 'black' 
                                      }}>
                                        {group.completed}
                                      </Typography>
                                    </Box>
                                  }
                                sx={{ width: '100%', justifyContent: 'center' }}
                            />
    
                            
                        </Box>

                        
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Pagination
              count={Math.ceil(tasks.groups.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePaginationChange}
              color="primary"
            />
          </Box>
        </>
      )}
      {value === 'personal' && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="personal tasks table">
            <TableHead>
              <TableRow>
                <TableCell>Priority</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.personal.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.tags.join(', ')}</TableCell> {/* Assuming tags is an array */}
                  <TableCell>{task.owner}</TableCell>
                  <TableCell>{task.startDate.toLocaleDateString()}</TableCell> {/* Assuming startDate is a Date object */}
                  <TableCell>{task.endDate.toLocaleDateString()}</TableCell> {/* Assuming endDate is a Date object */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
