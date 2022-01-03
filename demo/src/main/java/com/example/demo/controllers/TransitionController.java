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

import com.example.demo.entities.Transition;
import com.example.demo.service.TransitionService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/transition")

public class TransitionController {
	
	@Autowired
	TransitionService transitionService ;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST , consumes = "application/json")
	public Transition saveTransition(@RequestBody Transition transition) throws Exception {
		
		return transitionService.addTransition(transition);
	}

	
	@GetMapping(value = "/getAll")
    @ResponseBody
	public List<Transition> getAllTransition() {
		
		return transitionService.getAllTransition();
	}
	
	@DeleteMapping("/delete/{id}") 
	@ResponseBody 
	public void deleteTransiyionById(@PathVariable("id")int id) {
		transitionService.deleteTransitionById(id);
		
	}
	
	
	@PutMapping(value = "/update/{id}")
    @ResponseBody
	public Transition updateTransition(@PathVariable("id") int id , @RequestBody Transition transition) {
		
		return transitionService.updateTransition(id, transition);
	}
}
