package com.example.demo.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Formulaire {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQUENCE_FORMULAIRE")
	@SequenceGenerator(name="SEQUENCE_FORMULAIRE", sequenceName="SEQUENCE_FORMULAIRE" , allocationSize=1)
	private int idFormulaire;

	private String prenom;
	
	private String nom;

	// @Column(unique=true)
	// @Pattern(regex=".+\@.+\..+")
	private String email;
	
	
	private Long cin ; 
	private Date dateCreation ;
	private Date dateModification ;
	private String creerPar ;
	private String modifierPar ;
	
	//idEtape est a la fois primary key et foreign key
	@JsonProperty("etape")
	@ManyToOne
    @JoinColumn(name = "etape", referencedColumnName = "idEtape")
	private Etape etape;

	public int getIdFormulaire() {
		return idFormulaire;
	}

	public void setIdFormulaire(int idFormulaire) {
		this.idFormulaire = idFormulaire;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
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

	public Long getCin() {
		return cin;
	}

	public void setCin(Long cin) {
		this.cin = cin;
	}

	
	public void setEtape(Etape etape) {
		this.etape = etape;
	}

	

	public Date getDateModification() {
		return dateModification;
	}

	public void setDateModification(Date dateModification) {
		this.dateModification = dateModification;
	}

	public String getCreerPar() {
		return creerPar;
	}

	public void setCreerPar(String creerPar) {
		this.creerPar = creerPar;
	}

	public String getModifierPar() {
		return modifierPar;
	}

	public void setModifierPar(String modifierPar) {
		this.modifierPar = modifierPar;
	}

	public Etape getEtape() {
		return etape;
	}
	@JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
	public Formulaire(int idFormulaire, String prenom, String nom, String email, Long cin, Date dateCreation,
			Date dateModification, String creerPar, String modifierPar,@JsonProperty("etape") Etape etape) {
		super();
		this.idFormulaire = idFormulaire;
		this.prenom = prenom;
		this.nom = nom;
		this.email = email;
		this.cin = cin;
		this.dateCreation = dateCreation;
		this.dateModification = dateModification;
		this.creerPar = creerPar;
		this.modifierPar = modifierPar;
		this.etape = etape;
	}

	public Formulaire() {
		super();
	}

	
			

}
