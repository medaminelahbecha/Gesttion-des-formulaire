package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Etape;
import com.example.demo.repositorie.EtapeDao;

@Service
public class EtapeService {
	
	
	@Autowired
	EtapeDao etapeDao ;
	
	
	public Etape addEtape(Etape etape) {	
		etape.setNom(etape.getNom());
		etape.setEtapeFini(etape.getEtapeFini());
		return etapeDao.save(etape);
		
	}
	
	public List<Etape> getAllEtape() {	
		return (List<Etape>) etapeDao.findAll();
	}

	public void deleteEtapeById(int etapeId) {
	etapeDao.deleteById(etapeId);;
		
	}
	
	
	public Etape updateEtapeById(int etapeId , Etape etape) {
		Etape etapeToUpdate =etapeDao.findById(etapeId).get();
		etapeToUpdate.setEtapeFini(etape.getEtapeFini());
		etapeToUpdate.setNom(etape.getNom());
		
		return etapeDao.save(etapeToUpdate) ;
	}

	public Etape getEtapeById(int id ) {
		return etapeDao.findById(id).get();
	}
}
