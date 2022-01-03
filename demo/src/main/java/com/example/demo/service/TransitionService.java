package com.example.demo.service;




import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Transition;
import com.example.demo.repositorie.EtapeDao;
import com.example.demo.repositorie.RoleDao;
import com.example.demo.repositorie.TransitionDao;

@Service
public class TransitionService {
	
	
	@Autowired
	TransitionDao transitionDao ;
	
	@Autowired
	EtapeDao etapeDao ;
	
	@Autowired
	RoleDao roleDao ;
	
	public Transition addTransition(Transition transition  ) {
		
		 
		/*
		 * Etape etapeA = etapeDao.findById(idEA).get(); Etape etapeS =
		 * etapeDao.findById(idES).get(); Role role = roleDao.findById(idR).get();
		 * transition.setEtapeActuelle(etapeA); transition.setEtapeSuivante(etapeS);
		 * transition.setRolePK(role);
		 */
		 
		/*
		 * transition.setEtapeActuelle(transition.getEtapeActuelle());
		 * transition.setEtapeSuivante(transition.getEtapeSuivante());
		 * transition.setRolePK(transition.getRolePK());
		 */
		  transitionDao.save(transition);	
		return 	transition ;
		
	}
	
	
	public List<Transition> getAllTransition() {	
		return (List<Transition>) transitionDao.findAll();
	}
	
	
	public void deleteTransitionById(int transitionId) {
		transitionDao.deleteById(transitionId);;
			
		}
	
	public Transition updateTransition(int idT , Transition transition) {
		Transition transitionToUpdate = transitionDao.findById(idT).get();
		transitionToUpdate.setEtapeActuelle(transition.getEtapeActuelle());
		transitionToUpdate.setEtapeSuivante(transition.getEtapeSuivante());
		transitionToUpdate.setRolePK(transition.getRolePK());
		
		return transitionDao.save(transitionToUpdate);
	}
		

	

}
