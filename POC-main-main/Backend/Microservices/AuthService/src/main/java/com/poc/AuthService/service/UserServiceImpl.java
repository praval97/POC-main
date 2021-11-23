package com.poc.AuthService.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.poc.AuthService.advice.ErrorMessage;
import com.poc.AuthService.exception.UserAlreadyExistException;
import com.poc.AuthService.exception.UserOverFlowException;
import com.poc.AuthService.model.Role;
import com.poc.AuthService.model.RoleToUser;
import com.poc.AuthService.model.User;
import com.poc.AuthService.model.UserRowCount;
import com.poc.AuthService.model.UserValidator;
import com.poc.AuthService.repository.RoleRepo;
import com.poc.AuthService.repository.UserRepo;
import com.poc.AuthService.repository.UserRowCountRepo;
import com.poc.AuthService.response.JsonResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service @RequiredArgsConstructor @Slf4j @Transactional
public class UserServiceImpl implements UserService,UserDetailsService{
	
	final private UserRepo userRepo;
	final private RoleRepo roleRepo;
	final private UserRowCountRepo userRowCountRepo;
	final private PasswordEncoder passwordEncoder;
	
	UserRowCount userRowCount = new UserRowCount();
	
	private int USER_COUNT= 500;

	
	@Override
	public Map<String,String> saveUser(UserValidator userInfo) throws Exception{
		int rowCount=userRowCountRepo.getById(1).getUserRowCount();
	
		if(rowCount<USER_COUNT)
		{
			if(userRepo.findByUserName(userInfo.getUserName())==null)
			{
				if(userRepo.findByEmailId(userInfo.getEmailId())==null)
				{
					User user =new User();
					user.setFirstName(userInfo.getFirstName());
					user.setLastName(userInfo.getLastName());
					user.setUserName(userInfo.getUserName());
					user.setEmailId(userInfo.getEmailId());
					user.setPassword(passwordEncoder.encode(userInfo.getPassword()));
					user.setCity(userInfo.getCity());
					user.setState(userInfo.getState());
					user.setCountry(userInfo.getCountry());
					user.setUserCreatedTime(new Date());
					
					userRepo.save(user);
					userRowCount.setId(1);
					userRowCount.setUserRowCount(rowCount+1);
					userRowCountRepo.save(userRowCount);
				}
				else 
					throw new UserAlreadyExistException(ErrorMessage.EMAILID_EXIST);
			}
			else 
				throw new UserAlreadyExistException(ErrorMessage.USERNAME_EXIST);
		}
		else 
			throw new UserOverFlowException(ErrorMessage.USER_OVERFLOW);
		return JsonResponse.successMessage("User created successfully");
	}
	
	@Override
	public void addRoleToUser(String userName, Collection<RoleToUser> userRoles) throws Exception{
		
		
		User user=userRepo.findByUserName(userName);
		Set<RoleToUser> set = new HashSet<>(userRoles);
		userRoles.clear();
		userRoles.addAll(set);
		
		userRoles.forEach(role->{
			Role roleObject= roleRepo.findByName(role.getRoleName());
				user.getRoles().add(roleObject);
		});
	}
	
	@Override
	public Map<String,Object> getUser(String userName) throws Exception{
		
		return JsonResponse.getResponseDetails(userRepo.findByUserName(userName));
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUserName(username);
		if(user == null) {
			log.error("User not found in the database");
			throw new UsernameNotFoundException(username);
		} else {
			log.info("User found in the database");
		} 
		
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role ->{
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		});
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), authorities);
	}

	
	
}

