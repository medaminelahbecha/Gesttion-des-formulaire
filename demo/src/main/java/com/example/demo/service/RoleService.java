package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repositorie.RoleDao;



@Service
public class RoleService {
	
	
	@Autowired
	RoleDao roleDao ;
	
	
	public Role addRole(Role role) {	
		role.setNom(role.getNom());
		return roleDao.save(role);
		
	}
	
	
	public List<Role> getAllRole() {	
		return (List<Role>) roleDao.findAll();
	}

	public void deleteRoleeById(long roleId) {
	roleDao.deleteById(roleId);;
		
	}
	
	public Role updateRoleById(long roleId, Role role) {
		Role roleToUpdate =roleDao.findById(roleId).get();
		roleToUpdate.setNom(role.getNom());
		return roleDao.save(roleToUpdate) ;
	}
}
