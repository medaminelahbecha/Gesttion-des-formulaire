package com.example.demo.repositorie;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.DAOUser;


@Repository
public interface UserDao extends CrudRepository<DAOUser, Long> {
	
	public DAOUser findByUsername(String username);

}
