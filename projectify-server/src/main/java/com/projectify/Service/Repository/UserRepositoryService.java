package com.projectify.Service.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projectify.Constant.ExceptionConstant;
import com.projectify.Model.User;
import com.projectify.Repository.UserRepository;

@Service
public class UserRepositoryService {
	
	@Autowired
	private UserRepository userRepository;

	public User findByUserName(String email) {
		User user = this.userRepository.findByUserName(email);

		if (user == null) {
			throw new UsernameNotFoundException(ExceptionConstant.USERNAME_NOT_FOUND);
		}

		return user;
	}
}
