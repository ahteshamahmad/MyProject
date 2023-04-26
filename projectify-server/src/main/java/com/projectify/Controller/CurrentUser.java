package com.projectify.Controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectify.Model.User;
import com.projectify.Service.CurrentUserService;

@RestController
@CrossOrigin("*")
public class CurrentUser {
	
	@Autowired
	private CurrentUserService currentUserService;
	
	@GetMapping("/current-user")
	public ResponseEntity<User> getCurrentUser(Principal principal) throws Exception {
		System.out.println("======================================================   CURRENT USER   =======================================================");
		
		String email = principal.getName();
		User sessionUser = currentUserService.getCurrentUser(email);
		
		return new ResponseEntity<User>(sessionUser, HttpStatus.OK);
	}
}
