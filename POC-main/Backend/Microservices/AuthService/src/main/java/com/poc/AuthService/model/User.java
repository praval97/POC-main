package com.poc.AuthService.model;


import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@NoArgsConstructor @AllArgsConstructor @Data


public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO,generator = "native")
	private Long id;
	private String firstName;
	private String lastName;
	private String emailId;
	private String city;
	private String state;
	private String country;
	private Date userCreatedTime;
	private String userName;
	private String password;
	private Date loginTime;
	private Date lastLogOffTime;
	@ManyToMany(fetch = FetchType.EAGER,cascade= {CascadeType.PERSIST})
	private Collection<Role> roles = new ArrayList<>();
	@Transient
	private Collection<RoleToUser> rolesToUser;


	}
