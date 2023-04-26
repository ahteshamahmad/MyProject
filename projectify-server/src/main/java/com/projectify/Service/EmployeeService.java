package com.projectify.Service;

import java.util.List;

import com.projectify.Model.User;

public interface EmployeeService {
	
	public List<User> getAllEmployees() throws Exception;
	
	public User getEmployee(String employeeCode) throws Exception;
	
	public void applyForProject(int pId, String email) throws Exception;

}
