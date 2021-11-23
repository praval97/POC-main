package com.poc.AuthService.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.poc.AuthService.model.UserSession;

@Repository
public class UserSessionRepo {
	public static final String HASH_KEY = "UserSession";
    @Autowired
    private RedisTemplate<String, Object> template;
    
    public UserSession save(UserSession userSession)
    {
    	template.opsForHash().put(HASH_KEY,userSession.getUserName(),userSession);
    	return userSession;
    }
    
    public Boolean isloggedIn(String userName)
    {
    	return template.opsForHash().hasKey(HASH_KEY, userName);
    	
    }
    
    public Boolean delete(String userName)
    {
    	template.opsForHash().delete(HASH_KEY, userName);
    	return true;
    }
    
}
