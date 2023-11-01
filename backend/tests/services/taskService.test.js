jest.mock('../../models/tasks/task');
const { Task } = require('../../models/tasks/task');
const taskService = require('../../services/taskService');

describe("taskService", () => {
    describe("getTasks", () => {
      it("should return all tasks", async () => {
        Task.find.mockResolvedValueOnce([{ title: "Task 1" }, { title: "Task 2" }]);
        const tasks = await taskService.getTasks();
        expect(tasks).toEqual([{ title: "Task 1" }, { title: "Task 2" }]);
      });
    });
  
describe("creatTask", () => {
    it("should create and return the new task", async () => {
      const taskData = { title: "New Task", description: "A task description", priority: "High", status: "In Progress" };
      Task.mockImplementation(() => ({
        ...taskData,
        save: jest.fn().mockResolvedValueOnce(taskData),
      }));

      const newTask = await taskService.creatTask(taskData);
      expect(newTask).toHaveProperty('title', 'New Task');
    });
  });
  
    describe("getTaskById", () => {
      it("should return a task if found", async () => {
        const task = { id: "1", title: "Task 1" };
        Task.findById.mockResolvedValueOnce(task);
        const foundTask = await taskService.getTaskById("1");
        expect(foundTask).toEqual(task);
      });
  
      it("should return null if task is not found", async () => {
        Task.findById.mockResolvedValueOnce(null);
        const task = await taskService.getTaskById("1");
        expect(task).toBeUndefined();
      });
    });
  
    describe("updateTask", () => {
        const taskId = "1";
        const validUpdates = { title: "Updated Task", priority: "High" };
        const invalidUpdates = { title: "Updated Task", notAllowedField: "This should not be here" };
    
        it("should update the task if valid updates are provided", async () => {
          Task.findByIdAndUpdate.mockResolvedValueOnce(validUpdates);
          const updatedTask = await taskService.updateTask(taskId, validUpdates);
          expect(updatedTask).toEqual(validUpdates);
        });
    
        it("should return 'Not allowed' if invalid updates are provided", async () => {
          const result = await taskService.updateTask(taskId, invalidUpdates);
          expect(result).toBe("Not allowed");
        });
    
        it("should return false if the task does not exist", async () => {
          Task.findByIdAndUpdate.mockResolvedValueOnce(null);
          const result = await taskService.updateTask(taskId, validUpdates);
          expect(result).toBeFalsy();
        });
      });
      
  
      describe("deleteTask", () => {
        beforeEach(() => {
          jest.clearAllMocks();
        });
    
        it("should return true if the task is successfully deleted", async () => {
          // Arrange
          const taskId = "validTaskId";
          Task.findByIdAndDelete.mockResolvedValueOnce({}); // Mock to resolve with an empty object
          
          const result = await taskService.deleteTask(taskId);
          expect(result).toBeTruthy();
          expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskId);
        });
    
        it("should return false if an error occurs while deleting the task", async () => {
          
          const taskId = "invalidTaskId";
          Task.findByIdAndDelete.mockRejectedValueOnce(new Error("Failed to delete task")); // Mock to reject with an error
    
          const result = await taskService.deleteTask(taskId);
          expect(result).toBeFalsy();
          expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskId);
        });
      });
  });
  