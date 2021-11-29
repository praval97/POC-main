package com.poc.AuthService.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.poc.AuthService.JWTUtility.JWTUtility;
import com.poc.AuthService.advice.ErrorDetails;
import com.poc.AuthService.model.Role;
import com.poc.AuthService.model.User;
import com.poc.AuthService.model.UserValidator;
import com.poc.AuthService.model.UserlogOut;
import com.poc.AuthService.repository.UserRepo;
import com.poc.AuthService.repository.UserSessionRepo;
import com.poc.AuthService.response.JsonResponse;
import com.poc.AuthService.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
    private final UserService userService;
    private final UserSessionRepo userSessionRepo;

    private final UserRepo userRepo;
  
	@PostMapping("/user/save")
	public ResponseEntity<?> createUser(@Valid @RequestBody UserValidator user) throws Exception
	{
	
		Map<String,String> res = userService.saveUser(user);
		userService.addRoleToUser(user.getUserName(), user.getRolesToUser());
		return new ResponseEntity<Object>(res, HttpStatus.CREATED);
	}
	
	@GetMapping("/users/{userName}") 
	public ResponseEntity<?> getUser(@PathVariable String userName) throws Exception
	{
		return ResponseEntity.ok().body(userService.getUser(userName));
	}
	
	@GetMapping("/token/refresh_token")
	public ResponseEntity<?> getRefreshToken(HttpServletRequest request, HttpServletResponse response){
		
		//Get Authorization header
		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		
		Map<String, String> res= new HashMap<>();
		
		// check refresh token present in the incoming request
		if(authorizationHeader!=null && authorizationHeader.startsWith("Bearer ")) {
			
			// get the refresh token only
			String refreshToken  = authorizationHeader.substring(7);
			
			// verify the token
			DecodedJWT decodedJWT = JWTUtility.verifyToken(refreshToken);
			
			String userName= decodedJWT.getSubject();
			if(userSessionRepo.isloggedIn(userName)) {
				System.out.println(userSessionRepo.isloggedIn(userName));
				
				// Get the user details from db by using username which is present in refresh_token
				User user = userRepo.findByUserName(userName);
				
				// convert roles of type "ROLE" to String
				List<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
				
				// create access token and refresh token 
				String newAccessToken = JWTUtility.createAccessToken(userName, roles);
				String newRefreshToken = JWTUtility.createRefreshToken(userName);
				
				// set the response
				res.put("access_token", newAccessToken);
				res.put("refresh_token", newRefreshToken);
				
				return ResponseEntity.ok().body(res);
			}
		}	
		return ResponseEntity.ok().body(new ErrorDetails(new Date(),"Please Login first",HttpStatus.UNAUTHORIZED));
	}
	
	@PostMapping("/logout") 
	public ResponseEntity<?> userLogOut(@RequestBody UserlogOut userlogOut){
		System.out.println("logging out" +userlogOut.getUserName());
		if(userSessionRepo.delete(userlogOut.getUserName()))
		{
			System.out.println("logging out");
			return ResponseEntity.ok().body(JsonResponse.successMessage("User Logged out Successfully"));
		}
		return ResponseEntity.ok().body(new ErrorDetails(new Date(),"Something went wrong",HttpStatus.INTERNAL_SERVER_ERROR));
		}

}
