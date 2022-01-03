package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity

public class Etape {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQUENCE_ETAPE")
	@SequenceGenerator(name="SEQUENCE_ETAPE", sequenceName="SEQUENCE_ETAPE" , allocationSize=1)
	private int idEtape;

	private String nom;
	
	private String etapeFini ;

	public int getIdEtape() {
		return idEtape;
	}

	public void setIdEtape(int idEtape) {
		this.idEtape = idEtape;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	
	
	public Etape(int idEtape, String nom, String etapeFini) {
		super();
		this.idEtape = idEtape;
		this.nom = nom;
		this.etapeFini = etapeFini;
	}

	

	

	public String getEtapeFini() {
		return etapeFini;
	}

	public void setEtapeFini(String etapeFini) {
		this.etapeFini = etapeFini;
	}

	public Etape() {
		super();
	}
	
	
	
	
}
