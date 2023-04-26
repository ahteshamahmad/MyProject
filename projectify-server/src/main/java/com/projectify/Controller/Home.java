package com.projectify.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectify.Model.Employee;
import com.projectify.Model.Manager;
import com.projectify.Model.Project;
import com.projectify.Service.HomeService;

@RestController
@CrossOrigin("*")
public class Home {
	
	@Autowired
	private HomeService homeService;
	
	@GetMapping("/home")
	public ResponseEntity<Map<String, Object>> home() throws Exception {
		List<Project> allProjects = homeService.allHomeProjects();
		List<Employee> allEmployees = homeService.allHomeEmployees();
		List<Manager> allManagers = homeService.allHomeManagers();
		
		Map<String, Object> home = new HashMap<>();
		home.put("projects", allProjects.size());
		home.put("employees", allEmployees.size());
		home.put("managers", allManagers.size());
		
		return new ResponseEntity<Map<String,Object>>(home, HttpStatus.OK);
	}
}
