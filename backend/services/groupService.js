const { Group } = require("../models/group/group");

const groupService = {
    async getGroups() {
      try{
          const groups = await Group.find({},'_id id').exec();
          
          const groupMap = {};
          groups.forEach((group) => {
            groupMap[group._id] = group.id;
          });
          console.log("GroupMap",groups);
          return groupMap;
    
        }catch(e){
            console.log("Error",e);
            return e;
      }
    },

    async createGroup(group) {
        const newGroup = new Group(group);
         newGroup.save();
        return newGroup;

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
};

module.exports =  groupService 