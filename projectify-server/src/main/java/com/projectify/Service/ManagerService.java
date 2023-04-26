package com.projectify.Service;

import java.util.List;

import com.projectify.Model.Project;
import com.projectify.Model.User;

public interface ManagerService {
	
	public List<User> getAllManagers() throws Exception;
	
	public User getManager(String managerCode) throws Exception;
	
	public void addProject(Project project, String email) throws Exception;
	
	public List<Project> getManagerProjects(String managerCode) throws Exception;
	
	public void updateProject(Project project, String email) throws Exception;
	
	public void deleteProject(int projectId, String email) throws Exception;

}
