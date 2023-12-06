const { Group } = require("../models/group/group");

const groupService = {
    async getGroups() {
      try{
          const groups = await Group.find({},'_id name').exec();
          
          const groupMap = {};
          groups.forEach((group) => {
            groupMap[group._id] = group.name;
          });
          return groupMap;
    
        }catch(e){
            console.log("Error",e);
            return e;
      }
    },

    async createGroup(group) {
        const newGroup = new Group(group);
        await newGroup.save();
        return {
          _id: newGroup._id,
          name: newGroup.name,
          users: newGroup.users,
      };
    },

    async getGroupById(id) {
        const group = await Group.findById(id);
        if (group) {
        return group;
        }
    },

    async updateGroup(id, groupName) {
        const updatedGroup = await Group.findByIdAndUpdate(id, {"name": groupName}, {
          new: true,
          runValidators: true,
        });
        if (!updatedGroup) {
          return false;
        }else{
            return updatedGroup;
        }
      },
    
      async deleteGroup(id) {
        try{
            await Group.findByIdAndDelete(id);
            return true;
        }catch(e){return false}
      },

      async getGroupsByUser(userId){
        const userGroups = await Group.find({ users: userId }); 

        const groupsMap=  userGroups.map((group) => group.toObject());
        const groupNames = groupsMap.map((group) => group.name);

        return groupNames;
      }
};

module.exports =  groupService 