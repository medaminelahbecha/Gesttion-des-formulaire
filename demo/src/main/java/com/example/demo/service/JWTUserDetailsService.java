package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DAOUser;
import com.example.demo.repositorie.UserDao;

@Service
public class JWTUserDetailsService implements UserDetailsService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		DAOUser user = (DAOUser) userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}

	public DAOUser save(DAOUser user) {

		user.setUsername(user.getUsername());
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		System.out.println(bcryptEncoder.encode(user.getPassword()));
		return userDao.save(user);
	}

	public List<DAOUser> getAllUsers() {
		return (List<DAOUser>) userDao.findAll();
	}

	public void deleteUserById(long id) {
		userDao.deleteById(id);

	}

	public DAOUser addRoleUser(long id, DAOUser user) {

		DAOUser userRole = userDao.findById(id).get();
		userRole.setRoleFK(user.getRoleFK());

		return userDao.save(userRole);
	}

	public DAOUser updateUser(long id, DAOUser user) {

		DAOUser userRole = userDao.findById(id).get();
		userRole.setUsername(user.getUsername());;

		return userDao.save(userRole);
	}
	
	public Boolean isSuperAdmine(String username) {
		DAOUser user = (DAOUser) userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		String role =user.getRoleFK().getNom();
		System.out.println(role);
		if(role.equals("super admin")) {
			return true ;
		}
		
		else return false ;
		
	}

}
