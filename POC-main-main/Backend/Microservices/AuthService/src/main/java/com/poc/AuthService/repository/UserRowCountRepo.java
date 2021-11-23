package com.poc.AuthService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poc.AuthService.model.UserRowCount;

public interface UserRowCountRepo extends JpaRepository<UserRowCount, Integer> {
	

}
