const {body} = require("express-validator")

const validateTask = [
    body('title').notEmpty().withMessage("Title is requried"), 
    body('description').notEmpty().withMessage("Description is requried"),
    body('priority').notEmpty().withMessage("Priority is requried"),
    body('status').notEmpty().withMessage("Status is requried"),
  ];
  
module.exports={validateTask};