import React, { useEffect } from 'react';
import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Pagination, Tabs, Tab, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import config from '../../config.json';
import Cookies from 'js-cookie';


const backendUrl = config.backendUrl;


const priorityChipStyles = {
    High: {
      backgroundColor: '#ff4a4a', 
      color: 'black',
    },
    Medium: {
      backgroundColor: '#ffb74a', 
    },
    Low: {
      backgroundColor: '#ececec', 
      color: 'black',
    },
  };
  
  

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
    {
        priority: 'High',
        title: 'Article 1',
        status: 'In progress',
        tags: 'Tag 1',
        owner: 'Akash A',
        startDate: new Date('2023-01-10'),
        endDate: new Date('2023-01-12')
      },

      {
        priority: 'Medium',
        title: 'Article 2',
        status: 'In progress',
        tags: 'Tag 2',
        owner: 'Akash A',
        startDate: new Date('2023-01-10'),
        endDate: new Date('2023-10-12')
      },

      {
        priority: 'Low',
        title: 'Article 3',
        status: 'In progress',
        tags: 'Tag 3',
        owner: 'Akash A',
        startDate: new Date('2023-01-10'),
        endDate: new Date('2023-04-12')
      },
      // ...more tasks
    ],
  };

const ITEMS_PER_PAGE = 4;



export default function TaskCards() {
  const [value, setValue] = useState('groups');
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState("");
  const [options, setOptions] = useState([]);
  const [groupName, setGroupName] = useState([]);
  const [groupStats, setGroupStats] = useState([]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handlePaginationChange = (event, value) => {
    setPage(value);
  };
  
  const getPriorityChip = (priority) => {
    return (
      <Chip
      label={priority}
      size="small"
      sx={{ ...priorityChipStyles[priority], borderRadius: '4px' }}
      />
      );
    };
    // Calculate the current items for the active page
    const indexOfLastItem = page * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = groupName.map( (group) => group.slice(indexOfFirstItem, indexOfLastItem));
    
    useEffect(() => {
      async function fetchUser() {
        var token = Cookies.get("authToken");
        var user = JSON.parse(Cookies.get("userDetails"));
        const response = await axios.post(backendUrl + "/api/auth/isauth", {
          token: token,
          email: user.email,
        });
        console.log("Dashboard response", response.data.userid);
  
        setUserId(response.data.userid);
      }
      async function fetchGroups() {
        await axios
          .get(backendUrl + `/api/group/user/${userId}`)
          .then((response) => {
            const groupsMap = response.data.data;
            console.log("Groups Map ===>", groupsMap);
            setGroupName( groupsMap.map((group) => group.name));
            const groupId = groupsMap.map((group) => group._id);
            const optionsArray = Object.entries(groupId).map(
              ([key, value]) => ({
                _id: key,
                name: value,
              })
            );
            
            if (optionsArray.length > 0) {
              console.log("Options Array", optionsArray);
              setOptions(optionsArray);
              console.log("Options", options);
            } else {
              console.error("No data received from the API.");
            }
          })
          .catch((error) => {
            console.error("Error fetching groups:", error);
          });
      }
      async function fetchStats() {
        const groupNameArray = groupName.map((group) => group.name);
        console.log("Group Name Array", groupNameArray);
        await axios
          .get(backendUrl + `/api/dashboard/${groupName}/stats`)
          .then((response) => {
            const stats = response.data;
            console.log("Options_ID", groupName);
            console.log("Stats ===>", stats);
            setGroupStats(stats);
          })
          .catch((error) => {
            console.error("Error fetching stats:", error);
          });
      }
  
      fetchUser();
      fetchGroups();
      fetchStats();

    } , [userId]);


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
                        {groupName}
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
                                        {groupStats.inProgress}
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
                                        {groupStats.toDo}
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
                                      <Typography variant="body2">Done</Typography>
                                      <Typography variant="body2" sx={{ 
                                        backgroundColor: 'theme.palette.secondary.main', 
                                        borderRadius: '12px', 
                                        padding: '2px 8px',
                                        marginLeft: '8px',
                                        color: 'black' 
                                      }}>
                                        {groupStats.done}
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
                  <TableCell>{getPriorityChip(task.priority)}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.tags}</TableCell>
                  <TableCell>{task.owner}</TableCell>
                  <TableCell>{task.startDate.toLocaleDateString()}</TableCell>
                  <TableCell>{task.endDate.toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}