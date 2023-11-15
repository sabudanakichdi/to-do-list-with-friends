import React, { useState } from "react";
import Navbar from "./navbar";
import EnhancedTable from "./table";
import { useParams } from "react-router-dom";
import axios from "axios";

const GroupManagement = () => {
    const { id: groupId } = useParams();
    const [groupInfo, setGroupInfo] = useState({});
    React.useEffect(() => {
        const dummyData = {
          "id": "asdasdas213",
          "name": "household",
          "totalTask": 10,
          "totalInProgress": 10,
          "totalCompleted": 10,
          "totalToDo": 10,
          "tasks": [
            {
              "id": "asd11",
              "title": "Pick up Flowers",
              "group": "household",
              "tags": "gift",
              "description": "Pick up flower for mom from flower shop at Baker street",
              "priority": "LOW",
              "status": "TODO",
              "assignedTo": "Jane",
              "deadLine": "08/26/23",
              "startDate": "08/26/23",
              "createdBy": "John",
              "createdOn": "08/24/23"
            },
            {
              "id": "asd112",
              "title": "Pick up Flowers",
              "group": "household",
              "tags": "gift",
              "description": "Pick up flower for mom from flower shop at Baker street",
              "priority": "LOW",
              "status": "TODO",
              "assignedTo": "Jane",
              "deadLine": "08/26/23",
              "startDate": "08/26/23",
              "createdBy": "John",
              "createdOn": "08/24/23"
            },
            {
              "id": "asd1123",
              "title": "Pick up Flowers",
              "group": "household",
              "tags": "gift",
              "description": "Pick up flower for mom from flower shop at Baker street",
              "priority": "LOW",
              "status": "TODO",
              "assignedTo": "Jane",
              "deadLine": "08/26/23",
              "startDate": "08/26/23",
              "createdBy": "John",
              "createdOn": "08/24/23"
            },
            {
              "id": "asd11233",
              "title": "Pick up Flowers",
              "group": "household",
              "tags": "gift",
              "description": "Pick up flower for mom from flower shop at Baker street",
              "priority": "LOW",
              "status": "TODO",
              "assignedTo": "Jane",
              "deadLine": "08/26/23",
              "startDate": "08/26/23",
              "createdBy": "John",
              "createdOn": "08/24/23"
            }
          ],
          "members": [
            {
              "memberName": "mem123id",
              "userCount": {
                "toDo": 1,
                "inProgress": 1,
                "completed": 8
              }
            },
            {
              "memberName": "mem123id",
              "userCount": {
                "toDo": 1,
                "inProgress": 1,
                "completed": 8
              }
            },
            {
              "memberName": "mem123id",
              "userCount": {
                "toDo": 1,
                "inProgress": 1,
                "completed": 8
              }
            },
            {
              "memberName": "mem123id",
              "userCount": {
                "toDo": 1,
                "inProgress": 1,
                "completed": 8
              }
            },
            {
              "memberName": "mem123id",
              "userCount": {
                "toDo": 1,
                "inProgress": 1,
                "completed": 8
              }
            },
            {
              "memberName": "mem123id",
              "userCount": {
                "toDo": 1,
                "inProgress": 1,
                "completed": 8
              }
            }
          ]
        }
        axios.get(`/api/group/${groupId}`).then((response) => {
            // TODO replace with actualy response
            setGroupInfo(dummyData);
        }).catch(err => {
            // TODO remove below and add error handling
            setGroupInfo(dummyData);
        });
      }, []);

    return <><Navbar groupInfo={groupInfo} /><EnhancedTable groupInfo={groupInfo} /></>
};

export default GroupManagement;