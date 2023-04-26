package com.projectify.Service.Impl;

import java.util.List;
import javax.persistence.EntityExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.projectify.Constant.AppConstant;
import com.projectify.Constant.ExceptionConstant;
import com.projectify.Model.Admin;
import com.projectify.Model.Employee;
import com.projectify.Model.Manager;
import com.projectify.Model.User;
import com.projectify.Model.UserRole;
import com.projectify.Repository.RoleRepository;
import com.projectify.Repository.UserRepository;
import com.projectify.Service.RegistrationService;

@Service
public class RegistrationServiceImpl implements RegistrationService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public void registerAdmin(User user, List<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		try {
			User dbUser = userRepository.findByUserName(user.getEmail());
			if (dbUser != null) {
				throw new EntityExistsException("Admin already exists with this email address");
			} 
			else {
				for (UserRole userRole : userRoles) {
					roleRepository.save(userRole.getRole());
				}
				
				user.getUserRoles().addAll(userRoles);
				user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
				Admin admin = new Admin();
					admin.setImage(AppConstant.DEFAULT_IMAGE);
					admin.setUser(user);
				user.setAdmin(admin);

				this.userRepository.save(user);
				System.out.println("SUCCESS =================== > REGISTERED ADMIN -> EMAIL : " + user.getEmail());
			}
		} 
		catch (EntityExistsException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new EntityExistsException(e.getMessage());
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public void registerManager(User user, List<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		try {
			User dbUser = userRepository.findByUserName(user.getEmail());

			if (dbUser != null) {
				throw new EntityExistsException("Manager already exists with this email address");
			} 
			else {

				for (UserRole userRole : userRoles) {
					roleRepository.save(userRole.getRole());
				}
				
				user.getUserRoles().addAll(userRoles);
				user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
				Manager manager = new Manager();
					manager.setImage(AppConstant.DEFAULT_IMAGE);
					manager.setUser(user);
				user.setManager(manager);

				this.userRepository.save(user);
				System.out.println("SUCCESS =================== > REGISTERED MANAGER -> EMAIL : " + user.getEmail());
			}
		} 
		catch (EntityExistsException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new EntityExistsException(e.getMessage());
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

	@Override
	public void registerEmployee(User user, List<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		try {
			User dbUser = userRepository.findByUserName(user.getEmail());

			if (dbUser != null) {
				throw new EntityExistsException("Employee already exists with this email address");
			} 
			else {

				for (UserRole userRole : userRoles) {
					roleRepository.save(userRole.getRole());
				}
				
				user.getUserRoles().addAll(userRoles);
				user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
				Employee employee = new Employee();
					employee.setImage(AppConstant.DEFAULT_IMAGE);
					employee.setUser(user);
				user.setEmployee(employee);

				this.userRepository.save(user);
				System.out.println("SUCCESS =================== > REGISTERED EMPLOYEE -> EMAIL : " + user.getEmail());
			}
		} 
		catch (EntityExistsException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new EntityExistsException(e.getMessage());
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
