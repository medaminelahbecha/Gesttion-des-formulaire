package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		

		form.setDateCreation(dateCreation);
		return formulaireDao.save(form);
	}
	
	
	
	public List<Formulaire> getAllFormulaire() {	
		return formulaireDao.findAll();
	}

	public void deleteFormulaire(int id ) {
		formulaireDao.deleteById(id);
	}
	
	
	public void updateFormulaire (int id ,Formulaire form ) {
		
		Date dateModification = new Date();
		Optional<Formulaire> value = formulaireDao.findById(id);
		if (value.isPresent()) {
			Formulaire formToUpdate = value.get();
			

		
		formToUpdate.setCin(form.getCin());
		formToUpdate.setEmail(form.getEmail());
		formToUpdate.setNom(form.getNom());
		formToUpdate.setPrenom(form.getPrenom());
		formToUpdate.setModifierPar(form.getModifierPar());
		formToUpdate.setEtape(form.getEtape());
		formToUpdate.setDateModification(dateModification);
		 formulaireDao.save(formToUpdate);
		}
		
	}

	
	
}
