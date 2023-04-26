package com.projectify.Service.Impl;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projectify.Constant.ExceptionConstant;
import com.projectify.Model.User;
import com.projectify.Service.CurrentUserService;
import com.projectify.Service.Repository.UserRepositoryService;

@Service
public class CurrentUserServiceImpl implements CurrentUserService {
	
	@Autowired
	private UserRepositoryService userRepositoryService;

	@Override
	public User getCurrentUser(String email) throws Exception {
		// TODO Auto-generated method stub
		try {
			User sessionUser = userRepositoryService.findByUserName(email);
			System.out.println("DB USER -> ID : " + sessionUser.getId());
		
			sessionUser.setPassword(null);
			
			System.out.println("SUCCESS =================== > CRRENT USER -> EMAIL : " + sessionUser.getEmail());
			return sessionUser;
		} 
		catch(UsernameNotFoundException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new UsernameNotFoundException(e.getMessage());
		}
		catch (NoSuchElementException e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new NoSuchElementException("The user does not exist");
		} 
		catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR -> " + e.getMessage());
			e.printStackTrace();
			throw new Exception(ExceptionConstant.DEFAULT);
		}
	}

}
