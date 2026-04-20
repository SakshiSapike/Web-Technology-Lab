package org.college.taskmanagement.controller;

import org.college.taskmanagement.dto.StatusUpdateRequest;
import org.college.taskmanagement.dto.TaskAssignmentRequest;
import org.college.taskmanagement.model.Task;
import org.college.taskmanagement.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping("/assign")
    public Task assignTask(@RequestBody TaskAssignmentRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus("Pending");
        return service.assignTask(request.getLeaderId(), request.getEmployeeId(), task);
    }

    @GetMapping
    public List<Task> getAll() {
        return service.getAll();
    }

    @GetMapping("/employee/{id}")
    public List<Task> getByEmployee(@PathVariable Long id) {
        return service.getTasksByEmployee(id);
    }

    @GetMapping("/leader/{id}")
    public List<Task> getByLeader(@PathVariable Long id) {
        return service.getTasksByLeader(id);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        return service.updateStatus(id, request.getStatus());
    }
}
