package com.projectify.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectify.Constant.ExceptionConstant;
import com.projectify.Model.Employee;
import com.projectify.Model.Manager;
import com.projectify.Model.Project;
import com.projectify.Repository.EmployeeRepository;
import com.projectify.Repository.ManagerRepository;
import com.projectify.Repository.ProjectRepository;
import com.projectify.Service.HomeService;

@Service
public class HomeServiceImpl implements HomeService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ManagerRepository managerRepository;

	@Override
	public List<Project> allHomeProjects() throws Exception {
		// TODO Auto-generated method stub
		try {
			List<Project> allProjects = projectRepository.findAll();
			return allProjects;
		}  catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public List<Employee> allHomeEmployees() throws Exception {
		// TODO Auto-generated method stub
		try {
			List<Employee> allEmployees = employeeRepository.findAll();
			return allEmployees;
		}  catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public List<Manager> allHomeManagers() throws Exception {
		// TODO Auto-generated method stub
		try {
			List<Manager> allManagers = managerRepository.findAll();
			return allManagers;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
