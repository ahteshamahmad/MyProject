package com.projectify.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_code")
	@GenericGenerator(name = "admin_code",
		strategy = "com.projectify.Helper.SequenceIdCodeGenerator",
		parameters = {
				@Parameter(name = SequenceIdCodeGenerator.INCREMENT_PARAM, value = "50"),
				@Parameter(name = SequenceIdCodeGenerator.VALUE_PREFIX_PARAMETER, value = "AD"),
				@Parameter(name = SequenceIdCodeGenerator.NUMBER_FORMATE_PARAMETER, value = "%05d")
		}
	)
	private String adminCode;
	
	private String image;
	
	private String gender;
	
	private String dateOfBirth;
	
	private String nationality;
	
	private String maritalStatus;
	
	private int mobileNumber;
	
	@OneToOne(mappedBy = "admin", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Address address;
	
	@JsonIgnore
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	
}
