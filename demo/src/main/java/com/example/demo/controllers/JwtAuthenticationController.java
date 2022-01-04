package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.JwtTokenUtil;
import com.example.demo.entities.DAOUser;
import com.example.demo.entities.JwtResponse;
import com.example.demo.service.JWTUserDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")

public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JWTUserDetailsService userDetailsService;

	@PostMapping(value = "/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody DAOUser authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping(value = "/register")
	public ResponseEntity<?> saveUser(@RequestBody DAOUser user) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(user));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@GetMapping(value = "/getAll")
	@ResponseBody
	public List<DAOUser> getAllUsers() {

		return userDetailsService.getAllUsers();
	}

	@DeleteMapping("/delete/{id}")
	@ResponseBody
	public void deleteUserById(@PathVariable("id") long id) {
		userDetailsService.deleteUserById(id);

	}

	@PutMapping("/addRole/{id}")
	@ResponseBody
	public DAOUser addRole(@PathVariable("id") long id, @RequestBody DAOUser user) {
		return userDetailsService.addRoleUser(id, user);

	}

	
	@PutMapping("/update/{id}")
	@ResponseBody
	public DAOUser updateUser(@PathVariable("id") long id, @RequestBody DAOUser user) {
		return userDetailsService.updateUser(id, user);

	}
	
	@GetMapping(value = "/getRole/{username}")
	@ResponseBody
	public Boolean getRole(@PathVariable("username") String username) {

		return userDetailsService.isSuperAdmine(username);
	}

	

}
