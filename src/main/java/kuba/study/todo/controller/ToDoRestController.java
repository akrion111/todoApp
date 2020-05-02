package kuba.study.todo.controller;


import kuba.study.todo.entity.Task;
import kuba.study.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ToDoRestController {

    @Autowired
    TaskService taskService;

    ToDoRestController()
    {}

    @GetMapping("/tasks")
    List<Task> getAllTasks()
    {
       return taskService.getAll();
    }

    @GetMapping("/tasks/{id}")
    Task getTask(@PathVariable int id)
    {
        return taskService.getTask(id);
    }

    @PostMapping("/tasks")
    void saveTask(@RequestBody  Task task)
    {
        task.setId(0);
        taskService.saveTask(task);
    }

    @PutMapping("/tasks")
    void updateTask(@RequestBody  Task task)
    {
        taskService.saveTask(task);
    }

    @DeleteMapping("/tasks/{id}")
    void deleteTask(int id)
    {
        taskService.deleteTask(id);
    }



}
