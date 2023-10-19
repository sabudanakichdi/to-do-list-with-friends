const TaskResponse = {
    sendSuccessWithoutData:(res,message)=>{

        const responseMessage = {
            code: message.code,
            success: true,
            message: message.message,
        };
        return res.status(message.code).json(responseMessage);
    },
    sendSuccess: (res, message, data = null) => {
        const responseMessage = {
            id: message.id,
            title: message.title,
            group: message.group,
            tags: message.tags,
            description: message.description,
            priority: message.priority,
            status: message.status,
            assignedTo: message.assignedTo,
            deadLine: message.deadLine,
            startDate: message.startDate,
            createdBy: message.createdBy,
            createdOn: message.createdOn,
        };
        if (data) { responseMessage.data = data; }
        return res.status(message.code).json(responseMessage);
    },
    sendError: (res, error) => {
        const responseMessage = {
            code: error.code ? error.code : 500,
            success: false,
            message: error.message,
        };
        return res.status(error.code ? error.code : 500).json(responseMessage);
    },
};

module.exports = TaskResponse;