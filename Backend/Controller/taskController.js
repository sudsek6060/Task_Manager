const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError');
const Task = require("../Model/taskModel")

exports.home = (req, res) => {
    res.send("Hello Alpha")
};

exports.createTask = catchAsync(async(req, res, next) => {
    const {name} = req.body;        
        if (!name ) {
            return next(new AppError("Name Required", 400))
        }
        //Inserting Task to Database
        const task = await Task.create({name})
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        })
})

exports.getTasks = catchAsync(async (req, res, next) => {
    
        const tasks = await Task.find();
        res.status(201).json({
            success: true,
            tasks
        })
    
})

exports.editTask = catchAsync(async(req, res, next) => {
   
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            success: true,
            message: "Task updated successfully",
            data: task
        })
    
})

exports.deleteTask = catchAsync(async(req, res) => {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        res.status(201).json({
            success: true,
            message: "Task deleted successfully"
        })
    
})