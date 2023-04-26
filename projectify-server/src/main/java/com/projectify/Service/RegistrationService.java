package com.projectify.Service;

import java.util.List;
import com.projectify.Model.User;
import com.projectify.Model.UserRole;

public interface RegistrationService {
	
	// ADMIN REGISTRATION
	public void registerAdmin(User user, List<UserRole> userRoles) throws Exception;
	
	// MANAGER REGISTRATION
	public void registerManager(User user, List<UserRole> userRoles) throws Exception;
	
	// EMPLOYEE REGISTRATION
	public void registerEmployee(User user, List<UserRole> userRoles) throws Exception;
}
