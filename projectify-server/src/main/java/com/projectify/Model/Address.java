package com.projectify.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

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
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String houseNumber;
	
	private String streetArea;
	
	private String landmark;
	
	private String city;
	
	private String State;
	
	private int pinCode;
	
	private String country;
	
	@JsonIgnore
	@OneToOne
	private Admin admin;
	
	@JsonIgnore
	@OneToOne
	private Manager manager;
	
	@JsonIgnore
	@OneToOne
	private Employee employee;
	
}
