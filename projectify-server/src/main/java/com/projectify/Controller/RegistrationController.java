package com.projectify.Controller;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projectify.Constant.MessageConstant;
import com.projectify.Constant.RoleConstant;
import com.projectify.Model.Role;
import com.projectify.Model.User;
import com.projectify.Model.UserRole;
import com.projectify.Service.RegistrationService;

@RestController
@CrossOrigin("*")
public class RegistrationController {
	
	@Autowired
	private RegistrationService registrationService;
	
	@PostMapping("/register-admin")
	public ResponseEntity<String> registerAdmin(@Valid @RequestBody User user) throws Exception {
		System.out.println("======================================================   ADMIN SIGNUP   =======================================================");
		
		List<UserRole> roles = new ArrayList<>();
		
			Role role = new Role();
			role.setRoleId(RoleConstant.ADMIN_ROLE_ID);
			role.setRoleName(RoleConstant.ADMIN_ROLE_NAME);
			
			UserRole userRole = new UserRole();
			userRole.setUser(user);
			userRole.setRole(role);
		
		roles.add(userRole);
		
		System.out.println(user);
		
		registrationService.registerAdmin(user, roles);
		
		return new ResponseEntity<String>(MessageConstant.REGISTER_ADMIN_SUCCESS, HttpStatus.CREATED);
	}
}
