package com.projectify.Service;

import java.util.List;

import com.projectify.Model.Employee;
import com.projectify.Model.Manager;
import com.projectify.Model.Project;

public interface HomeService {
	
	public List<Project> allHomeProjects() throws Exception;
	
	public List<Employee> allHomeEmployees() throws Exception;
	
	public List<Manager> allHomeManagers() throws Exception;
}
