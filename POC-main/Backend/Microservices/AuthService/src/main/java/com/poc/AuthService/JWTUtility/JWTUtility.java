package com.poc.AuthService.JWTUtility;



import java.util.Date;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class JWTUtility  {
	
	private  static String SECRET_KEY = "SecretPOCkey";
	private  static Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());
	private  static int ACCESS_TOKEN_EXP_TIME = 24*60*60*1000;
	private  static int REFRESH_TOKEN_EXP_TIME = 5*60*1000;
	private  static String ISSUER = "AUTH_SERVICE";
	
	
	public static String createAccessToken (String userName, List<String> roles) {
	
		
		return JWT.create()
				.withSubject(userName)
				.withIssuedAt(new Date(System.currentTimeMillis()))
				.withExpiresAt(new Date(System.currentTimeMillis()+ ACCESS_TOKEN_EXP_TIME))
				.withIssuer(ISSUER)
				.withClaim("roles", roles)
				.sign(algorithm);
	}
	
	public  static String createRefreshToken (String userName) {
		return JWT.create()
				.withSubject(userName)
				.withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP_TIME))
				.withIssuer(ISSUER)
				.sign(algorithm);
	}

	
	public  static DecodedJWT verifyToken(String token) {
		JWTVerifier verifier = JWT.require(algorithm).build();
		DecodedJWT decodedJWT = verifier.verify(token);
//		String username = decodedJWT.getSubject();
		
		return decodedJWT;
	}
	
	
	
	
}
