package com.poc.AuthService.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.AuthService.JWTUtility.JWTUtility;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if(request.getServletPath().equals("/api/v1/auth/login") || request.getServletPath().equals("/api/v1/auth/token/refresh_token") ||
				request.getServletPath().equals("/api/v1/auth/logout")) {
			filterChain.doFilter(request, response); // This will continue filter chain.
		} else {
			String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
			
			if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ") ) {
					String token = authorizationHeader.substring(7);
					System.out.println("testing token Authorization");
					DecodedJWT decodedJWT = JWTUtility.verifyToken(token);
					String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
					String userName= decodedJWT.getSubject();
					Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
					
					System.out.println("testing Authorization");
					Arrays.stream(roles).forEach(role -> {
						authorities.add(new SimpleGrantedAuthority(role));
						
					});
					
					// Principal -> most probably username or information about the user
					// Credentials -> password
					// Authorities -> roles
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userName, null, authorities);
					
					// Spring will store user data in securityContext based on that spring allow user to access the resource.
		
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					filterChain.doFilter(request, response);
					
				
					
			}
			
			else {
				filterChain.doFilter(request, response);
			}
		// TODO Auto-generated method stub
		
	}
	}
}
