const { Group } = require("../models/group/group");

const groupService = {
    async getGroup() {
        return Group.find({}, { __v: 0 });
    },

    async createGroup(task) {
        const newGroup = new Group(task);
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

module.exports = { groupService }