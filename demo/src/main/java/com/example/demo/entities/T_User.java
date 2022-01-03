package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class T_User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String prenom;

	private String nom;

	// @Column(unique=true)
	// @Pattern(regex=".+\@.+\..+")
	private String email;

	private String password;

	//idRole est a la fois primary key et foreign key
		@ManyToOne
	    @JoinColumn(name = "idRole", referencedColumnName = "idRole")
		private Role role;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getPrenom() {
			return prenom;
		}

		public void setPrenom(String prenom) {
			this.prenom = prenom;
		}

		public String getNom() {
			return nom;
		}

		public void setNom(String nom) {
			this.nom = nom;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Role getRole() {
			return role;
		}

		public void setRole(Role role) {
			this.role = role;
		}

		public T_User(int id, String prenom, String nom, String email, String password, Role role) {
			super();
			this.id = id;
			this.prenom = prenom;
			this.nom = nom;
			this.email = email;
			this.password = password;
			this.role = role;
		}

		public T_User() {
			super();
		}

		

		
	
}
