package kuba.study.todo.service;

import kuba.study.todo.entity.Task;

import java.sql.Date;
import java.util.List;

public interface TaskService {

    List<Date> getDates();
    List<Task> getTasksFromDay(Date day);
    List<Task> getAll();
    Task getTask(int it);
    void saveTask(Task task);
    void deleteTask(int id);

}
