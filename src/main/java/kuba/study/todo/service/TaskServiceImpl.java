package kuba.study.todo.service;

import kuba.study.todo.entity.Task;
import kuba.study.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {


    @Autowired
    TaskRepository repository;


    @Override
    public List<Date> getDates() {
        return repository.getAllDates();
    }

    @Override
    public List<Task> getTasksFromDay(Date day) {
        System.out.println("day:"+day);
        return repository.getTasksFromDay(day);
    }

    @Override
    public List<Task> getAll() {
       return repository.findAll();
    }

    @Override
    public Task getTask(int id) {
       return repository.getOne(id);
    }

    @Override
    public void saveTask(Task task) {
        repository.save(task);
    }

    @Override
    public void deleteTask(int id) {
        repository.deleteById(id);
    }
}
