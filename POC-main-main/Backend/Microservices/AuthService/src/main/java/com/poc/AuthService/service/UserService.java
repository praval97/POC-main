package com.poc.AuthService.service;

import java.util.Collection;
import java.util.Map;

import com.poc.AuthService.model.RoleToUser;
import com.poc.AuthService.model.UserValidator;

public interface UserService {
	
	Map<String,String> saveUser(UserValidator user) throws Exception;
	void addRoleToUser(String userName, Collection<RoleToUser> userRoles) throws Exception;
	Map<String,Object> getUser(String userName) throws Exception;
	
	

}
