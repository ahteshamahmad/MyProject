package com.projectify.Model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectify.Helper.SequenceIdCodeGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_code")
	@GenericGenerator(name = "employee_code",
		strategy = "com.projectify.Helper.SequenceIdCodeGenerator",
		parameters = {
				@Parameter(name = SequenceIdCodeGenerator.INCREMENT_PARAM, value = "50"),
				@Parameter(name = SequenceIdCodeGenerator.VALUE_PREFIX_PARAMETER, value = "EM"),
				@Parameter(name = SequenceIdCodeGenerator.NUMBER_FORMATE_PARAMETER, value = "%05d")
		}
	)
	private String employeeCode;
	
	private String image;
	
	private String gender;
	
	private String dateOfBirth;
	
	private String nationality;
	
	private String maritalStatus;
	
	private int mobileNumber;
	
	private int activeProjects;
	
	private int completedProjects;
	
	private String[] skills;
	
	@OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Address address;
	
	@ManyToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Project> projects = new ArrayList<>();
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	
}
