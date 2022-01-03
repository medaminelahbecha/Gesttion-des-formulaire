package com.example.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Etape;
import com.example.demo.entities.Formulaire;
import com.example.demo.repositorie.EtapeDao;
import com.example.demo.repositorie.FormulaireDao;

@Service
public class FormulaireService {
	
	
	
	@Autowired
	FormulaireDao formulaireDao ;
	
	@Autowired
	EtapeDao etapeDao ;
	
	public Formulaire addFormulaire(Formulaire form ) {
		
		Date dateCreation = new Date();
		System.out.println(dateCreation);

		form.setDateCreation(dateCreation);
		return formulaireDao.save(form);
	}
	
	
	
	public List<Formulaire> getAllFormulaire() {	
		return (List<Formulaire>) formulaireDao.findAll();
	}

	public void deleteFormulaire(int id ) {
		formulaireDao.deleteById(id);
	}
	
	
	public Formulaire updateFormulaire (int id ,Formulaire form ) {
		
		Date dateModification = new Date();
		
		Formulaire formToUpdate = formulaireDao.findById(id).get();
		formToUpdate.setCin(form.getCin());
		formToUpdate.setEmail(form.getEmail());
		formToUpdate.setNom(form.getNom());
		formToUpdate.setPrenom(form.getPrenom());
		formToUpdate.setModifierPar(form.getModifierPar());
		formToUpdate.setEtape(form.getEtape());
		formToUpdate.setDateModification(dateModification);
		return formulaireDao.save(formToUpdate);
	}

	
	
}
