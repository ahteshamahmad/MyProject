package com.projectify.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectify.Constant.ExceptionConstant;
import com.projectify.Exception.ResourceNotFoundException;
import com.projectify.Model.Project;
import com.projectify.Repository.ProjectRepository;
import com.projectify.Service.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;

	@Override
	public List<Project> allProjects() throws Exception {
		// TODO Auto-generated method stub
		try {
			List<Project> allProjects = projectRepository.findAll();
			if (allProjects.isEmpty()) {
				throw new ResourceNotFoundException("No Projects Available");
			}
			return allProjects;
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
	public Project project(int pId) throws Exception {
		// TODO Auto-generated method stub
		try {			
			Project project = projectRepository.findProjectById(pId);
			if(project == null) {
				throw new ResourceNotFoundException("Projec not available");
			}
			System.out.println(project.getEmployee());
			return project;
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

}
