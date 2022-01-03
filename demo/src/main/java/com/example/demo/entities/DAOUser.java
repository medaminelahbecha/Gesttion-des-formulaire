package com.example.demo.entities;



import javax.persistence.*;

@Entity
@Table(name = "DAOUuser")

public class DAOUser {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQUENCE1")
	@SequenceGenerator(name="SEQUENCE1", sequenceName="SEQUENCE1" , allocationSize=1)
	private long id;
	@Column
	private String username;
	@Column
	private String password;
	
	@ManyToOne
	@JoinColumn(name = "role_fk", referencedColumnName = "idRole")
	private Role roleFK;

	
	public Role getRoleFK() {
		return roleFK;
	}

	public void setRoleFK(Role roleFK) {
		this.roleFK = roleFK;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	
}
