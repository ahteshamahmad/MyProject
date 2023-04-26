package com.projectify.Service.Impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectify.Constant.ExceptionConstant;
import com.projectify.Exception.ResourceNotFoundException;
import com.projectify.Model.Employee;
import com.projectify.Model.Project;
import com.projectify.Model.User;
import com.projectify.Repository.EmployeeRepository;
import com.projectify.Repository.ProjectRepository;
import com.projectify.Repository.UserRepository;
import com.projectify.Service.EmployeeService;
import com.projectify.Service.Repository.UserRepositoryService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private UserRepositoryService userRepositoryService;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ProjectRepository projectRepository;

	@Override
	public List<User> getAllEmployees() throws Exception {
		// TODO Auto-generated method stub
		try {
			List<User> employeeRelatedUsers = new ArrayList<>();
			List<Employee> allEmployees = employeeRepository.findAll();
			allEmployees.forEach(employee -> {
				employeeRelatedUsers.add(employee.getUser());
			});
			if (allEmployees.isEmpty()) {
				throw new ResourceNotFoundException("No Employee Available");
			}
			return employeeRelatedUsers;
		} catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}
	
	@Override
	public User getEmployee(String employeeCode) throws Exception {
		// TODO Auto-generated method stub
		try {
			Employee employee = employeeRepository.findByEmployeeCode(employeeCode);
			return employee.getUser();
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public void applyForProject(int pId, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = userRepositoryService.findByUserName(email);
			Project project = projectRepository.findProjectById(pId);
			
			project.getEmployee().add(sessionUser.getEmployee());
			project.setApplied(project.getApplied() + 1);
			sessionUser.getEmployee().setActiveProjects(sessionUser.getEmployee().getActiveProjects() + 1);
			sessionUser.getEmployee().getProjects().add(project);
			
			userRepository.save(sessionUser);
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
