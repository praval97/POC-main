package com.poc.AuthService.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @NoArgsConstructor @AllArgsConstructor @Data
public class UserRowCount {
	
	@Id
	private Integer id;
	private int userRowCount;
	
}
