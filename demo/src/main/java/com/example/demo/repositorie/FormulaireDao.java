package com.example.demo.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Formulaire;

@Repository
public interface FormulaireDao extends JpaRepository<Formulaire, Integer>{

}
