package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Formulaire;
import com.example.demo.service.FormulaireService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/form")

public class FormulaireController {
	
	
	@Autowired
	FormulaireService formulaireService ;
	
	
	@PostMapping(value = "/add")
	public Formulaire addFormulaire(@RequestBody Formulaire formulaire) {
		
		return formulaireService.addFormulaire(formulaire);
	}
	
	
	@GetMapping(value = "/getAll")
    @ResponseBody
	public List<Formulaire> getAllFormulaire() {
		
		return formulaireService.getAllFormulaire();
	}
	
	
	@DeleteMapping("/delete/{id}") 
	@ResponseBody 
	public void deleteFormById(@PathVariable("id")int id) {
		formulaireService.deleteFormulaire(id);
		
	}
	
	@PutMapping("/update/{id}") 
	@ResponseBody 
	public void updateFormulaire(@PathVariable("id") int id , @RequestBody Formulaire form) {
		
		 formulaireService.updateFormulaire(id, form);
	}


}
