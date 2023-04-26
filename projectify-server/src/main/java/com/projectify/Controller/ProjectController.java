package com.projectify.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.projectify.Model.Employee;
import com.projectify.Model.Project;
import com.projectify.Service.ProjectService;

@RestController
@CrossOrigin("*")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@GetMapping("/all-projects")
	public ResponseEntity<List<Project>> getAllProjects() throws Exception {
		List<Project> allProjects = projectService.allProjects();
		
		return new ResponseEntity<List<Project>>(allProjects, HttpStatus.OK);
	}
	
	@GetMapping("/project/{pId}")
	public ResponseEntity<Map<String, Object>> getProject(@PathVariable int pId) throws Exception {
		Project project = projectService.project(pId);
		List<Employee> employee = project.getEmployee();
		
		Map<String, Object> projectDetails = new HashMap<>();
		projectDetails.put("project", project);
		projectDetails.put("allAppliedEmployee", employee);
		
		return new ResponseEntity<Map<String, Object>>(projectDetails, HttpStatus.OK);
	}
}
