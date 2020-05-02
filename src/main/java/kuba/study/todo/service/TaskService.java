package kuba.study.todo.service;

import kuba.study.todo.entity.Task;

import java.util.List;

public interface TaskService {

    List<Task> getAll();
    Task getTask(int it);
    void saveTask(Task task);
    void deleteTask(int id);

}
