package com.projectify.Service;

import com.projectify.Model.User;

public interface CurrentUserService {
	
	// GET CURRNT LOGGED IN USER
	public User getCurrentUser(String email) throws Exception;
}
