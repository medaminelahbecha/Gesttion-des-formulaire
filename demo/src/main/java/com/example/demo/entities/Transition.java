package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Transition")
public class Transition {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQUENCE_TRANSITION1")
	@SequenceGenerator(name="SEQUENCE_TRANSITION1", sequenceName="SEQUENCE_TRANSITION1" , allocationSize=1)
	private int idTransition;

	//idEtape est a la fois primary key et foreign key
	
	@ManyToOne
    @JoinColumn(name = "etape_Actuelle", referencedColumnName = "idEtape")
	private Etape etapeActuelle;
	
	
	@ManyToOne
    @JoinColumn(name = "etape_Suivante", referencedColumnName = "idEtape" )
	private Etape etapeSuivante;
	
	
	
	//idRole est a la fois primary key et foreign key
	
	@ManyToOne
	@JoinColumn(name = "role_pk", referencedColumnName = "idRole")
	private Role rolePK;



	public int getIdTransition() {
		return idTransition;
	}



	public void setIdTransition(int idTransition) {
		this.idTransition = idTransition;
	}



	public Etape getEtapeActuelle() {
		return etapeActuelle;
	}



	public void setEtapeActuelle(Etape etapeActuelle) {
		this.etapeActuelle = etapeActuelle;
	}



	public Etape getEtapeSuivante() {
		return etapeSuivante;
	}



	public void setEtapeSuivante(Etape etapeSuivante) {
		this.etapeSuivante = etapeSuivante;
	}



	public Role getRolePK() {
		return rolePK;
	}



	public void setRolePK(Role rolePK) {
		this.rolePK = rolePK;
	}


	
	public Transition(int idTransition, Etape etapeActuelle,  Etape etapeSuivante, Role rolePK) {
		super();
		this.idTransition = idTransition;
		this.etapeActuelle = etapeActuelle;
		this.etapeSuivante = etapeSuivante;
		this.rolePK = rolePK;
	}



	public Transition() {
		super();
	}



	



	



	

	
	
}
