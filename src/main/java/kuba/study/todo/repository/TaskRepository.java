package kuba.study.todo.repository;

import kuba.study.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;



public interface TaskRepository extends JpaRepository<Task,Integer> {
}
