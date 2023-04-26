package com.projectify.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projectify.Model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	
	@Query("select e from Employee e where e.employeeCode = :employeeCode")
	public Employee findByEmployeeCode(@Param("employeeCode") String employeeCode);
}
