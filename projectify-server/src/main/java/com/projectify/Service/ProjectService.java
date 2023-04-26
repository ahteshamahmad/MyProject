package com.projectify.Service;

import java.util.List;

import com.projectify.Model.Project;

public interface ProjectService {

	public List<Project> allProjects() throws Exception;
	
	public Project project(int pId) throws Exception;
}
