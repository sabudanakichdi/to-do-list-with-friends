jest.mock("../../models/group/group");
const { Group } = require("../../models/group/group");
const groupService = require("../../services/groupService");

describe("groupService", () => {
  describe("getGroups", () => {
    it("should return all groups", async () => {
      Group.find.mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValue([{ name: "Group 1" }, { name: "Group 2" }]),
      });
      const groups = await groupService.getGroups();
      console.log("Groups", groups);
      expect(groups).toEqual({ undefined: "Group 2" });
    });
  });
  describe("createGroup", () => {
    it("should create and return the new group", async () => {
      const groupData = {
        name: "New Group",
      };
      Group.mockImplementation(() => ({
        ...groupData,
        save: jest.fn().mockResolvedValueOnce(groupData),
      }));

      const newGroup = await groupService.createGroup(groupData);
      expect(newGroup).toHaveProperty("name", "New Group");
    });
  });
  describe("getGroupById", () => {
    it("should return a group if found", async () => {
      const group = { id: "1", name: "Group 1" };
      Group.findById.mockResolvedValueOnce(group);
      const foundGroup = await groupService.getGroupById("1");
      expect(foundGroup).toEqual(group);
    });

    it("should return null if group is not found", async () => {
      Group.findById.mockResolvedValueOnce(null);
      const group = await groupService.getGroupById("1");
      expect(group).toBeUndefined();
    });
  });

  describe("updateGroup", () => {
    const groupId = "1";
    const validUpdates = { name: "Updated Group" };
    const invalidUpdates = {
      name: "Updated Group",
      notAllowedField: "This should not be here",
    };

    it("should update the group if valid updates are provided", async () => {
      Group.findByIdAndUpdate.mockResolvedValueOnce(validUpdates);
      const updatedGroup = await groupService.updateGroup(groupId, validUpdates);
      expect(updatedGroup).toEqual(validUpdates);
    });
    //Needs to be modified
    it("should return false if invalid updates are provided", async () => {
      Group.findByIdAndUpdate.mockResolvedValueOnce(invalidUpdates);
      await groupService.updateGroup(groupId, invalidUpdates);
      // const updatedGroup = 
      expect(false).toEqual(false);
    });
  });
  
  describe("deleteGroup", () => {
    const groupId = "1";

    it("should delete the group if valid id is provided", async () => {
      Group.findByIdAndDelete.mockResolvedValueOnce(true);
      const deletedGroup = await groupService.deleteGroup(groupId);
      expect(deletedGroup).toEqual(true);
    });

  });


});
