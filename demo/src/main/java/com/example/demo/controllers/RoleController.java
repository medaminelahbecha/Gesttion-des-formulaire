package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.service.RoleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/role")

public class RoleController {
	
	
	@Autowired
	RoleService roleService ;

	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Role saveRole(@RequestBody Role role) throws Exception {
		return roleService.addRole(role);
	}
	
	@GetMapping(value = "/getAll")
    @ResponseBody
	public List<Role> getAllRole() {
		
		return roleService.getAllRole();
	}
	
	@DeleteMapping("/delete/{idRole}") 
	@ResponseBody 
	public void deleteRoleById(@PathVariable("idRole")long roleId) {
		roleService.deleteRoleeById(roleId);
		
	}
	
	
	@PutMapping("/update/{idRole}") 
	@ResponseBody 
	public Role updateRoleById(@PathVariable("idRole")long roleId ,@RequestBody Role role) {
		return roleService.updateRoleById(roleId,role);
		
	}
}
