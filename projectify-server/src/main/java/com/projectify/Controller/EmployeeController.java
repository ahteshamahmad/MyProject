package com.projectify.Controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectify.Constant.MessageConstant;
import com.projectify.Model.User;
import com.projectify.Service.EmployeeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping("/all-employees")
	public ResponseEntity<Map<String, Object>> getAllEmployees() throws Exception {
		List<User> allUserRelatedEmployees = employeeService.getAllEmployees();
		
		Map<String, Object> getAllEmployess = new HashMap<>();
		getAllEmployess.put("allUserRelatedEmployees", allUserRelatedEmployees);
		getAllEmployess.put("message", MessageConstant.GET_ALL_EMPLOYEES_SUCCESS);
		
		return new ResponseEntity<Map<String, Object>>(getAllEmployess, HttpStatus.OK);
	}
	
	@GetMapping("/{employeeCode}")
	public ResponseEntity<User> getEmployee(@PathVariable("employeeCode") String employeeCode) throws Exception {
		User employee = employeeService.getEmployee(employeeCode);
		return new ResponseEntity<User>(employee, HttpStatus.OK);
	}
	
	@GetMapping("/apply/{projectId}")
	public ResponseEntity<String> applyForProject(@PathVariable("projectId") int pId, Principal principal) throws Exception {
		String email = principal.getName();
		
		employeeService.applyForProject(pId, email);
		return new ResponseEntity<String>(MessageConstant.PROJECT_APPLIED_SUCCESS, HttpStatus.OK);
	}
}
