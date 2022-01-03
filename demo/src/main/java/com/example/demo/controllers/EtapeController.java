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

import com.example.demo.entities.Etape;
import com.example.demo.service.EtapeService;

@RestController
@RequestMapping("/etape")
@CrossOrigin(origins = "http://localhost:4200")
public class EtapeController {
	
	
	
	@Autowired
	EtapeService etapeService ;
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Etape saveEtape(@RequestBody Etape etape) throws Exception {
		return etapeService.addEtape(etape);
	}
	
	@GetMapping(value = "/getAll")
    @ResponseBody
	public List<Etape> getAllEtape() {
		return etapeService.getAllEtape();
	}
	
	@DeleteMapping("/delete/{idEtape}") 
	@ResponseBody 
	public void deleteRoleById(@PathVariable("idEtape")int idEtape) {
		etapeService.deleteEtapeById(idEtape);
		
	}
	
	
	@PutMapping("/update/{idEtape}") 
	@ResponseBody 
	public Etape updateEtapeeById(@PathVariable("idEtape")int idEtape ,@RequestBody Etape etape ) {
		return etapeService.updateEtapeById(idEtape,etape);
		
	}
	
	@GetMapping(value = "/getOne/{id}")
    @ResponseBody
	public Etape getEtapeById(@PathVariable("id") int id ) {
		return etapeService.getEtapeById(id);
	}

}
