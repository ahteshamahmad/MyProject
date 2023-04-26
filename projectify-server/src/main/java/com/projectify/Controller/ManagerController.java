package com.projectify.Controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectify.Constant.MessageConstant;
import com.projectify.Model.Project;
import com.projectify.Model.User;
import com.projectify.Service.ManagerService;

@RestController
@CrossOrigin("*")
@RequestMapping("/manager")
public class ManagerController {
	
	@Autowired
	private ManagerService managerService;
	
	@GetMapping("/all-managers")
	public ResponseEntity<Map<String, Object>> getAllManagers() throws Exception {
		List<User> allUserRelatedManagers = managerService.getAllManagers();
		
		Map<String, Object> getAllEmployess = new HashMap<>();
		getAllEmployess.put("allUserRelatedManagers", allUserRelatedManagers);
		getAllEmployess.put("message", MessageConstant.GET_ALL_MANAGERS_SUCCESS);
		
		return new ResponseEntity<Map<String, Object>>(getAllEmployess, HttpStatus.OK);
	}
	
	@GetMapping("/{managerCode}")
	public ResponseEntity<User> getManager(@PathVariable("managerCode") String managerCode) throws Exception {
		User manager = managerService.getManager(managerCode);
		return new ResponseEntity<User>(manager, HttpStatus.OK);
	}
	
	@PostMapping("/add-project")
	public ResponseEntity<String> addProjects(@Valid @RequestBody Project project, Principal principal) throws Exception {
		System.out.println("======================================================   ADD PROJECT   =======================================================");
		
		String email = principal.getName();
		managerService.addProject(project, email);
		
		return new ResponseEntity<String>(MessageConstant.CREATE_PROJECT_SUCCESS, HttpStatus.CREATED);
	}
	
	@GetMapping("/manager-projects/{managerCode}")
	public ResponseEntity<Map<String, Object>> getManagerProjects(@PathVariable("managerCode") String managerCode) throws Exception {
		System.out.println("======================================================   GET PROJECT FOR MANAGER   =======================================================");
		
		List<Project> managerProjects = managerService.getManagerProjects(managerCode);
		
		Map<String, Object> getManagerProjetcs = new HashMap<>();
		getManagerProjetcs.put("managerProjects", managerProjects);
		getManagerProjetcs.put("message", MessageConstant.GET_MANAGER_PROJECTS_SUCCESS);
		
		return new ResponseEntity<Map<String, Object>>(getManagerProjetcs, HttpStatus.OK);
	}
	
	@PostMapping("/update-project")
	public ResponseEntity<String> updateProject(@Valid @RequestBody Project project, Principal principal) throws Exception {
		System.out.println("======================================================   UPDATE PROJECT FOR MANAGER   =======================================================");
		
		String email = principal.getName();
		managerService.updateProject(project, email);
		return new ResponseEntity<String>(MessageConstant.UPDATE_PROJECT_SUCCESS, HttpStatus.OK);
	}
	
	@GetMapping("/delete-project/{projectId}")
	public ResponseEntity<String> deleteProject(@PathVariable("projectId") int projectId, Principal principal) throws Exception {
		System.out.println("======================================================   DELETE PROJECT FOR MANAGER   =======================================================");
		
		String email = principal.getName();
		managerService.deleteProject(projectId, email);
		return new ResponseEntity<String>(MessageConstant.DELETE_PROJECT_SUCCESS, HttpStatus.OK);
	}
}
