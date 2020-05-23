package kuba.study.todo.controller;


import kuba.study.todo.entity.Task;
import kuba.study.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ToDoRestController {

    @Autowired
    TaskService taskService;

    ToDoRestController()
    {}

    @GetMapping("/dates")
    List<Date> getDates()
    {
        return taskService.getDates();
    }


    @GetMapping("/tasks")
    List<Task> getTasks(@RequestParam(value="taskDate",required = false) Date day)
    {
        if(day==null)
       return taskService.getAll();
        else
        {
            System.out.println("day:"+day);
            return taskService.getTasksFromDay(day);
        }
    }

    @GetMapping("/tasks/{id}")
    Task getTask(@PathVariable int id)
    {
        return taskService.getTask(id);
    }

    @PostMapping("/tasks")
    String saveTask(@RequestBody  Task task)
    {
        task.setId(0);
        taskService.saveTask(task);
        return "{\"response\":\"ok\"}";
    }

    @PutMapping("/tasks")
    String updateTask(@RequestBody  Task task)
    {
        System.out.println("Task:");
        System.out.println("id:"+task.getId());
        System.out.println("description:"+task.getDescription());
        System.out.println("date:"+task.getDate());
        System.out.println("done:"+task.isDone());
        taskService.saveTask(task);
        return "{\"response\":\"ok\"}";
    }

    @DeleteMapping("/tasks/{id}")
    String deleteTask(@PathVariable int id)
    {
        taskService.deleteTask(id);
        return "{\"response\":\"ok\"}";
    }



}
