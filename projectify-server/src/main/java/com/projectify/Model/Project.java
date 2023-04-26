package com.projectify.Model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String dateOfCreation;
	
	private String title;
	
	private String domain;
	
	private String location;
	
	private int requiredEmployee;	
	
	private String image;
	
	private String lastDateToApply;
	
	private int experience;
	
	private String description;
	
	private int applied;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	private Manager manager;
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER)
	private List<Employee> employee;
	
}
