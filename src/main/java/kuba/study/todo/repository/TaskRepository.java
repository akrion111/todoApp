package kuba.study.todo.repository;

import kuba.study.todo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;


public interface TaskRepository extends JpaRepository<Task,Integer> {

    @Query(value="select distinct(task_date) from tasks",nativeQuery = true)
    List<Date> getAllDates();

    @Query("select t from Task t  where t.date=:day")
    List<Task> getTasksFromDay(@Param("day") Date day);

}
