package com.poc.AuthService.model;

import java.util.Collection;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor @Data
public class UserValidator {
	@NotEmpty
	private String firstName;
	@NotEmpty
	private String lastName;
	@NotEmpty
	@Email
	private String emailId;
	private String city;
	private String state;
	private String country;
	@NotEmpty
	@Size(min=7, max=15,message="Username should have atleast 7 characters and maximum 10 characters.") 
	@Pattern(regexp = "^[a-zA-Z]+[!@#$%*]?[0-9]+$", message="Username should starts with characters and end with numbers")
	private String userName;
	@NotEmpty
	@Size(min=8, max=20, message="Password should have min 8 characters and max 20 characters")
	@Pattern(regexp = "^[A-Z]{1,2}[a-z]+[%+_!~-]{1,2}[0-9]+$", message="Invalid Password, check password policy")
	private String password;
	@NotEmpty
	private Collection<RoleToUser> rolesToUser;
}
