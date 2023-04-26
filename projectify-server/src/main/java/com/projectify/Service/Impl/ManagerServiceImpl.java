package com.projectify.Service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projectify.Constant.ExceptionConstant;
import com.projectify.Exception.ResourceNotFoundException;
import com.projectify.Model.Manager;
import com.projectify.Model.Project;
import com.projectify.Model.User;
import com.projectify.Repository.ManagerRepository;
import com.projectify.Repository.ProjectRepository;
import com.projectify.Repository.UserRepository;
import com.projectify.Service.ManagerService;
import com.projectify.Service.Repository.UserRepositoryService;

@Service
public class ManagerServiceImpl implements ManagerService {

	@Autowired
	private UserRepositoryService userRepositoryService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ManagerRepository managerRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	

	@Override
	public List<User> getAllManagers() throws Exception {
		// TODO Auto-generated method stub
		try {
			List<User> managerRelatedUsers = new ArrayList<>();
			List<Manager> allManagers = managerRepository.findAll();
			allManagers.forEach(manager -> {
				managerRelatedUsers.add(manager.getUser());
			});
			if (allManagers.isEmpty()) {
				throw new ResourceNotFoundException("No Manager Available");
			}
			return managerRelatedUsers;
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
	public User getManager(String managerCode) throws Exception {
		// TODO Auto-generated method stub
		try {
			Manager manager = managerRepository.findByManagerCode(managerCode);
			return manager.getUser();
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public void addProject(Project project, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = userRepositoryService.findByUserName(email);

			project.setManager(sessionUser.getManager());
			System.out.println(sessionUser.getManager().getActiveProjects());
			sessionUser.getManager().setActiveProjects(sessionUser.getManager().getActiveProjects() + 1);
			sessionUser.getManager().getProjects().add(project);

			userRepository.save(sessionUser);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public List<Project> getManagerProjects(String managerCode) throws Exception {
		// TODO Auto-generated method stub
		Manager manager = managerRepository.findByManagerCode(managerCode);
		return manager.getProjects();
	}
	
	@Override
	public void updateProject(Project project, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = userRepositoryService.findByUserName(email);
			
			project.setManager(sessionUser.getManager());
			projectRepository.save(project);
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public void deleteProject(int projectId, String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = userRepositoryService.findByUserName(email);
			Project project = projectRepository.findProjectById(projectId);
			
			if(sessionUser.getId() == project.getManager().getUser().getId()) {
				projectRepository.delete(project);
				sessionUser.getManager().setActiveProjects(sessionUser.getManager().getActiveProjects() - 1);
				userRepository.save(sessionUser);
			}
			else {
				throw new ResourceNotFoundException("The Project does not belong to the Manager");
			}
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (ResourceNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new ResourceNotFoundException(e.getMessage());
		}
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception("Problem while deleting this Project");
		}
		
	}

}
