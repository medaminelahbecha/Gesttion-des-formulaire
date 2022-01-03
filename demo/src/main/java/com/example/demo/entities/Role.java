package com.example.demo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Role")
public class Role {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQUENCE_ROLE")
	@SequenceGenerator(name="SEQUENCE_ROLE", sequenceName="SEQUENCE_ROLE" , allocationSize=1)
	private Long idRole;
	
	@Column
	private String nom;

	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Role(Long idRole, String nom) {
		super();
		this.idRole = idRole;
		this.nom = nom;
	}

	public Long getIdRole() {
		return idRole;
	}

	public void setIdRole(Long idRole) {
		this.idRole = idRole;
	}

	@Override
	public String toString() {
		return "Role [idRole=" + idRole + ", nom=" + nom + "]";
	}

	public Role() {
		super();
	}

	public Role(String nom) {
		super();
		this.nom = nom;
	}
	

	

}
