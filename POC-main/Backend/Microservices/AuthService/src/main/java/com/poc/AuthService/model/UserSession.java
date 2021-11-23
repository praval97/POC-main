package com.poc.AuthService.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@RedisHash("UserSession")
public class UserSession implements Serializable{
	@Id
	private String userName;
	private Date loginTime;

}
