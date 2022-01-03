package com.example.demo.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Transition;

@Repository
public interface TransitionDao extends JpaRepository<Transition, Integer> {

}
